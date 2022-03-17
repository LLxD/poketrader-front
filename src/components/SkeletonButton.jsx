import React from "react";

const SkeletonButton = ({ setIsModalOpen, setTarget, target }) => {
  return (
    <button
      className="my-auto mx-3 flex items-center justify-center rounded-md border border-dashed border-white p-2 text-center text-4xl text-white"
      onClick={() => {
        setIsModalOpen(true);
        setTarget(target);
      }}
    >
      +
    </button>
  );
};

export default SkeletonButton;
