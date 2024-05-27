import Loading from "react-loading";

const PreLoader = () => {
  return (
    <div className="absolute z-[1000] w-full h-screen left-0 top-0">
      <div className="h-full w-full flex justify-center items-center">
        <Loading height={44} width={44} type="spin" color="#3497F9" />
      </div>
    </div>
  );
};

export default PreLoader;
