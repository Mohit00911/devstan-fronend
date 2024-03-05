import React, { useState } from "react";
import GalleryUploader from "./content/GalleryUploader";
import { v4 as uuidv4 } from "uuid";
const ContentTabContent = ({ onDataFromChild,onSaveChanges  }) => {
  

  const [tourData, setTourData] = useState({
    name: "",
    location: "",
    cost: "",
    duration: "",
    groupSize: "",
  });


  const handleTourDataChange = (fieldName, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    onDataFromChild(tourData);
    return tourData
  };
 
  const handleSaveChanges = () => {
    onSaveChanges(); 
   
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
            <label className="lh-1 text-16 text-light-1">price</label>
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

      {/* <div className="mt-30">
        <div className="fw-500">Gallery</div>
        <GalleryUploader onSaveImages={handleSaveImages} />
      </div> */}

      <div className="d-inline-block pt-30">
        <button
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSaveChanges}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </div>
  );
};

export default ContentTabContent;
