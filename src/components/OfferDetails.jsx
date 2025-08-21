import React, { useState } from "react";
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

const OfferDetail = ({
  showAllMeta,
  setShowAllMeta,
  showDetails,
  metaInfo,
  field,
}) => {
  const metaToShow = showAllMeta ? metaFields : metaFields.slice(0, 7);
  const [copiedForm, setCopiedForm] = useState("");
  const [copiedOthers, setCopiedOthers] = useState("");
  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      return new Promise((resolve, reject) => {
        try {
          document.execCommand("copy");
          resolve();
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(textArea);
        }
      });
    }
  };

  const copyFormData = () => {
    const text = `
Name: ${field.ta_forms_full_name}
Email: ${field.ta_forms_email}
Phone: ${field.ta_forms_phone}
Message: ${field.ta_forms_proposal}
  `.trim();

    copyToClipboard(text).then(() => {
      setCopiedForm("✅ Copied!");
      setTimeout(() => setCopiedForm(""), 1000);
    });
  };

  const copyMetaData = () => {
    const text = metaFields
      .map((item) => `${item.label}: ${metaInfo[item.key] || ""}`)
      .join("\n");

    copyToClipboard(text).then(() => {
      setCopiedOthers("✅ Copied!");
      setTimeout(() => setCopiedOthers(""), 1000);
    });
  };

  return (
    <>
      {showDetails && (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 child:h-full">
          <div className="p-5 md:p-6 w-full flex flex-col gap-4 pr-0">
            <h2 className="text-slate-500 font-medium m-0">
              Form Submitted data
            </h2>
            <div className="bg-slate-50 py-5 px-6 h-full rounded border border-slate-100 relative">
              <span
                onClick={copyFormData}
                className="absolute right-4 top-4 flex items-center gap-2 cursor-pointer transition text-slate-400 hover:text-slate-700"
              >
                <svg className="text-xl" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                {copiedForm && (
                  <div className="absolute px-2 py-1 rounded shadow-lg z-[999] transition right-7 -top-1 w-[84px] text-green-600">
                    {copiedForm}
                  </div>
                )}
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
            <h2 className="text-slate-500 font-medium m-0">
              Others Information
            </h2>
            <div className="bg-slate-50 p-6 rounded h-full border border-slate-100 relative">
              <span
                onClick={copyMetaData}
                className="absolute right-4 top-4 flex items-center gap-2 cursor-pointer transition text-slate-400 hover:text-slate-700"
              >
                <svg className="text-xl" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                {copiedOthers && (
                  <div className="absolute px-2 py-1 rounded shadow-lg z-[999] transition right-7 -top-1 w-[84px] text-green-600">
                    {copiedOthers}
                  </div>
                )}
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
