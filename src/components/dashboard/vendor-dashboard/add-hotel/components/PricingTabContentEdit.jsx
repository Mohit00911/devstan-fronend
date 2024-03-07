import React, { useState,useEffect } from "react";
import Loader from "@/components/loader/loader";

const PricingTabContent = ({ onDataFromChild,onSaveChanges ,initialValues}) => {
  const [tourData, setTourData] = useState({
    departureDetails: "",
    inclusions:"",
    exclusions:"",
    knowBeforeYouGo:"",
    additionalInfo:""
  });

  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
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
    setError("");``
  };


  // const handleSaveChanges = () => {
  //   onSaveChanges(); 
  // };

  const handleSaveChanges = () => {
    if (isAnyFieldFilled()) {
      setShowLoader(true);
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
      if (typeof tourData[key] === 'string' && tourData[key].trim() !== "") {
        return true;
      }
    }
    return false;
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
      </div>

      {error && <div className="text-danger">{error}</div>}
      {showSuccessMessage && (
        <div className="text-success">Changes saved successfully</div>
      )}
      <div className="d-inline-block pt-30">
      {showLoader ? (
        <Loader />
      ) : (
        <button
          type="button"  // Change to "button" to prevent form submission
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSaveChanges}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      )}
      </div>

    </div>
  );
};

export default PricingTabContent;


