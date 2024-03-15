import DateSearch from "@/components/activity-list/common/DateSearch";

import Loader from "@/components/loader/loader";
import React, { useState, useEffect } from "react";

const LocationTabContentEdit = ({
  onDataFromChild,
  onSaveChanges,
  initialValues,
}) => {
  const [tourData, setTourData] = useState({
    cancellationPolicy: "",
    languages: [""],
    highlights: [""],
    whatsIncluded: [""],
    whatsExcluded: [""],
    availableDates: "",
  });
 
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [error, setError] = useState("");


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

  const handleTourDataChange = (fieldName, value, index) => {
    if (
      fieldName === "languages" ||
      fieldName === "highlights" ||
      fieldName === "whatsIncluded" ||
      fieldName === "whatsExcluded"
    ) {
      setTourData((prevData) => {
        const updatedArray = [...prevData[fieldName]];
        updatedArray[index] = value;
        const updatedData = {
          ...prevData,
          [fieldName]: updatedArray,
        };
        onDataFromChild(updatedData);
        return updatedData;
      });
    } else {
      setTourData((prevData) => {
        const updatedData = {
          ...prevData,
          [fieldName]: value,
        };
        onDataFromChild(updatedData);
        return updatedData;
      });
    }
    setError("");
  };

  
 

  // const handleSaveChanges = async () => {
  //   if (Object.values(tourData).every((value) => value === "")) {
  //     setShowErrorMessage(true);
  //     return;
  //   }

  //   setShowLoader(true);
  //   try {
  //     await onSaveChanges();
  //     setShowSuccessMessage(true);
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   } finally {
  //     setShowLoader(false);
  //   }
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
        });
    } else {
      setShowLoader(false);
      setShowSuccessMessage(false);
      setError("Please fill at least one input field.");
    }
  };

  const isAnyFieldFilled = () => {
    for (let key in tourData) {
        if (Array.isArray(tourData[key])) {
            if (tourData[key].some(item => typeof item === "string" && item.trim() !== "")) {
                return true;
            }
        } else if (typeof tourData[key] === "string" && tourData[key].trim() !== "") {
            return true;
        }
    }
    return false;
};

  const handleAddFieldLanguage = () => {
    setTourData({ ...tourData, languages: [...tourData.languages, ""] });
  };

  const handleAddFieldHighlights = () => {
    setTourData({ ...tourData, highlights: [...tourData.highlights, ""] });
  };
  const handleAddFieldwhatsIncluded = () => {
    setTourData({
      ...tourData,
      whatsIncluded: [...tourData.whatsIncluded, ""],
    });
  };
  const handleAddFieldwhatsExcluded = () => {
    setTourData({
      ...tourData,
      whatsExcluded: [...tourData.whatsExcluded, ""],
    });
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
              onChange={(e) =>
                handleTourDataChange("cancellationPolicy", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">
              Cancellation Policy
            </label>
          </div>
        </div>

        <div className="col-12">
          {tourData.languages.map((item, index) => (
            <div key={index} className="form-input">
              <input
                type="text"
                name="inclusions"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("languages", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
                Available Languages
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleAddFieldLanguage}>Add</button>

        <div className="col-12">
          {tourData.highlights.map((item, index) => (
            <div key={index} className="form-input">
              <input
                type="text"
                name="highlights"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("highlights", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
              Highlights
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleAddFieldHighlights}>Add</button>

        <div className="col-12">
          {tourData.whatsIncluded.map((item, index) => (
            <div key={index} className="form-input">
              <input
                type="text"
                name="whatsIncluded"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("whatsIncluded", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
              Whats Included
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleAddFieldwhatsIncluded}>Add</button>

        
        <div className="col-12">
          {tourData.whatsExcluded.map((item, index) => (
            <div key={index} className="form-input">
              <input
                type="text"
                name="whatsExcluded"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("whatsExcluded", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
              Whats Excluded
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleAddFieldwhatsExcluded}>Add</button>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.availableDates}
              onChange={(e) =>
                handleTourDataChange("availableDates", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">Available Dates</label>
          </div>
        </div>

        <DateSearch />
      </div>
      {error && 
        <div className="text-danger">{error}</div>
      }
      {showSuccessMessage  && (
        <div className="text-success">Changes saved successfully.</div>
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

export default LocationTabContentEdit;
