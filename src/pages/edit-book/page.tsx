import BookForm from "@/components/book-form";
import Loading from "@/components/loading";
import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBookByIdQuery(id);
  console.log("Edit Book data:", data?.data);
  if (isLoading) {
    return <Loading fullScreen />;
  }
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
