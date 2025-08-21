import React, { useState } from "react";
import moment from "moment";
import OfferDetail from "./OfferDetails";

const Offer = ({ offer, index, setShowModal, selected, toggleSelectOffer }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAllMeta, setShowAllMeta] = useState(false);
  const field = offer?.field;
  const metaInfo = offer?.meta;

  const displayTime = moment(offer.created_at).calendar(null, {
    sameDay: "[Today at] h:mm A",
    lastDay: "[Yesterday at] h:mm A",
    lastWeek: "dddd [at] h:mm A",
    sameElse: "MMM D, YYYY [at] h:mm A",
  });

  const siteUrl = window.location.origin; // Or set manually
  const adminUrl = `${siteUrl}/wp-admin/admin.php`;
  const resendUrl = `${adminUrl}?page=ta-forms&action=resend_verification&offer_id=${offer.id}`;

  return (
    <>
      <div
        className="flex flex-col w-full h-full border border-slate-100 border-t-0 divide-y divide-slate-100 transition-all overflow-hidden w-[800px] sm:w-full"
        locked="false"
        key={index}
      >
        <div
          onClick={(e) => {
            if (e.target.type !== "checkbox") {
              setShowDetails((prev) => !prev);
            }
          }}
          className="w-full flex items-center child:py-2.5 child:px-5 last-child:text-right cursor-pointer hover:bg-gray-50 transition-all"
        >
          <div className="w-16 no-details">
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectOffer(offer.id);
              }}
            />
          </div>
          <div className="w-[220px] min-w-[220px] break-words">
            {field.ta_forms_full_name}
          </div>
          <div className="w-[250px] min-w-[250px] break-words">
            {field.ta_forms_email}
            {(offer.verify_status === "verified" && (
              <span className="text-green-600 text-xs"> Verified</span>
            )) ||
              (offer.verify_status === "pending" && (
                <span className="text-yellow-600 text-xs">
                  {" "}
                  Pending Verification -{" "}
                  <a
                    href={`${resendUrl}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      fetch(resendUrl, { method: "POST" })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log(data);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Resend
                  </a>
                </span>
              ))}
          </div>
          <div className="w-[150px] min-w-[150px] break-words">
            {field.ta_forms_phone}
          </div>
          <div className="w-full break-words">{field.ta_forms_proposal}</div>
          <div className="w-[100px] min-w-[100px] break-words">
            {field.ta_forms_offer}
          </div>
          <div className="w-[200px] min-w-[200px] white sm:whitespace-nowrap">
            {displayTime}
          </div>
          <div className="w-[150px] min-w-[150px]">
            <div className="flex items-center justify-end gap-3">
              <button
                className={`h-8 w-8 flex items-center justify-center hover:opacity-90 transition cursor-pointer ${
                  showDetails ? "bg-indigo-500" : "bg-indigo-100"
                } ${showDetails ? "text-indigo-50" : "text-indigo-600"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
                  {showDetails && (
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"></path>
                  )}
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(offer.id);
                }}
                className="no-details active:bg-red-400 h-8 w-8 flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition cursor-pointer"
              >
                <svg
                  className="bi bi-trash3-fill"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <OfferDetail
          showAllMeta={showAllMeta}
          setShowAllMeta={setShowAllMeta}
          showDetails={showDetails}
          metaInfo={metaInfo}
          field={field}
        />
      </div>
    </>
  );
};

export default Offer;
