import React from "react";

const Header = ({ handleSave, errorMessage, handleLoad }) => {
  return (
    <header className="bg-gray-200 border ">
      <nav className="py-2 flex justify-between">
        <div className="flex justify-start">
          <h1 className="ml-10 text-lg text-gray-800">ChatFlow</h1>
        </div>
        {errorMessage && (
          <div className="bg-red-200 rounded-lg text-red-800 py-2 px-4 mr-4">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex justify-end mr-5">
          <button
            className="bg-transparent sm:text-xs hover:bg-blue-500 text-blue-700 font-semibold hover:text-white sm:p-1 md:py-2 md:px-4 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleSave}
          >
            SAVE CHANGE
          </button>
          <button
          className="bg-transparent sm:text-xs hover:bg-blue-500 text-blue-700 font-semibold hover:text-white sm:p-1  md:py-2 md:px-4 py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-2"
          onClick={handleLoad}
        >
          LOAD FLOW
        </button>
        </div>
      
      </nav>
    </header>
  );
};

export default Header;
