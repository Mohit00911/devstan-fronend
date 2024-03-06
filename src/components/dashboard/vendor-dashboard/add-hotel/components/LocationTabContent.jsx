import DateSearch from "@/components/hero/DateSearch";
import Education from "./location/Education";
import Health from "./location/Health";
import Location from "./location/Location";
import Sorroundings from "./location/Sorroundings";
import Transportation from "./location/Transportation";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { v4 as uuidv4 } from "uuid";
const LocationTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    cancellationPolicy: "",
    languages: "",
    highlights: "",
    whatsIncluded: "",
    whatsExcluded: "",
    availableDates: "",
  });

  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  const handleTourDataChange = (fieldName, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    onDataFromChild(tourData);
  };
  
  const handleDateSelection = (selectedDates) => {
    setDates(selectedDates);
    const formattedDates = selectedDates
    .map((dateObject) => dateObject.format("MMMM DD, YYYY"))
    .join(" - ");
    handleTourDataChange("availableDates", formattedDates);
  };
  const handleSaveChanges = () => {
    onSaveChanges();
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
            <textarea
              required
              rows={5}
              defaultValue={""}
              value={tourData.languages}
              onChange={(e) =>
                handleTourDataChange("languages", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">
              Available Languages
            </label>
          </div>
        </div>

        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.highlights}
              onChange={(e) =>
                handleTourDataChange("highlights", e.target.value)
              }
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
              onChange={(e) =>
                handleTourDataChange("whatsIncluded", e.target.value)
              }
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
              onChange={(e) =>
                handleTourDataChange("whatsExcluded", e.target.value)
              }
            />
            <label className="lh-1 text-16 text-light-1">What's Excluded</label>
          </div>
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
      <div className="d-inline-block pt-30">
        <button
          onClick={handleSaveChanges}
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </div>
  );
};

export default LocationTabContent;
