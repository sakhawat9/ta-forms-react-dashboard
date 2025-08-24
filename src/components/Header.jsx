import React from "react";

const Header = ({
  paginatedOffers,
  selectedOffers,
  setSelectedOffers,
  setSortConfig,
  sortConfig,
  offers,
}) => {
  const offer = offers[0];
  const fields = offer?.field ? Object.entries(offer.field) : [];

  // 🔹 Helper to clean up field keys
  const formatKey = (key) => {
    return key
      .replace(/^ta_forms_/, "") // remove "ta_forms_"
      .replace(/_/g, " ") // replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
  };

  const toggleSelectAll = () => {
    if (selectedOffers.length === paginatedOffers.length) {
      setSelectedOffers([]);
    } else {
      setSelectedOffers(paginatedOffers.map((offer) => offer.id));
    }
  };

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex sm:sticky sm:top-7 items-center child:py-2 bg-indigo-100 child:px-5 child:font-semibold w-[800px] sm:w-full h-full">
      {/* Select all */}
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

      {/* Dynamic Fields */}
      {fields.slice(0, 5).map(([key]) => (
        <div key={key} className="w-full capitalize">
          <div
            onClick={() => handleSort(`field.${key}`)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {formatKey(key)}
            <div className="inline-flex items-center justify-center text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`fill-current w-4 h-4 transition duration-300 ${
                  sortConfig.key === `field.${key}` &&
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
      ))}

      {/* Date column */}
      <div className="w-[200px] min-w-[200px]">
        <div
          onClick={() => handleSort("created_at")}
          className="flex items-center gap-2 cursor-pointer"
        >
          Date{" "}
          <div className="inline-flex items-center justify-center text-slate-600">
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

      {/* Action column */}
      <div className="w-[150px] min-w-[150px]">Action</div>
    </div>
  );
};

export default Header;
