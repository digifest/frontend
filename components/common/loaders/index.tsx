import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="size-12 grid place-content-center rounded-full bg-secondary-800 shadow-md animate-pulse">
      <LoaderIcon className="text-secondary-200 animate-spin" size={40} />
    </div>
  );
};

export default Loader;
