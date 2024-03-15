import React, { useState } from "react";
import Loader from "@/components/loader/loader";

const PricingTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    departureDetails: "",
    inclusions: [""],
    exclusions: [""],
    knowBeforeYouGo: [""],
    additionalInfo: [""],
  });

  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (fieldName, value, index) => {
    if (
      fieldName === "inclusions" ||
      fieldName === "exclusions" ||
      fieldName === "knowBeforeYouGo" ||
      fieldName === "additionalInfo"
    ) {
      const updatedArray = [...tourData[fieldName]];
      updatedArray[index] = value;
      setTourData((prevData) => ({
        ...prevData,
        [fieldName]: updatedArray,
      }));
    } else {
      setTourData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
    onDataFromChild(tourData);
  };

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

  const handleDeleteadditionalInfo = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      additionalInfo: prevData.additionalInfo.filter((_, i) => i !== index), 
    }));
  };
  const handleDeleteinclusions = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      inclusions: prevData.inclusions.filter((_, i) => i !== index), 
    }));
  };
  const handleDeleteexclusions = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      exclusions: prevData.exclusions.filter((_, i) => i !== index), 
    }));
  };
  const handleDeleteknowBeforeYouGo = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      knowBeforeYouGo: prevData.knowBeforeYouGo.filter((_, i) => i !== index),
    }));
  };
  const handleAddFieldExclusions = () => {
    setTourData({ ...tourData, exclusions: [...tourData.exclusions, ""] });
  };
  const handleAddFieldinclusions = () => {
    setTourData({ ...tourData, inclusions: [...tourData.inclusions, ""] });
  };
  const handleAddFieldknowBeforeYouGo = () => {
    setTourData({
      ...tourData,
      knowBeforeYouGo: [...tourData.knowBeforeYouGo, ""],
    });
  };
  const handleAddFieldadditionalInfo = () => {
    setTourData({
      ...tourData,
      additionalInfo: [...tourData.additionalInfo, ""],
    });
  };

  const isAnyFieldFilled = () => {
    for (let key in tourData) {
      if (typeof tourData[key] === "string" || tourData[key].trim() !== "") {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="col-xl-9 col-lg-11">
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              name="departureDetails"
              required
              value={tourData.departureDetails}
              onChange={handleChange}
            />
            <label className="lh-1 text-16 text-light-1">
              Departure Details
            </label>
          </div>
        </div>

        {tourData.inclusions.map((Inclusions, index) => (
          <div key={index} className="col-12">
            <div className="form-input">
              <input
                required
                value={Inclusions}
                onChange={(e) =>
                  handleChange("inclusions", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">Inclusions</label>
            </div>
            {tourData.inclusions.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button onClick={() => handleDeleteinclusions(index)}>
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}
        <button onClick={handleAddFieldinclusions}>Add</button>

        {tourData.exclusions.map((exclusion, index) => (
          <div key={index} className="col-12">
            <div className="form-input">
              <input
                required
                value={exclusion}
                onChange={(e) =>
                  handleChange("exclusions", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">Exclusions</label>
            </div>
            {tourData.exclusions.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button onClick={() => handleDeleteexclusions(index)}>
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}
        <button onClick={handleAddFieldExclusions}>Add</button>

        {tourData.knowBeforeYouGo.map((knowBeforeYouGo, index) => (
          <div key={index} className="col-12">
            <div className="form-input">
              <input
                required
                value={knowBeforeYouGo}
                onChange={(e) =>
                  handleChange("knowBeforeYouGo", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
                knowBeforeYouGo
              </label>
            </div>
            {tourData.knowBeforeYouGo.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button onClick={() => handleDeleteknowBeforeYouGo(index)}>
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}
        <button onClick={handleAddFieldknowBeforeYouGo}>Add</button>

        {tourData.additionalInfo.map((additionalInfo, index) => (
          <div key={index} className="col-12">
            <div className="form-input">
              <input
                required
                value={additionalInfo}
                onChange={(e) =>
                  handleChange("additionalInfo", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
                Additional Information
              </label>
            </div>
            {tourData.additionalInfo.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button onClick={() => handleDeleteadditionalInfo(index)}>
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}
        <button onClick={handleAddFieldadditionalInfo}>Add</button>
      </div>
      {error && <div className="text-danger">{error}</div>}
      {showSuccessMessage && (
        <div className="text-success">Tour Information saved successfully!</div>
      )}

      <div className=" d-inline-block mt-30">
        {showLoader ? (
          <Loader />
        ) : (
          <button
            type="button"
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
