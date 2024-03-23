import React, { useState } from "react";
import Loader from "@/components/loader/loader";
import "../../../../../styles/checkbox.css";
import { Link } from "react-router-dom";
const DayItinerarySection = ({
  day,
  dayData,
  onDayDataChange,
  onDeleteDay,
}) => {
  const handleDeleteButtonClick = () => {
    onDeleteDay(day);
  };
  const handleInputChange = (fieldName, value) => {
    onDayDataChange(day, { ...dayData, [fieldName]: value });
  };

  const renderDeleteButton = () => {
    if (day === 1) return null;
    return <button  className="button h-50 px-24  bg-red-1 text-white mt-10" onClick={handleDeleteButtonClick}>Delete Day</button>;
  };
  console.log(dayData);

  const handleTourDataChangeTypes = (fieldName, value) => {
    const formattedFieldName = fieldName.trim().toLowerCase();

    let updatedTourType = [...dayData.meals];

    if (updatedTourType.includes(formattedFieldName)) {
      updatedTourType = updatedTourType.filter(
        (type) => type !== formattedFieldName
      );
    } else {
      updatedTourType.push(formattedFieldName);
    }

    // Update the state with the new array of meals
    onDayDataChange(day, { ...dayData, meals: updatedTourType });

    // Clear any previous error messages
    // setError("");
  };

  return (
    <div className="col-12">
      <h1>Day {day}</h1>
      <div className="row x-gap-20 y-gap-20">
      <div className="form-input">
        <input
          type="text"
          required
          value={dayData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Title</label>
      </div>
      <div className="form-input">
        <input
          type="text"
          required
          value={dayData.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Duration</label>
      </div>
      <div style={{display:"flex", alignItems: "center", justifyContent: "space-around"}}>
      <div style={{display:"flex", alignItems: "center", gap: "5px"}}>
          <input
             type="checkbox"
              name="breakfast"
              value="breakfast"
              id="breakfastCheckbox"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="group">Breakfast</label>
        </div>
      

        
        <div style={{display:"flex", alignItems: "center", gap: "5px"}}>
          <input
             type="checkbox"
              name="lunch"
              value="lunch"
              id="lunchCheckbox"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="group">Lunch</label>
        </div>

        <div style={{display:"flex", alignItems: "center", gap: "5px"}}>
          <input
            type="checkbox"
              name="dinner"
              value="dinner"
              id="dinnerCheckbox"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="group">Dinner</label>
        </div>
       
      </div>
      <div className="form-input">
        <input
          type="text"
          required
          value={dayData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Image</label>
      </div>
      <div className="form-input">
        <input
          type="text"
          required
          value={dayData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        <label className="lh-1 text-16 text-light-1">Description</label>
      </div>
      </div>
      {renderDeleteButton()}
    </div>
  );
};

const AttributesTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [itineraryData, setItineraryData] = useState([
    {
      title: "",
      durationMeal: "",
      image: "",
      description: "",
      meals: [],
      day: 1,
    },
  ]);

  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onDeleteDay = (day) => {
    setItineraryData((prevData) => {
      const newData = { ...prevData };
      delete newData[day];
      return newData;
    });
  };

  const handleDayDataChange = (day, data) => {
    setItineraryData((prevData) => ({
      ...prevData,
      [day]: data,
    }));
    onDataFromChild({ itineraries: itineraryData });
  };

  const isAnyFieldFilled = () => {
    for (let key in itineraryData) {
      const dayData = itineraryData[key];
      for (let field in dayData) {
        if (dayData[field].trim() !== "") {
          return true;
        }
      }
    }
    return false;
  };

  const handleSaveChanges = () => {
    setShowLoader(true);

    if (isAnyFieldFilled()) {
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

  const addDaySection = () => {
    const newDayNumber = Object.keys(itineraryData).length + 1;
    const newDay = {
      title: "",
      duration: "",
      image: "",
      description: "",
      meals: [],
      day: newDayNumber,
    };
    setItineraryData((prevData) => ({
      ...prevData,
      [newDayNumber]: newDay,
    }));
  };

  return (
    <div className="col-xl-9 col-lg-11">
      {Object.entries(itineraryData).map(([day, dayData]) => (
        <DayItinerarySection
          key={day}
          day={day}
          dayData={dayData}
          onDayDataChange={handleDayDataChange}
          onDeleteDay={onDeleteDay}
        />
      ))}

     <div style={{display: "flex", alignItems : "center", justifyContent: "space-between"}}>

      <div className="d-inline-block mt-30">
        
        <button
          type="button"
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={addDaySection}
        >
          Add Day
          <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>

      {error && <div className="text-danger">{error}</div>}
      {showSuccessMessage && (
        <div className="text-success">Tour information saved successfully!</div>
      )}

      <div className="d-inline-block mt-30">

        <div style={{display: "flex", alignItems : "center", gap: "10px"}}>



        {showLoader ? (
          <Loader />
        ) : (
          <button
            type="button"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={handleSaveChanges}
          >
            Save Changes
            <div className="icon-arrow-top-right ml-15" />
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
    </div>
    </div>

  );
};

export default AttributesTabContent;
