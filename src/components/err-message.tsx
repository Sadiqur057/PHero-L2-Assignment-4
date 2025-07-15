type ErrMessageProps = {
  error: {
    message: string;
  };
};
const ErrMessage = ({ error }: ErrMessageProps) => {
  return <p className='text-red-500 text-sm mt-2'>{error?.message}</p>;
};

export default ErrMessage;
