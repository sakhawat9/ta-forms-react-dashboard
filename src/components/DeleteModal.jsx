import React from "react";

const DeleteModal = ({ setOffers, setShowModal, shoModal, setNotice }) => {
  const { restUrl, nonce } = window.taForms || {};

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
      setNotice("Offer deleted successfully!");
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      console.error(err);
      setNotice("Delete failed!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  return (
    <>
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
    </>
  );
};

export default DeleteModal;
