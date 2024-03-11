import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateSearch = ({onDateChange}) => {
  
  const handleDateSelection = (selectedDates) => {
    setDates(selectedDates);
    const formattedDates = selectedDates
    .map((dateObject) => dateObject.format("MMMM DD, YYYY"))
    .join(" - ");
    onDateChange(formattedDates)
  };
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
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
    </div>
  );
};

export default DateSearch;
