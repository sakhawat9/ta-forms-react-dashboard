import React from "react";

const Pagination = ({perPage, offers, currentPage, paginatedOffers, setCurrentPage, setPerPage, totalPages}) => {
  return (
    <div className="flex items-center justify-between flex-col-reverse sm:flex-row gap-3">
      <div className="flex items-center gap-2 text-slate-600">
        Showing{" "}
        <b>
          {perPage === "all"
            ? offers.length
            : paginatedOffers.length + (currentPage - 1) * perPage}
        </b>{" "}
        / {offers.length}
        <span className="px-2 text-slate-300">|</span>
        Per page:
        <select
          className="ml-2 border rounded p-1"
          value={perPage}
          onChange={(e) => {
            const value =
              e.target.value === "all" ? "all" : Number(e.target.value);
            setPerPage(value);
            setCurrentPage(1); // reset to page 1 when perPage changes
          }}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* Prev/Next */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className={`px-3 py-2 rounded border bg-gray-100 ${
            currentPage === 1
              ? "opacity-30 cursor-not-allowed border-gray-300"
              : "hover:bg-gray-200 border-indigo-600 text-indigo-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 fill-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            ></path>{" "}
          </svg>
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className={`px-3 py-2 rounded border bg-gray-100 ${
            currentPage === totalPages || totalPages === 1
              ? "opacity-30 cursor-not-allowed border-gray-300"
              : "hover:bg-gray-200 border-indigo-600 text-indigo-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 fill-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>{" "}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
