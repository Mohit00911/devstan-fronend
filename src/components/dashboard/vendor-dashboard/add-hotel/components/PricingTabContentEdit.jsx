import React, { useState, useEffect } from "react";
import Loader from "@/components/loader/loader";

const PricingTabContentEdit = ({onDataFromChild, onSaveChanges, initialValues,}) => {
  const [tourData, setTourData] = useState({
    departureDetails: "",
    inclusions: [""],
    exclusions: [""],
    knowBeforeYouGo: [""],
    additionalInfo: [""],
  });
  console.log(initialValues);
  console.log(tourData);

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
    setError("");
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

  // const handleSaveChanges = () => {
  //   if (isAnyFieldFilled()) {
  //     setShowLoader(true);
  //     onSaveChanges()
  //       .then(() => {
  //         setShowLoader(false);
  //         setShowSuccessMessage(true);
  //         setTimeout(() => setShowSuccessMessage(false), 3000);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         setShowLoader(false);
  //       });
  //   } else {
  //     setError("Please fill at least one input field.");
  //   }
  // };

  
 

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

            <div  className="form-input">
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
            </div>
          ))}
          <button className="button col-1 h-30  -dark-1 bg-blue-1 text-white" onClick={handleAddFieldinclusions}>Add</button>


          {tourData.exclusions.map((item, index) => (
        <div key={index} className="col-12">
            <div  className="form-input">
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
            </div>
          ))}
        <button className="button col-1 h-30  -dark-1 bg-blue-1 text-white" onClick={handleAddFieldExclusions}>Add</button>


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
            </div>
          ))}
              
        <button className="button col-1 h-30  -dark-1 bg-blue-1 text-white"  onClick={handleAddFieldknowBeforeYouGo}>Add</button>



          {tourData.additionalInfo.map((item, index) => (
        <div key={index} className="col-12">
            <div  className="form-input">
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
            </div>
          ))}
        <button className="button col-1 h-30  -dark-1 bg-blue-1 text-white"   onClick={handleAddFieldadditionalInfo}>Add</button>

        {error && <div className="text-danger">{error}</div>}

        {showSuccessMessage && (
          <div className="text-success">Changes saved successfully</div>
        )}

<div className="d-inline-block mt-30">

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
    </div>
  );
};

export default PricingTabContentEdit;
