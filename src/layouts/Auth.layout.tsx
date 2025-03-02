import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-orange-500 to-red-500 items-center justify-center p-10">
        <img
          src="/easy-genartor-cover.png"
          className="max-w-sm"
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
