import React from "react";
import { NavLink } from "react-router-dom";
import { PiArrowRight, PiArrowRightThin, PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import PlaceholderDoc from '../../assets/images/doc-placeholder.png'

const DocCard = ({
  image,
  title,
  date,
  richText,
  id,
  audience,
  kw,
  buss_id,
  tone,
  sound,
  fetchDocuments,
}) => {

  const db = getFirestore();

  const docRef = doc(db, "userDocs", id + "");
  const removeDoc = (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Loading...");
    deleteDoc(docRef)
      .then(() => {
        toast.success("Document Deleted Successfully!", { id: loadingId });
        console.log("Entire Document has been deleted successfully.");
      })
      .then(() => fetchDocuments())
      .catch((error) => {
        toast.error("An Error Occured", { id: loadingId });
        console.log(error);
      });
  };
  const htmlString = `<div className="card w-96 bg-primary text-primary-content">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn">Buy Now</button>
    </div>
  </div>
</div>`;

  // Parse the HTML string
  const parser = new DOMParser();
  const d = parser.parseFromString(richText, 'text/html');

  // Get the text content
  const textContent = d.body.textContent.trim() || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque rerum! Provident similique accusantium nemo autem`;

  return (
    <NavLink
      to={`/documents/${id || "editor"}`}
      state={{
        blogTitle: title,
        richText,
        id,
        audience,
        kw,
        buss_id,
        tone,
        sound,
      }}
      className={`flex flex-col gap-y-4 !justify-self-center  ${id ? "border-gray-300 bg-[#f5f5f5]" : "bg-primary"} border p-5  rounded-lg  md:justify-self-tart hover:cursor-pointer max-w-[300px]`}
    >
      <div className="flex justify-between">
        <p className={`font-semibold ${id ? "text-dark" : "text-white"} line-clamp-2`}>{title || "Have a new idea that require a hand?"}</p>
        <div>
          {
            id && (
              <div className="dropdown dropdown-left pt-2 h-full">
                <button
                  tabIndex={0}
                  className=" m-1"
                  onClick={(e) => e.preventDefault()}
                >
                  <PiDotsThreeVerticalBold className="text-[22px] cursor-pointer text-gray-700" />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu shadow bg-base-300 rounded-box w-52"
                >
                  <li>
                    <a onClick={removeDoc}>
                      <MdDeleteOutline className="text-red-600 text-[16px]" /> Delete
                    </a>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </div>
      {
        id  ? (
          <p className={`text-xs line-clamp-5 ${!id ? "text-white" : "text-light"}`}>{textContent ? textContent : null}</p>

        ) : (
          <p className={`text-xs line-clamp-4 ${!id ? "text-white" : "text-light"}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
           Start writing alongside AI to create a content piece that stands out. Write high-quality long-form content with convenience. </p>
        )
      }
      {!id && (<p className="text-white ml-auto text-xs flex items-center gap-x-1">Let Get Going <PiArrowRight size={18} color="white"/></p>)}
    </NavLink>
  );
};

export default DocCard;
