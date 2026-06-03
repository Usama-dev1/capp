import { TbLoaderQuarter } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="flex w-full max-w-5xl mx-auto justify-center items-center py-8">
      <TbLoaderQuarter className="animate-spin text-blue-600 text-4xl" />
    </div>
  );
};

export default Loader;
