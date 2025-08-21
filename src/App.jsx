import { useEffect, useState } from "react";
import "./App.css";
import Offer from "./components/Offer";
import DeleteModal from "./components/DeleteModal";
import Pagination from "./components/Pagination";
import FilterOptions from "./components/FilterOptions";

const columns = [
  { label: "ID", key: "id" },
  { label: "Date", key: "created_at" },
  { label: "Name", key: "field.ta_forms_full_name" },
  { label: "Email", key: "field.ta_forms_email" },
  { label: "Phone", key: "field.ta_forms_phone" },
  { label: "Proposal", key: "field.ta_forms_proposal" },
  { label: "Device", key: "meta.device" },
  { label: "Browser", key: "meta.browser" },
  { label: "Platform", key: "meta.platform" },
  { label: "Screen", key: "meta.screen" },
  { label: "Language", key: "meta.language" },
  { label: "Vendor", key: "meta.vendor" },
  { label: "URL", key: "meta.url" },
  { label: "Referrer", key: "meta.referrer" },
  { label: "Country_Code", key: "meta.country_code" },
  { label: "Country", key: "meta.country" },
  { label: "City", key: "meta.city" },
  { label: "Region", key: "meta.region" },
  { label: "Timezone", key: "meta.timezone" },
  { label: "Timezone_GMT", key: "meta.timezone_gmt" },
  { label: "Currency", key: "meta.currency" },
  { label: "IP", key: "meta.ip" },
  { label: "Latitude", key: "meta.latitude" },
  { label: "Longitude", key: "meta.longitude" },
  { label: "ISP", key: "meta.isp" },
  { label: "Organizer", key: "meta.org" },
  { label: "WP User ID", key: "meta.wp_user_id" },
  { label: "WP Username", key: "meta.wp_username" },
  { label: "WP First Name", key: "meta.wp_first_name" },
  { label: "WP Last Name", key: "meta.wp_last_name" },
  { label: "WP Email", key: "meta.wp_email" },
];

function App() {
  const [offers, setOffers] = useState([]);
  const [shoModal, setShowModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [emailFilter, setEmailFilter] = useState("all-email");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOffers, setSelectedOffers] = useState([]);

  useEffect(() => {
    fetch("http://forms.local/wp-json/ta-forms/v1/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error(err));
  }, []);

  const getValueByPath = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj) ?? "";
  };

  const exportToCSV = () => {
    if (!offers || offers.length === 0) {
      alert("No offers to export");
      return;
    }

    // Header row
    const headers = columns.map((col) => col.label).join(",");

    // Data rows
    const rows = offers.map((offer) =>
      columns
        .map((col) => {
          const value = getValueByPath(offer, col.key);
          return `"${String(value).replace(/"/g, '""').replace(/\n/g, " ")}"`;
        })
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "offers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOffers = offers.filter((offer) => {
    // ✅ Email filter
    if (emailFilter !== "all-email" && offer.verify_status !== emailFilter) {
      return false;
    }

    // ✅ Date filter (compare with created_at)
    if (dateFrom && new Date(offer.created_at) < new Date(dateFrom)) {
      return false;
    }
    if (dateTo && new Date(offer.created_at) > new Date(dateTo)) {
      return false;
    }

    // ✅ Search filter (name, email, phone, proposal)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack =
        `${offer.field.ta_forms_full_name} ${offer.field.ta_forms_email} ${offer.field.ta_forms_phone} ${offer.field.ta_forms_proposal}`.toLowerCase();

      if (!haystack.includes(q)) {
        return false;
      }
    }

    return true;
  });

  const toggleSelectOffer = (id) => {
    setSelectedOffers((prev) =>
      prev.includes(id)
        ? prev.filter((offerId) => offerId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOffers.length === paginatedOffers.length) {
      setSelectedOffers([]);
    } else {
      setSelectedOffers(paginatedOffers.map((offer) => offer.id));
    }
  };

  const totalPages =
    perPage === "all" ? 1 : Math.ceil(filteredOffers.length / perPage);

  const paginatedOffers =
    perPage === "all"
      ? filteredOffers
      : filteredOffers.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage
        );

  return (
    <div className="w-full p-3 sm:p-6 h-full !pl-0">
      <div className="bg-white p-2 sm:p-6 w-full h-full flex flex-col gap-3 sm:gap-5">
        <div className="flex items-center justify-between gap-2 h-10 w-full">
          <h3 className="font-semibold text-base whitespace-nowrap">
            Contact Form Offers
          </h3>
          <div className="flex items-center :justify-end gap-3 justify-between child:justify-center child:px-3 sm:child:px-6">
            {/* All Offers Delete */}
            {selectedOffers.length > 0 && (
              <button
                // onClick={() => setShowModal(true)}
                className="relative group px-6 h-10 flex items-center gap-2 border rounded transition focus:ring-0 active:grayscale-100 active:opacity-95 overflow-hidden bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-base"
              >
                <div className="bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white duration-300 absolute z-0 h-full w-full scale-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition"></div>
                <div className="z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current w-4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                  </svg>{" "}
                  {selectedOffers.length}
                </div>
              </button>
            )}
            <button
              onClick={exportToCSV}
              className="relative group px-6 h-10 flex items-center gap-2 border rounded transition focus:ring-0 active:grayscale-100 active:opacity-95 overflow-hidden bg-transparent text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              <div className="z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-4"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879z"
                  ></path>
                </svg>{" "}
                Export
              </div>
            </button>
          </div>
        </div>
        <FilterOptions
          emailFilter={emailFilter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          searchQuery={searchQuery}
          setDateFrom={setDateFrom}
          setEmailFilter={setEmailFilter}
          setDateTo={setDateTo}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex flex-col gap-6 h-full">
          <div className="overflow-x-scroll h-full sm:overflow-visible">
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
              <div className="w-[220px] min-w-[220px] capitalize">name</div>
              <div className="w-[250px] min-w-[250px] capitalize">email</div>
              <div className="w-[150px] min-w-[150px] capitalize">phone</div>
              <div className="w-full capitalize">message</div>
              <div className="w-[100px] min-w-[100px] capitalize">Offer</div>
              <div className="w-[200px] min-w-[200px]">
                <div className="flex items-center gap-2">
                  Date{" "}
                  <div className="inline-flex items-center justify-center cursor-pointer text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current w-4 h-4 transition duration-300"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-[150px] min-w-[150px]">Action</div>
            </div>
            {paginatedOffers.map((offer, index) => (
              <Offer
                offer={offer}
                key={index}
                setShowModal={setShowModal}
                selected={selectedOffers.includes(offer.id)}
                toggleSelectOffer={toggleSelectOffer}
              />
            ))}
          </div>

          <Pagination
            perPage={perPage}
            offers={offers}
            currentPage={currentPage}
            paginatedOffers={paginatedOffers}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      {shoModal && (
        <DeleteModal
          setOffers={setOffers}
          setShowModal={setShowModal}
          shoModal={shoModal}
          setNotice={setNotice}
        />
      )}
      {notice && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-[999] transition">
          {notice}
        </div>
      )}
    </div>
  );
}

export default App;
