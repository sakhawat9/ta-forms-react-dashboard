import React from "react";

const Header = ({
  paginatedOffers,
  selectedOffers,
  setSelectedOffers,
  setSortConfig,
  sortConfig,
}) => {
  const toggleSelectAll = () => {
    if (selectedOffers.length === paginatedOffers.length) {
      setSelectedOffers([]);
    } else {
      setSelectedOffers(paginatedOffers.map((offer) => offer.id));
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex sm:sticky sm:top-7 items-center child:py-2 bg-indigo-100 child:px-5 child:font-semibold w-[800px] sm:w-full h-full">
      <div className="w-16">
        <input
          type="checkbox"
          checked={
            paginatedOffers.length > 0 &&
            selectedOffers.length === paginatedOffers.length
          }
          onChange={toggleSelectAll}
        />
      </div>
      <div className="w-[220px] min-w-[220px] capitalize">
        <div
          onClick={() => handleSort("field.ta_forms_full_name")}
          className="flex items-center gap-2 cursor-pointer"
        >
          Name
          <div className="inline-flex items-center justify-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current w-4 h-4 transition duration-300 ${
                sortConfig.key === "field.ta_forms_full_name" &&
                sortConfig.direction === "desc"
                  ? "rotate-180"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[250px] min-w-[250px] capitalize">
        <div
          onClick={() => handleSort("field.ta_forms_email")}
          className="flex items-center gap-2 cursor-pointer"
        >
          Email
          <div className="inline-flex items-center justify-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current w-4 h-4 transition duration-300 ${
                sortConfig.key === "field.ta_forms_email" &&
                sortConfig.direction === "desc"
                  ? "rotate-180"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[150px] min-w-[150px] capitalize">phone</div>
      <div className="w-full capitalize">
        <div
          onClick={() => handleSort("field.ta_forms_proposal")}
          className="flex items-center gap-2 cursor-pointer"
        >
          Message
          <div className="inline-flex items-center justify-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current w-4 h-4 transition duration-300 ${
                sortConfig.key === "field.ta_forms_proposal" &&
                sortConfig.direction === "desc"
                  ? "rotate-180"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[100px] min-w-[100px] capitalize">
        <div
          onClick={() => handleSort("field.ta_forms_offer")}
          className="flex items-center gap-2 cursor-pointer"
        >
          Offer
          <div className="inline-flex items-center justify-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current w-4 h-4 transition duration-300 ${
                sortConfig.key === "field.ta_forms_offer" &&
                sortConfig.direction === "desc"
                  ? "rotate-180"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[200px] min-w-[200px]">
        <div
          onClick={() => handleSort("created_at")}
          className="flex items-center gap-2"
        >
          Date{" "}
          <div className="inline-flex items-center justify-center cursor-pointer text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current w-4 h-4 transition duration-300 ${
                sortConfig.key === "created_at" &&
                sortConfig.direction === "desc"
                  ? "rotate-180"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[150px] min-w-[150px]">Action</div>
    </div>
  );
};

export default Header;
