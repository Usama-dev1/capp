import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <p className="text-red-500 font-medium mb-4">Page not found!</p>
      <button onClick={() => navigate(-1)} className="btn-primary btn-lg">
        Go back
      </button>
    </div>
  );
};

export default NotFoundPage;
