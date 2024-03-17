import React, { useState, useEffect } from "react";
import Loader from "@/components/loader/loader";

const AttributesTabContentEdit = ({
  onDataFromChild,
  onSaveChanges,
  initialValues,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [itineraryData, setItineraryData] = useState([
    { title: "", durationMeal: "", image: "", description: "", day: 1 },
  ]);

  useEffect(() => {
    if (initialValues && initialValues.itineraries) {
      setItineraryData(initialValues.itineraries);
    }
  }, [initialValues]);

  const handleDayDataChange = (index, fieldName, value) => {
    const updatedData = [...itineraryData];
    updatedData[index] = {
      ...updatedData[index],
      [fieldName]: value
    };
    setItineraryData(updatedData);
    onDataFromChild({ itineraries: updatedData });
  };

  const handleAddSection = () => {
    setItineraryData(prevData => [
      ...prevData,
      { title: "", durationMeal: "", image: "", description: "", day: prevData.length + 1 }
    ]);
  };

  const handleDeleteSection = (index) => {
    const updatedData = [...itineraryData];
    updatedData.splice(index, 1);
    setItineraryData(updatedData);
    onDataFromChild({ itineraries: updatedData });
  };
  
  const handleSaveChanges = () => {
    setShowLoader(true);
    // Perform save changes logic
    onSaveChanges({ itineraries: itineraryData })
      .then(() => {
        setShowLoader(false);
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowLoader(false);
        setShowErrorMessage(true);
      });
  };
  
  return (
    <>
      {itineraryData.map((dayData, index) => (
        <div className="col-12" key={index}>
          <h1>Day {index + 1}</h1>
          <div className="form-input">
            <input
              type="text"
              required
              value={dayData.title}
              onChange={(e) =>
                handleDayDataChange(index, "title", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">Title</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              required
              value={dayData.durationMeal}
              onChange={(e) =>
                handleDayDataChange(index, "durationMeal", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">
              Duration and Meal
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              required
              value={dayData.image}
              onChange={(e) =>
                handleDayDataChange(index, "image", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">Image</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              required
              value={dayData.description}
              onChange={(e) =>
                handleDayDataChange(index, "description", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">Description</label>
          </div>
          <button
            type="button"
            className="button h-50 px-24 -dark-1 bg-red-1 text-white"
            onClick={() => handleDeleteSection(index)}
          >
            Delete
          </button>
        </div>
      ))}
      
      <div className="d-inline-block mt-30">
        <button
          type="button"
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleAddSection}
        >
          Add Section
        </button>
        <button
          type="button"
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white ml-2"
          onClick={handleSaveChanges}
        >
          Save Changes
          <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>

      {showLoader && <Loader />}
      {showSuccessMessage && (
        <div className="text-success">Tour information saved successfully!</div>
      )}
      {showErrorMessage && (
        <div className="text-danger">Error occurred while saving changes</div>
      )}
    </>
  );
};

export default AttributesTabContentEdit;
