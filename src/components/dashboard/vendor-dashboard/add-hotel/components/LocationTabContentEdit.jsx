import React, { useState,useEffect } from "react";
import Loader from "@/components/loader/loader";

const LocationTabContent = ({ onDataFromChild,onSaveChanges,initialValues}) => {
  const [tourData, setTourData] = useState({
    cancellationPolicy: "",
    languages: "",
    highlights: "",
    whatsIncluded: "",
    whatsExcluded:"",
    availableDates:""
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
    setError("");
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
          onClick={handleSaveChanges}
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      )}
      </div>
    </div>
  );
};

export default LocationTabContent;

