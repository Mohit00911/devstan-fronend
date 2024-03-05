import React, { useState } from "react";


const PricingTabContent = ({ onDataFromChild,onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    departureDetails: "",
    inclusions:"",
    exclusions:"",
    knowBeforeYouGo:"",
    additionalInfo:""
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onDataFromChild(tourData);
  };
 
  const handleSaveChanges = () => {
    onSaveChanges(); 
  
  };


  return (
    <div className="col-xl-9 col-lg-11">


    <div className="row x-gap-20 y-gap-20">


     <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="departureDetails"
          required
          value={tourData.departureDetails}
          onChange={handleChange}
        />
        <label className="lh-1 text-16 text-light-1">Departure Details</label>
      </div>
     </div>
     <div className="col-12">


      <div className="form-input ">
        <input
          type="text"
          name="inclusions"
          required
          value={tourData.inclusions}
          onChange={handleChange}
        />
        <label className="lh-1 text-16 text-light-1">Inclusions</label>
      </div>
     </div>
      <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="exclusions"
          required
          value={tourData.exclusions}
          onChange={handleChange}
        />
        <label className="lh-1 text-16 text-light-1">Exclusions</label>
      </div>
      </div>
      <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="knowBeforeYouGo"
          required
          value={tourData.knowBeforeYouGo}
          onChange={handleChange}
        />
        <label className="lh-1 text-16 text-light-1">Know before you go</label>
      </div>
      </div>
      <div className="col-12">

      <div className="form-input ">
        <input
          type="text"
          name="additionalInfo"
          required
          value={tourData.additionalInfo}
          onChange={handleChange}
        />
        <label className="lh-1 text-16 text-light-1">Additional Information</label>
      </div>
      </div>
      <div className="col-md-12 d-inline-block mt-30">
        <button
          type="button"  // Change to "button" to prevent form submission
          className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          onClick={handleSaveChanges}
        >
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>

    </div>
    </div>
  );
};

export default PricingTabContent;
