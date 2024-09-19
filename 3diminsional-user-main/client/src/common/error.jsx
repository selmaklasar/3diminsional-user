import React from 'react';
import { IoMdAlert } from 'react-icons/io';

const ErrorMessage = ({ message }) => (
  <div className="w-full max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 shadow-md">
    <span className="absolute top-0 right-0 px-4 py-3">
      <IoMdAlert className="text-red-500 text-2xl" />
    </span>
    <div className="flex items-center">
      <div className="ml-4">
        <p className="font-semibold text-lg">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
