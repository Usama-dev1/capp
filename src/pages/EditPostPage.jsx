import EditPostForm from "../components/post/EditPostForm";

const EditPostPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>
      <EditPostForm />
    </div>
  );
};

export default EditPostPage;
