import MainFilterSearchBox from "./MainFilterSearchBox";

import MainFilterSearchBoxTour from "./MainFilterSearchBoxTour";
import React, { useState } from 'react';
const index = ({ onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState('Hotel');
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName)
    onTabChange(tabName);
  }


  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/masthead/1/bg.webp" className="js-lazy" />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center">
              <h1
                className="text-60 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                Find Next Place To Visit
              </h1>
              <p
                className="text-white mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Discover amzaing places at exclusive deals
              </p>
            </div>


            <div
              className="tabs -underline mt-60 js-tabs"
              data-aos="fade-up"
              data-aos-delay="200"
            >

            {selectedTab == "Hotel" ? <MainFilterSearchBox onTabChange={handleTabChange} />:null}
            {selectedTab == "Tour" ?  <MainFilterSearchBoxTour onTabChange={handleTabChange} />:null}
             
            </div>
           

          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
