import GuestSearch from "./GuestSearch";
import DateSearch from "./DateSearch";
import { Link } from "react-router-dom";
import { useState } from "react";

const index = ({ tour,selectedPrice }) => {
 
console.log(selectedPrice)
  const token  =  localStorage.getItem("userId");
 
  const [tourData, setTourData] = useState({
  uuid: tour.uuid,
  
  
});

  const handledDateSelect = (selectedDates) => {
    setTourData((prevData) => ({ ...prevData, date: selectedDates }));
  };
  
  const handledGuestSelect = (selectedGuest) => {
  
    setTourData((prevData) => ({ ...prevData, guests: selectedGuest }));
  };

  return (
    <>
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
            <DateSearch onDateChange={handledDateSelect} />
          </div>
        </div>
      </div>

      <div className="col-12">
        <GuestSearch  onCountChange={handledGuestSelect}/>
      </div>
<div className="col-12">
      { token ? (

          <Link
            to={`/booking-page/${tour && tour.uuid}/${selectedPrice && selectedPrice.name}/${ selectedPrice  && selectedPrice.price}`}
            className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
          >
            Book Now
          </Link>
        ) : (
          <Link
            to="/login"
            className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
          >
            Book Now
          </Link>
        )
      }
          </div>
    </>
  );
};

export default index;
