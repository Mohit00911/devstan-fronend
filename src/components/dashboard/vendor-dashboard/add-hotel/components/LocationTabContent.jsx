
import DateSearch from "@/components/hero/DateSearch";

import Education from "./location/Education";
import Health from "./location/Health";
import Location from "./location/Location";
import Sorroundings from "./location/Sorroundings";
import Transportation from "./location/Transportation";


import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { v4 as uuidv4 } from "uuid";

import Loader from "@/components/loader/loader";

const LocationTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    cancellationPolicy: "",
    languages: [""],
    highlights: [""],
    whatsIncluded: [""],
    whatsExcluded: [""],
    availableDates: "",
  });

  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleTourDataChange = (fieldName, value, index) => {
    if (
      fieldName === "languages" ||
      fieldName === "highlights" ||
      fieldName === "whatsIncluded" ||
      fieldName === "whatsExcluded"
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
    setError("");
  };

  const handleDateSelection = (selectedDates) => {
    setDates(selectedDates);
    const formattedDates = selectedDates
      .map((dateObject) => dateObject.format("MMMM DD, YYYY"))
      .join(" - ");
    handleTourDataChange("availableDates", formattedDates);
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
        });
    } else {
      setShowLoader(false);
      setShowSuccessMessage(false);
      setError("Please fill at least one input field.");
    }
  };

  // const isAnyFieldFilled = () => {
  //   for (let key in tourData) {
  //     if (typeof tourData[key] === "string" || tourData[key].trim() !== "") {
  //       return true;
  //     }
  //   }
  //   return false;
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

        {/* Other input fields */}
        <div>
          {tourData.languages.map((language, index) => (
            <div key={index} className="col-12">
              <div className="form-input">
                <input
                  required
                  value={language}
                  onChange={(e) =>
                    handleTourDataChange("languages", e.target.value, index)
                  }
                />
                <label className="lh-1 text-16 text-light-1">
                  Available Languages
                </label>
              </div>
            </div>
          ))}

          <button onClick={handleAddFieldLanguage}>Add</button>
        </div>

        <div>
          {tourData.highlights.map((highlight, index) => (
            <div key={index} className="col-12">
              <div className="form-input">
                <input
                  required
                  value={highlight}
                  onChange={(e) =>
                    handleTourDataChange("highlights", e.target.value, index)
                  }
                />
                <label className="lh-1 text-16 text-light-1">Highlights</label>
              </div>
            </div>
          ))}

          <button onClick={() => handleAddFieldHighlights("highlights")}>
            Add
          </button>
        </div>
        <div>
          {tourData.whatsIncluded.map((whatsIncluded, index) => (
            <div key={index} className="col-12">
              <div className="form-input">
                <input
                  required
                  value={whatsIncluded}
                  onChange={(e) =>
                    handleTourDataChange("whatsIncluded", e.target.value, index)
                  }
                />
                <label className="lh-1 text-16 text-light-1">
                  Whats Included
                </label>
              </div>
            </div>
          ))}

          <button onClick={handleAddFieldwhatsIncluded}>Add</button>
        </div>

        <div>
          {tourData.whatsExcluded.map((whatsExcluded, index) => (
            <div key={index} className="col-12">
              <div className="form-input">
                <input
                  required
                  value={whatsExcluded}
                  onChange={(e) =>
                    handleTourDataChange("whatsExcluded", e.target.value, index)
                  }
                />
                <label className="lh-1 text-16 text-light-1">
                  Whats Excluded
                </label>
              </div>
            </div>
          ))}

          <button onClick={handleAddFieldwhatsExcluded}>Add</button>
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
      {error && <div className="text-danger">{error}</div>}
      {showSuccessMessage && (
        <div className="text-success">Tour Information saved successfully!</div>
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
