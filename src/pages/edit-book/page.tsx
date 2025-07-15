import BookForm from '@/components/book-form';
import { useGetBookByIdQuery } from '@/redux/api/baseApi';
import { useParams } from 'react-router';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetBookByIdQuery(id);
  console.log('Edit Book data:', data?.data);
  return (
    <div>
      <BookForm
        edit={true}
        data={data?.data}
        id={id}
      />
    </div>
  );
};

export default EditBook;
