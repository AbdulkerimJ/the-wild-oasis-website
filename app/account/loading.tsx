import Spinner from "../_components/Spinner";

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Spinner />
      <p>Loading cabins data...</p>
    </div>
  );
};

export default loading;
