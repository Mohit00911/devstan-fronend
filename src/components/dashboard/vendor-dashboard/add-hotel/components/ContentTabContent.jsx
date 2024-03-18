import React, { useState } from "react";
import GalleryUploader from "./content/GalleryUploader";


import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/loader/loader";

const ContentTabContent = ({ onDataFromChild, onSaveChanges }) => {

  const [tourData, setTourData] = useState({
    name: "",
    location: "",
    cost: "",
    duration: "",
    groupSize: "",
  });


  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState("");


  const handleTourDataChange = (fieldName, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    onDataFromChild(tourData);

    // Clear error when user fills in any input field
    setError("");
  };

  const handleSaveChanges = () => {
    setShowLoader(true);

    if (isAnyFieldFilled()) {
      onSaveChanges()
        .then(() => {
          setShowLoader(false);
          setShowSuccessMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setShowLoader(false);
          // Handle error if necessary
        });
    } else {
      setShowLoader(false);
      setShowSuccessMessage(false);
      setError("Please fill at least one input field.");
    }
  };

  const isAnyFieldFilled = () => {
    for (let key in tourData) {
      if (tourData[key].trim() !== "") {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="col-xl-10">

      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.name}
              onChange={(e) => handleTourDataChange("name", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Tour Name</label>
          </div>
        </div>
        {/* End Name */}


        {/* Other input fields */}

        <div className="col-12">
          <div className="form-input">
            <textarea
              required
              rows={5}
              defaultValue={""}
              value={tourData.location}
              onChange={(e) => handleTourDataChange("location", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Location</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.cost}
              onChange={(e) => handleTourDataChange("cost", e.target.value)}
            />

            <label className="lh-1 text-16 text-light-1">Price</label>

            {/* <label className="lh-1 text-16 text-light-1">price</label> */}

          </div>
        </div>
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.groupSize}
              onChange={(e) => handleTourDataChange("groupSize", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Group size</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.duration}
              onChange={(e) => handleTourDataChange("duration", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Duration</label>
          </div>
        </div>
      </div>

      {error && <div className="text-danger">{error}</div>}
      {showSuccessMessage && (
        <div className="text-success">Tour Information saved successfully!</div>
      )}
      <div className="d-inline-block pt-30">
        {showLoader ? (
          <Loader />
        ) : (
          <button
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={handleSaveChanges}
          >
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        )}
      </div>

      {/* <div className="mt-30">
        <div className="fw-500">Gallery</div>
        <GalleryUploader onSaveImages={handleSaveImages} />
      </div> */}

      {/* <div className="d-inline-block pt-30">
        <button
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSaveChanges}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div> */}

    </div>
  );
};

export default ContentTabContent;
