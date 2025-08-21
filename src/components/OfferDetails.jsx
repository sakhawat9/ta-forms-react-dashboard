import React from "react";
const metaFields = [
  { label: "Device", key: "device" },
  { label: "Browser", key: "browser" },
  { label: "Platform", key: "platform" },
  { label: "Screen", key: "screen" },
  { label: "Language", key: "language" },
  { label: "Vendor", key: "vendor" },
  { label: "URL", key: "url" },
  { label: "Referrer", key: "referrer" },
  { label: "Country_Code", key: "country_code" },
  { label: "Country", key: "country", flag: "country_flag" },
  { label: "City", key: "city" },
  { label: "Region", key: "region" },
  { label: "Timezone", key: "timezone" },
  { label: "Currency", key: "currency" },
  { label: "IP", key: "ip" },
  { label: "Latitude", key: "latitude" },
  { label: "Longitude", key: "longitude" },
  { label: "ISP", key: "isp" },
  { label: "Organization", key: "org" },
  { label: "User_ID", key: "wp_user_id" },
  { label: "User_First_Name", key: "wp_first_name" },
  { label: "User_Last_Name", key: "wp_last_name" },
  { label: "User_Email", key: "wp_email" },
];

const OfferDetail = ({ showAllMeta, setShowAllMeta, showDetails, metaInfo, field }) => {
  const metaToShow = showAllMeta ? metaFields : metaFields.slice(0, 7);

  return (
    <>
      {showDetails && (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 child:h-full">
          <div className="p-5 md:p-6 w-full flex flex-col gap-4 pr-0">
            <h2 className="text-slate-500 font-medium m-0">Form Submitted data</h2>
            <div className="bg-slate-50 py-5 px-6 h-full rounded border border-slate-100 relative">
              <span className="absolute right-4 top-4 flex items-center gap-2 cursor-pointer transition text-slate-400 hover:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"></path>
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm4.5 6V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5a.5.5 0 0 1 1 0"></path>
                </svg>
              </span>
              <div className="flex gap-4 w-full items-start mb-2 last:mb-0 text-[14px] 24 font-normal text-gray-400">
                <span className="capitalize whitespace-nowrap w-32 text-right">
                  name
                </span>
                :
                <span className="w-full text-gray-700 [&>a]:text-indigo-500 [&>a]:ring-0 [&>a]:hover:text-indigo-600 [&>a]:hover:underline [&>a]:transition-all [&>a]:cursor-pointer">
                  <span>{field.ta_forms_full_name}</span>
                </span>
              </div>
              <div className="flex gap-4 w-full items-start mb-2 last:mb-0 text-[14px] 24 font-normal text-gray-400">
                <span className="capitalize whitespace-nowrap w-32 text-right">
                  email
                </span>
                :
                <span className="w-full text-gray-700 [&>a]:text-indigo-500 [&>a]:ring-0 [&>a]:hover:text-indigo-600 [&>a]:hover:underline [&>a]:transition-all [&>a]:cursor-pointer">
                  <a href={`mailto:${field.ta_forms_email}`}>
                    {field.ta_forms_email}
                  </a>
                </span>
              </div>
              <div className="flex gap-4 w-full items-start mb-2 last:mb-0 text-[14px] 24 font-normal text-gray-400">
                <span className="capitalize whitespace-nowrap w-32 text-right">
                  phone
                </span>
                :
                <span className="w-full text-gray-700 [&>a]:text-indigo-500 [&>a]:ring-0 [&>a]:hover:text-indigo-600 [&>a]:hover:underline [&>a]:transition-all [&>a]:cursor-pointer">
                  <a tel="435634563456" href="tel:435634563456">
                    {field.ta_forms_phone}
                  </a>
                </span>
              </div>
              <div className="flex gap-4 w-full items-start mb-2 last:mb-0 text-[14px] 24 font-normal text-gray-400">
                <span className="capitalize whitespace-nowrap w-32 text-right">
                  message
                </span>
                :
                <span className="w-full text-gray-700 [&>a]:text-indigo-500 [&>a]:ring-0 [&>a]:hover:text-indigo-600 [&>a]:hover:underline [&>a]:transition-all [&>a]:cursor-pointer">
                  <span>{field.ta_forms_proposal}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="p-5 md:p-6 w-full flex flex-col gap-4 pl-0">
            <h2 className="text-slate-500 font-medium m-0">Others Information</h2>
            <div className="bg-slate-50 p-6 rounded h-full border border-slate-100 relative">
              <span className="absolute right-12 top-4 flex items-center gap-2 cursor-pointer transition text-slate-400 hover:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"></path>
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm4.5 6V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5a.5.5 0 0 1 1 0"></path>
                </svg>
              </span>
              {metaToShow.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 w-full items-start mb-2 last:mb-0 text-[14px] font-normal text-gray-400"
                >
                  <span className="capitalize whitespace-nowrap w-32 text-right">
                    {item.label}
                  </span>
                  :
                  <span className="w-full text-gray-700 tracking-wide flex items-center gap-3 flex-wrap [&>img]:w-auto [&>img]:h-5 [&>img]:rounded">
                    {metaInfo[item.key]}
                    {item.label === "Country" && (
                        <img src={metaInfo[item.flag]} alt={metaInfo[item.key]} />
                    )}
                  </span>
                </div>
              ))}
              <div className="pl-10 mt-6 text-sm">
                <button
                  className="text-indigo-500 hover:text-indigo-600 transition cursor-pointer"
                  onClick={() => setShowAllMeta((prev) => !prev)}
                >
                  {showAllMeta ? "- Show Less" : "+ Show More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferDetail;
