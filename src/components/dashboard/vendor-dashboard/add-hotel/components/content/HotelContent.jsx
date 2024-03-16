const HotelContent = ({ onTourDataChange }) => {
  const handleInputChange = (fieldName, e) => {
    const value = e.target.value;
    onTourDataChange(fieldName, value);
  };
  return (
    <div className="row x-gap-20 y-gap-20">
    <div className="col-12">
      <div className="form-input">
        <input
          type="text"
          required
          onChange={(e) => handleInputChange("tourName", e)}
        />
        <label className="lh-1 text-16 text-light-1">Tour Name</label>
      </div>
    </div>
    
    {/* End Name */}

    <div className="col-12">
      <div className="form-input">
        <textarea
          required
          rows={5}
          defaultValue={""}
          onChange={(e) => handleInputChange("content", e)}
        />
        <label className="lh-1 text-16 text-light-1">Location</label>
      </div>
    </div>

    
  </div>
  );
};

export default HotelContent;
