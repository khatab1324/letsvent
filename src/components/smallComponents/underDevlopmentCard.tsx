import React from "react";

export const UnderDevlopmentCard = ({
  setIsUnderDevlopmentCardOpen,
}: {
  setIsUnderDevlopmentCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
        onClick={() => {
          setIsUnderDevlopmentCardOpen((preState) => !preState);
        }}
      ></div>
      <div className="relative bg-zinc-900 p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
        <div className="w-full flex justify-center">
          <h2 className="text-3xl font-extrabold  text-white">
            under devlopment{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};
