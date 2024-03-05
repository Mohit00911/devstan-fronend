import React, { useState,useEffect } from "react";


const PricingTabContent = ({ onDataFromChild,onSaveChanges ,initialValues}) => {
  const [tourData, setTourData] = useState({
    departureDetails: "",
    inclusions:"",
    exclusions:"",
    knowBeforeYouGo:"",
    additionalInfo:""
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
    <div className="col-xl-9 col-lg-11">
    <div className="row x-gap-20 y-gap-20">
     <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="departureDetails"
          required
          value={tourData.departureDetails}
          onChange={(e) => handleTourDataChange("departureDetails", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Departure Details</label>
      </div>
     </div>
     <div className="col-12">


      <div className="form-input ">
        <input
          type="text"
          name="inclusions"
          required
          value={tourData.inclusions}
          onChange={(e) => handleTourDataChange("inclusions", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Inclusions</label>
      </div>
     </div>
      <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="exclusions"
          required
          value={tourData.exclusions}
          onChange={(e) => handleTourDataChange("exclusions", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Exclusions</label>
      </div>
      </div>
      <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="knowBeforeYouGo"
          required
          value={tourData.knowBeforeYouGo}
          onChange={(e) => handleTourDataChange("knowBeforeYouGo", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Know before you go</label>
      </div>
      </div>
      <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="additionalInfo"
          required
          value={tourData.additionalInfo}
          onChange={(e) => handleTourDataChange("additionalInfo", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Additional Information</label>
      </div>
      </div>
      <div className="col-md-12 d-inline-block mt-30">
        <button
          type="button"  // Change to "button" to prevent form submission
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSaveChanges}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>

    </div>
    </div>
  );
};

export default PricingTabContent;
