import DateSearch from "@/components/activity-list/common/DateSearch";
import React, { useState,useEffect } from "react";
const LocationTabContent = ({ onDataFromChild,onSaveChanges,initialValues}) => {
  const [tourData, setTourData] = useState({
    cancellationPolicy: "",
    languages: "",
    highlights: "",
    whatsIncluded: "",
    whatsExcluded:"",
    availableDates:""
  });
  useEffect(() => {
    const commonFields = Object.keys(initialValues).reduce((acc, field) => {
      if (tourData.hasOwnProperty(field)) {
        acc[field] = initialValues[field];
      }
      return acc;
    }, {});
  
    setTourData((prevData) => ({
      ...prevData,
      ...commonFields,
    }));
  }, [initialValues]);
  const handleTourDataChange = (fieldName, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    onDataFromChild({
      ...tourData, 
      [fieldName]: value, 
    });
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
              value={tourData.cancellationPolicy}
              onChange={(e) => handleTourDataChange("cancellationPolicy", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Cancellation Policy</label>
          </div>
        </div>
    

        <div className="col-12">
          <div className="form-input">
            <textarea
              required
              rows={5}
              defaultValue={""}
              value={tourData.languages}
              onChange={(e) => handleTourDataChange("languages", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Available Languages</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.highlights}
              onChange={(e) => handleTourDataChange("highlights", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Highlights</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.whatsIncluded}
              onChange={(e) => handleTourDataChange("whatsIncluded", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">What's Included</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.whatsExcluded}
              onChange={(e) => handleTourDataChange("whatsExcluded", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">What's Excluded</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.availableDates}
              onChange={(e) => handleTourDataChange("availableDates", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Available Dates</label>
          </div>
        </div>


        <DateSearch/>
      </div>
      <div className="d-inline-block pt-30">
        <button
          onClick={handleSaveChanges}
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </div>
  );
};

export default LocationTabContent;
