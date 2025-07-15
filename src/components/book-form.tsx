import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ErrMessage from './err-message';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { genres } from '@/constants/data';
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from '@/redux/api/baseApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import type { IBook } from '@/types/Book';

interface IErrorMessage {
  message: string;
}

type TError = {
  title?: IErrorMessage;
  author?: IErrorMessage;
  genre?: IErrorMessage;
  isbn?: IErrorMessage;
  description?: IErrorMessage;
  copies?: IErrorMessage;
};

type IBookFormProps = {
  edit?: boolean;
  id?: string | null;
  data?: IBook | null;
};

const BookForm = ({
  edit = false,
  id = null,
  data = null,
}: IBookFormProps) => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: isEditing }] = useUpdateBookMutation();

  const [errors, setErrors] = useState<TError>({});
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: '',
  });
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  useEffect(() => {
    if (edit && data && !isFormInitialized) {
      setFormData({
        title: data.title || '',
        author: data.author || '',
        genre: data.genre || '',
        isbn: data.isbn?.toString() || '',
        description: data.description || '',
        copies: data.copies?.toString() || '',
      });
      setIsFormInitialized(true);
    }
  }, [edit, data, isFormInitialized]);

  const navigate = useNavigate();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (edit) {
        const res = await updateBook({ id, formData });
        console.log('Update response:', res);
        toast.success('Book updated successfully');
        return navigate('/books');
      } else {
        await createBook(formData);
        toast.success('Book added successfully');
        return navigate('/books');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('error', error.data.error);
      if (error?.data?.error?.errors) {
        console.log('Validation errors:', error.data.error.errors);
        setErrors(error.data.error.errors);
        return;
      } else {
        toast.error(error.data.error.message || 'Failed to add book');
        return;
      }
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>
        {edit ? 'Edit Book' : 'Add New Book'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='space-y-3'>
          <div className='space-y-1'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={formData.title}
              onChange={handleOnChange}
              name='title'
              placeholder='Enter book title'
              // required
            />
            {errors.title && <ErrMessage error={errors.title} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='author'>Author</Label>
            <Input
              id='author'
              value={formData.author}
              onChange={handleOnChange}
              name='author'
              // required
              placeholder='Enter author name'
            />
            {errors.author && <ErrMessage error={errors.author} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='genre'>Genre</Label>
            <Select
              name='genre'
              value={formData.genre}
              onValueChange={(value) =>
                setFormData({ ...formData, genre: value })
              }
              required
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a genre' />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem
                    key={genre}
                    value={genre}
                  >
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.genre && <ErrMessage error={errors.genre} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='isbn'>ISBN</Label>
            <Input
              id='isbn'
              type='number'
              value={formData.isbn}
              onChange={handleOnChange}
              name='isbn'
              // required
              placeholder='Enter ISBN number'
            />
            {errors.isbn && <ErrMessage error={errors.isbn} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='copies'>Copies</Label>
            <Input
              id='copies'
              type='number'
              value={formData.copies}
              onChange={handleOnChange}
              required
              name='copies'
              min={1}
              placeholder='Enter number of copies'
            />
            {errors.copies && <ErrMessage error={errors.copies} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={formData.description}
              name='description'
              onChange={handleOnChange}
              placeholder='Enter book description'
              rows={3}
            />
            {errors.description && <ErrMessage error={errors.description} />}
          </div>

          <Button disabled={isLoading || isEditing}>
            {isLoading || isEditing
              ? edit
                ? 'Updating...'
                : 'Adding...'
              : edit
              ? 'Update Book'
              : 'Add Book'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
