

import React, { useState, useEffect } from "react";
import Loader from "@/components/loader/loader";
import { Link } from "react-router-dom";

const PricingTabContentEdit = ({
  onDataFromChild,
  onSaveChanges,
  initialValues,
}) => {

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

  useEffect(() => {
    setTourData(initialValues);
  }, [initialValues]);

  const handleTourDataChange = (fieldName, value, index) => {
    if (
      fieldName === "inclusions" ||
      fieldName === "exclusions" ||
      fieldName === "knowBeforeYouGo" ||
      fieldName === "additionalInfo"
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

  const handleSaveChanges = () => {
    if (isAnyFieldFilled()) {
      setShowLoader(true);
      onSaveChanges()
        .then(() => {
          setShowLoader(false);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setShowLoader(false);
        });
    } else {
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
    <div className="col-xl-9 col-lg-11">
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              name="departureDetails"
              required
              value={tourData.departureDetails}
              onChange={(e) =>
                handleTourDataChange("departureDetails", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">
              Departure Details
            </label>
          </div>
        </div>

          {tourData.inclusions.map((item, index) => (
          <div key={index} className="col-12">

            <div className="form-input">
              <input
                type="text"
                name="inclusions"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("inclusions", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">Inclusions</label>
              </div>
              {tourData.inclusions.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button className="button h-50 px-24  bg-red-1 text-white mt-10" onClick={() => handleDeleteinclusions(index)}>
                    Delete
                  </button>
                </div>
              )}
          <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldinclusions}>Add</button>
            </div>
          ))}


          {tourData.exclusions.map((item, index) => (
          <div key={index} className="col-12">

            <div className="form-input">

              <input
                type="text"
                name="exclusions"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("exclusions", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">Exclusions</label>
              </div>
              {tourData.exclusions.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button className="button h-50 px-24  bg-red-1 text-white mt-10" onClick={() => handleDeleteexclusions(index)}>
                    Delete
                  </button>
                </div>
              )}
        <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldExclusions}>Add</button>
        </div>
          ))}


          {tourData.knowBeforeYouGo.map((item, index) => (
          <div key={index} className="col-12">

            <div  className="form-input">

              <input
                type="text"
                name="knowBeforeYouGo"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("knowBeforeYouGo", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
                knowBeforeYouGo
              </label>
              </div>
              {tourData.knowBeforeYouGo.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button className="button h-50 px-24  bg-red-1 text-white mt-10" onClick={() => handleDeleteknowBeforeYouGo(index)}>
                    Delete
                  </button>
                </div>
              )}
        <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldknowBeforeYouGo}>Add</button>
            </div>

          ))}

          {tourData.additionalInfo.map((item, index) => (
          <div key={index} className="col-12">

            <div className="form-input">

              <input
                type="text"
                name="additionalInfo"
                required
                value={item}
                onChange={(e) =>
                  handleTourDataChange("additionalInfo", e.target.value, index)
                }
              />
              <label className="lh-1 text-16 text-light-1">
                additionalInfo
              </label>
              </div>
              
            {tourData.additionalInfo.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button className="button h-50 px-24  bg-red-1 text-white mt-10" onClick={() => handleDeleteadditionalInfo(index)}>
                    Delete
                  </button>
                </div>
              )}
          <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldadditionalInfo}>Add</button>
        </div>
          ))}
        </div>



        {error && <div className="text-danger">{error}</div>}
        {showSuccessMessage && (
          <div className="text-success">Changes saved successfully</div>
        )}

<div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "30px"}} >

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

<Link to = "/vendor-dashboard/tours">
      <button
            type="button"
            className="button h-50 px-24  bg-red-1 text-white"
          >
            Cancel
          </button>
          </Link>
      </div>

    </div>
  );
};



export default PricingTabContentEdit;

