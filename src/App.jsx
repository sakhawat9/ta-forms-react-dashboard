import { useEffect, useState } from "react";
import "./App.css";
import Offer from "./components/Offer";

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
  const { restUrl, nonce } = window.taForms || {};

  useEffect(() => {
    fetch("http://forms.local/wp-json/ta-forms/v1/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${restUrl}/offers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": nonce, // send nonce
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      const data = await res.json();
      setOffers((prev) => prev.filter((offer) => offer.id !== id));
      setShowModal(null);

      console.log("Deleted:", data);
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <div className="w-full p-3 sm:p-6 h-full !pl-0">
      <div className="bg-white p-2 sm:p-6 w-full h-full flex flex-col gap-3 sm:gap-5">
        <div className="flex items-center justify-between gap-2 h-10 w-full">
          <h3 className="font-semibold text-base whitespace-nowrap">
            Contact Form Leads
          </h3>
          <div className="flex items-center :justify-end gap-3 justify-between child:justify-center child:px-3 sm:child:px-6">
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

        <div className="flex flex-col gap-6 h-full">
          <div className="overflow-x-scroll h-full sm:overflow-visible">
            <div className="flex sm:sticky sm:top-7 items-center child:py-2 bg-indigo-100 child:px-5 child:font-semibold w-[800px] sm:w-full h-full">
              <div className="w-16">
                <input type="checkbox" className="bg-transparent" />
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
            {offers.map((offer, index) => (
              <Offer offer={offer} key={index} setShowModal={setShowModal} />
            ))}
          </div>

          <div className="flex items-center justify-between flex-col-reverse sm:flex-row gap-3">
            <div className="flex items-center justify-end gap-1 relative text-slate-600">
              Showing 0 / 0 <span className="px-2 text-slate-300">|</span> Per
              page
              <div
                className="outline-none cursor-pointer font-medium text-indigo-500 lowercase"
                tabIndex="1"
              >
                0
              </div>
            </div>
            <div className="flex items-center justify-start child:cursor-pointer child:px-4 child:h-8 child:flex child:ring-0 child:transition child:items-center rounded overflow-hidden child-hover:opacity-90 child-focus:outline-none">
              <a
                href="#"
                className="text-gray-700 bg-gray-100 border-r border-slate-50 opacity-30 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-700 bg-gray-100 opacity-30 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {shoModal && (
        <div className="scf-modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999]">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"
            onClick={() => setShowModal(null)}
          ></div>
          <div className="z-[9999] w-full max-w-lg bg-white p-4 lg:p-8 rounded-lg flex flex-col gap-4 relative text-center">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setShowModal(null)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h3 className="font-semibold text-lg m-0">Delete Lead</h3>
            <p className="text-[14px] text-gray-500 m-0">
              Are you sure you want to delete this lead?
            </p>
            <div className="flex items-center justify-center child:text-center gap-3 mt-4 child:px-6 child:font-medium child:py-2.5 child:rounded child-hover:opacity-95 child:transition">
              <button className="relative group px-6 h-10 flex items-center gap-2 border rounded transition focus:ring-0 active:grayscale-100 active:opacity-95 overflow-hidden bg-transparent text-gray-600 border-gray-400 hover:bg-gray-600 hover:text-white hover:border-gray-600 cursor-pointer">
                <div className="bg-transparent text-gray-600 border-gray-400 hover:bg-gray-600 hover:text-white hover:border-gray-600 duration-300 absolute z-0 h-full w-full scale-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition"></div>
                <div
                  className="z-10 flex items-center justify-center gap-2 whitespace-nowrap"
                  onClick={() => setShowModal(null)}
                >
                  Cancel
                </div>
              </button>
              <button
                onClick={() => handleDelete(shoModal)}
                className="relative group px-6 h-10 flex items-center gap-2 border rounded transition focus:ring-0 active:grayscale-100 active:opacity-95 overflow-hidden bg-red-600 text-white border-red-600  hover:border-red-500 cursor-pointer"
              >
                <div className="bg-white opacity-0 group-hover:opacity-10 duration-200 group-hover:scale-110 absolute z-0 h-full w-full scale-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition"></div>
                <div className="z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Yes, delete!
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
