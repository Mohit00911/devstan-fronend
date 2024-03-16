import { useSelector, useDispatch } from "react-redux";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
const MainFilterSearchBoxTour = ({ onTabChange}) => {
  const [tourData, setTourData] = useState({ location: "", date: "" });
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLocationSelect = (selectedLocation) => {
    setTourData((prevData) => ({ ...prevData, location: selectedLocation.location }));
  };
  const handledDateSelect = (selectedDates) => {
    setTourData((prevData) => ({ ...prevData, date: selectedDates }));
  };
  const handleSearch = () => {
    navigate(`/tour-list-v2?location=${tourData.location}&date=${tourData.date}`);
   
  };
  return (
    <>
      <div className="tabs__controls d-flex x-gap-30 y-gap-20 justify-center sm:justify-start js-tabs-controls">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            className={`tabs__button text-15 fw-500 text-white pb-4 js-tabs-button ${
              tab?.name === currentTab ? "is-tab-el-active" : ""
            }`}
            onClick={() => {
              dispatch(addCurrentTab(tab?.name));
              onTabChange(tab?.name);
            }}
          >
            {tab?.name}
          </button>
        ))}
      </div>

      <div className="position-relative mt-30 md:mt-20 js-tabs-content">
        <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
          <div className="button-grid items-center">
            <LocationSearch  onLocationSelect={handleLocationSelect}/>
            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  Check in - Check out
                </h4>
                <DateSearch  onDateChange={handledDateSelect}/>
              </div>
            </div>

        
            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-blue-1 text-white"
                onClick={handleSearch}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default MainFilterSearchBoxTour;
