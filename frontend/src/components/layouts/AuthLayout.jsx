import React from "react";
import Card2 from "../../assets/images/Card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden lg:overflow-hidden">
      {/* Left: Form - 100% on small screens, 60% on devices larger than 640px */}
      <div className="w-full sm:w-[60%] h-full overflow-y-auto lg:overflow-y-hidden md:overflow-y-hidden  px-4 sm:px-6 md:px-10 pt-2 sm:pt-8 pb-8">
        <div className="flex items-center mt-6 mb-6 md:mb-0 sm:mt-[1.5px]">
          <img
            className="w-10 h-10 sm:w-[50px] sm:h-[50px]"
            src="logo.png"
            alt="OptiLedger"
          />
          <h2 className="text-2xl sm:text-2xl font-semibold text-black ml-3 sm:ml-4">
            OptiLedger
          </h2>
        </div>
        {children}
      </div>

      {/* Right: Side Card - hidden on small screens, visible on devices larger than 640px */}
      <div className="hidden sm:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Background decorative blobs */}
        {/* <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[40px] bg-purple-600 absolute -top-5 -left-4"></div>
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[40px] border-[12px] sm:border-[16px] border-fuchsia-200 absolute top-[30%] -right-8"></div>
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[40px] border-violet-500 absolute bottom-6 -left-4"></div> */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-200 absolute top-[30%] -right-10"></div>
        <div className="w-48 h-48 rounded-[40px] border-violet-500 absolute bottom-7 -left-5"></div>

        {/* Info Card */}
        <div className="grid grid-cols-1 z-20">
          <StateInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        <img
          src={Card2}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
          alt="Card2"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StateInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">₹{value}</span>
      </div>
    </div>
  );
};
