import React from "react";

const FilterOptions = ({
  emailFilter,
  dateFrom,
  dateTo,
  searchQuery,
  setDateFrom,
  setEmailFilter,
  setDateTo,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center justify-between flex-col gap-2 sm:flex-row">
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <div className="relative outline-none w-48" tabIndex="0">
          <select
            className="w-48 h-10 border border-slate-200 rounded px-3.5"
            name="email-typ"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          >
            <option value="all-email">All Email</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3 child:text-[14px]">
        <input
          type="date"
          className="h-10 border border-slate-200 rounded px-3.5"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          className="h-10 border border-slate-200 rounded px-3.5"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />

        <input
          type="search"
          className="h-10 border border-slate-200 rounded px-3.5"
          placeholder="🔍 Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterOptions;
