import React from "react";

const HeaderBar = () => {
  return (
    <div className="w-full">
      <div className="bg-red-700 text-white text-sm px-6 py-2 flex justify-between items-center">
        <span className="font-semibold">જય શ્રી કૃષ્ણા</span>
        <span>
          Contact No.: +91-9406121399 &nbsp;&nbsp; Mail:
          scgsgujaratisamaj@gmail.com
        </span>
      </div>

      <div className="bg-white flex flex-col justify-center md:flex-row items-center space-x-30">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="Samaj Logo" className="h-50 w-auto" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-red-700">
              Shree Gujarati Brahm Samaj
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-red-700">
              શ્રી ગુજરાતી બ્રાહ્મણ સમાજ
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 md:mt-0">
          <button className="bg-red-700 text-white px-4 py-2 font-semibold">
            સમસ્ત ગુજરાતી સમાજ
          </button>
          <button className="bg-red-700 text-white px-4 py-2 font-semibold">
            સંગઠન
          </button>
          <button className="bg-red-700 text-white px-4 py-2 font-semibold">
            પ્રાધિકૃત સમિતિ
          </button>
          <button className="bg-red-700 text-white px-4 py-2 font-semibold">
            રોજગાર
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
