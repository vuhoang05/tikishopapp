import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();

  // fetch book detail tại đây...

  return <div>Chi tiết sách có id: {id}</div>;
};
export default BookDetail;