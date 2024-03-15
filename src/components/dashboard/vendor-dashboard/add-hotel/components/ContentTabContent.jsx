import React, { useState } from "react";
import Loader from "@/components/loader/loader";

const ContentTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    name: "",
    location: "",
    cost: "",
    duration: "",
    groupSize: "",
    tourType: [],
  });
 
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState("");

  const handleTourDataChangeTypes = (fieldName, value) => {
    console.log(fieldName);
    const formattedFieldName = fieldName.trim().toLowerCase();

    let updatedTourType = [...tourData.tourType];

    if (updatedTourType.includes(formattedFieldName)) {
      updatedTourType = updatedTourType.filter(
        (type) => type !== formattedFieldName
      );
    } else {
      updatedTourType.push(formattedFieldName);
    }

    setTourData((prevData) => ({
      ...prevData,
      [formattedFieldName]: value,
      tourType: updatedTourType,
    }));
    onDataFromChild({ tourType: updatedTourType });
    setError("");
  };

  const handleTourDataChange = (fieldName, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    onDataFromChild(tourData);
    setError("");
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
      if (tourData[key].trim() !== "") {
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
              value={tourData.name}
              onChange={(e) => handleTourDataChange("name", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Tour Name</label>
          </div>
        </div>
        {/* End Name */}

        {/* Other input fields */}
        <div className="col-12">
          <div className="form-input">
            <textarea
              required
              rows={5}
              defaultValue={""}
              value={tourData.location}
              onChange={(e) => handleTourDataChange("location", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Location</label>
          </div>
        </div>

        <label htmlFor="tourTypes" className="text-16 text-light-1">
          Tour Types:
        </label>
        <div>
          <input
            type="checkbox"
            id="religious"
            name="tourType"
            value="religious"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="religious">Religious</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="customized"
            name="tourType"
            value="customised"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="customized">Customised</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="group"
            name="tourType"
            value="group Tour"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="group">Group Tour</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="private"
            name="tourType"
            value="private"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="private">Private</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="solo"
            name="tourType"
            value="solo Tour"
            onChange={(e) =>
              handleTourDataChangeTypes(e.target.value, e.target.checked)
            }
          />
          <label htmlFor="solo">Solo Tour</label>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.cost}
              onChange={(e) => handleTourDataChange("cost", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Price</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.groupSize}
              onChange={(e) =>
                handleTourDataChange("groupSize", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">Group size</label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.duration}
              onChange={(e) => handleTourDataChange("duration", e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Duration</label>
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

export default ContentTabContent;
