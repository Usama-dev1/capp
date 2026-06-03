import CreatePostForm from "../components/post/CreatePostForm";

const CreatePostPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create a New Post
      </h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePostPage;
