import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronDownIcon } from 'lucide-react';

import ErrMessage from '@/components/err-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from '@/redux/api/baseApi';
import toast from 'react-hot-toast';
import Loading from '@/components/loading';

type TError = {
  quantity?: { message: string };
  dueDate?: { message: string };
};

const BorrowBook = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(id);
  const [borrowBook, { isLoading: isActionLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<TError>({});
  const [formData, setFormData] = useState({
    quantity: '',
    dueDate: '',
  });
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quantity) {
      return setErrors({
        ...errors,
        quantity: {
          message: 'Quantity is required',
        },
      });
    } else if (!date) {
      return setErrors({
        ...errors,
        dueDate: {
          message: 'Due date is required',
        },
      });
    }
    try {
      await borrowBook({
        book: id,
        quantity: formData.quantity,
        dueDate: date,
      }).unwrap();
      setFormData({ quantity: '', dueDate: '' });
      toast.success('Book borrowed successfully');
      navigate('/borrow-summary');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Borrow book error:', error);
      toast.error(error?.data?.message || 'Failed to borrow book');
    }
  };

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='border rounded-lg p-6 bg-card custom-shadow h-fit'>
        <h2 className='text-xl font-semibold mb-4'>Borrow Book</h2>
        {data?.data?.available ? (
          <form onSubmit={handleSubmit}>
            <div className='space-y-3'>
              <div className='space-y-1'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                  id='quantity'
                  type='number'
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  name='quantity'
                  placeholder='Enter quantity'
                />
                {errors?.quantity && <ErrMessage error={errors.quantity} />}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='dueDate'>Due Date</Label>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      id='date'
                      className='w-full justify-between font-normal text-light border'
                    >
                      {date ? date.toLocaleDateString() : 'Select date'}
                      <ChevronDownIcon className='ml-2 h-4 w-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto overflow-hidden p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={date}
                      captionLayout='dropdown'
                      className='w-full text-light'
                      disabled={(date) => date < new Date()}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate);
                          setFormData({
                            ...formData,
                            dueDate: selectedDate.toISOString(),
                          });
                          setOpen(false);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors?.dueDate && <ErrMessage error={errors.dueDate} />}
              </div>

              <Button
                disabled={isLoading || isActionLoading}
                type='submit'
              >
                {isActionLoading ? 'Loading...' : 'Borrow Book'}
              </Button>
            </div>
          </form>
        ) : (
          <p className='text-center py-10 text-red-500'>
            Book not available at this moment
          </p>
        )}
      </div>
      <div className='border rounded-lg p-6 bg-card custom-shadow'>
        <h2 className='text-xl font-semibold mb-4'>Book information</h2>
        {isLoading ? (
          <div className='flex items-center justify-center h-full py-20'>
            <span>Loading...</span>
          </div>
        ) : data ? (
          <div>
            <table className='w-full table'>
              <tbody>
                <tr>
                  <td className='font-semibold'>Title:</td>
                  <td>{data?.data?.title}</td>
                </tr>
                <tr>
                  <td className='font-semibold'>Author:</td>
                  <td>{data?.data?.author}</td>
                </tr>
                <tr>
                  <td className='font-semibold'>Genre:</td>
                  <td>{data?.data?.genre}</td>
                </tr>
                <tr>
                  <td className='font-semibold'>ISBN:</td>
                  <td>{data?.data?.isbn}</td>
                </tr>
                <tr>
                  <td className='font-semibold'>Copies Available:</td>
                  <td>{data?.data?.copies}</td>
                </tr>
                <tr>
                  <td className='font-semibold'>Description:</td>
                  <td>{data?.data?.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>Book Not Found</p>
        )}
      </div>
    </div>
  );
};

export default BorrowBook;
