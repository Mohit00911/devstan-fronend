
import DateSearch from "@/components/activity-list/common/DateSearch";
import DatePicker, { DateObject } from "react-multi-date-picker";

import Loader from "@/components/loader/loader";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAdd, MdDelete  } from "react-icons/md";


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

    overview:"",

  });

  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
  // const [showLoader, setShowLoader] = useState(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

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

  };
  const handleDateSelection = (selectedDates) => {
    setDates(selectedDates);
    const formattedDates = selectedDates
      .map((dateObject) => dateObject.format("MMMM DD, YYYY"))
      .join(" - ");
    handleTourDataChange("availableDates", formattedDates);
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

  // const isAnyFieldEmpty = () => {
  //   for (let key in tourData) {
  //     const fieldValue = tourData[key];
  //     if (Array.isArray(fieldValue)) {
  //       if (fieldValue.some(value => value.trim() === "")) {
  //         return true;
  //       }
  //     } else {
  //       if (fieldValue.trim() === "") {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };
  
  const handleSaveChanges = () => {
    if (!isAnyFieldFilled()) {
      setShowLoader(false);
      setShowSuccessMessage(false);
      setError("Please fill at least one input field.");
      return;
    }
  
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
  };


  const isAnyFieldFilled = () => {
    for (let key in tourData) {
      const value = tourData[key];
      if (
        (typeof value === "string" && value.trim() !== "") ||  // Check if string and not empty
        (Array.isArray(value) && value.some(item => typeof item === "string" && item.trim() !== ""))  // Check if array and contains non-empty strings
      ) {
        return true;
      }
    }
    return false;
  };
  


  const handleDeletewhatsExcluded = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      whatsExcluded: prevData.whatsExcluded.filter((_, i) => i !== index), 
    }));
  };
  const handleDeletewhatsIncluded = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      whatsIncluded: prevData.whatsIncluded.filter((_, i) => i !== index), 
    }));
  };
  const handleDeleteHighlights = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      highlights: prevData.highlights.filter((_, i) => i !== index), 
    }));
  };
  const handleDeleteLanguage = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter((_, i) => i !== index),
    }));
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
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.overview}
              onChange={(e) =>
                handleTourDataChange("overview", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">
             Overview
            </label>
          </div>
        </div>


        <div>
          {tourData.languages.map((item, index) => (
              <div  key={index} className="col-12">

            <div className="form-input mt-10">
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

              {tourData.languages.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button className="button h-40 px-10  bg-red-1 text-white mt-10" onClick={() => handleDeleteLanguage(index)}>
                  <MdDelete style={{fontSize: "1.5rem"}}/> 
                  </button>
                </div>
              )}
            </div> 
          ))}
        {/* <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldLanguage}>Add</button> */}
        <button className="button h-40 px-10 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldLanguage}><MdAdd style={{fontSize: "1.5rem"}}/></button>

        </div>

        <div >
          {tourData.highlights.map((item, index) => (
            <div key={index} className="col-12">
            <div  className="form-input mt-10">
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
              {tourData.highlights.length > 1 && ( // Check if there is more than one language field
                <div className="col-2">
                  <button className="button h-40 px-10  bg-red-1 text-white mt-10" onClick={() => handleDeleteHighlights(index)}>
                  <MdDelete style={{fontSize: "1.5rem"}}/> 

                  </button>
                </div>
              )}
            </div>
          ))}
<button className="button h-40 px-10 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldHighlights}><MdAdd style={{fontSize: "1.5rem"}}/></button>

        {/* <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldHighlights}>Add</button> */}
        </div>

        <div>
          {tourData.whatsIncluded.map((item, index) => (
            <div key={index} className="col-12">

            <div  className="form-input mt-10">
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
              {tourData.whatsIncluded.length > 1 && (
                <div className="col-2">
                 <button className="button h-40 px-10  bg-red-1 text-white mt-10" onClick={() => handleDeletewhatsIncluded(index)}>
                  <MdDelete style={{fontSize: "1.5rem"}}/> 
                  </button>
                </div>
              )}
            </div>
          ))}
<button className="button h-40 px-10 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldwhatsIncluded}><MdAdd style={{fontSize: "1.5rem"}}/></button>

        {/* <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldwhatsIncluded}>Add</button> */}
        </div>

        
        <div>
          {tourData.whatsExcluded.map((item, index) => (
                        <div key={index} className="col-12">

            <div  className="form-input mt-10">
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
              {tourData.whatsExcluded.length > 1 && ( 
                <div className="col-2">
                   <button className="button h-40 px-10  bg-red-1 text-white mt-10" onClick={() => handleDeletewhatsExcluded(index)}>
                  <MdDelete style={{fontSize: "1.5rem"}}/> 
                  </button>
                </div>
              )}
            </div>
          ))}
<button className="button h-40 px-10 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldwhatsExcluded}><MdAdd style={{fontSize: "1.5rem"}}/></button>

        {/* <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10" onClick={handleAddFieldwhatsExcluded}>Add</button> */}
        </div>

        <div className="col-12">
          <div className="col-12">
            <div className="form-input">
              <DatePicker
                placeholder={<input type="text" required />}
                inputClass="custom_input-picker"
                containerClassName="custom_container-picker"
                value={dates}
                onChange={handleDateSelection}
                numberOfMonths={2}
                offsetY={10}
                range
                rangeHover
                format="MMMM DD"
              />
              <label className="lh-1 text-16 text-light-1">
                Available Dates
              </label>
            </div>
          </div>
        </div>

       
      </div>
      {error && (
        <div className="text-danger">{error}</div>
      )}
      {showSuccessMessage  && (

        <div className="text-success">Changes saved successfully.</div>
      )}


      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "30px"}} >
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



export default LocationTabContentEdit;


