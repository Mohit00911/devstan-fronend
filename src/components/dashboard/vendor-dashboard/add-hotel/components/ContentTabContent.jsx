import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "@/components/loader/loader";
import { Link } from "react-router-dom";
import { render } from "react-dom";
// import {v2 as cloudinary} from 'cloudinary';

const ContentTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    name: "",
    location: "",
    cost: [
      {
        standardPrice: "",
      },
      {
        deluxePrice: "",
      },
      {
        premiumPrice: "",
      },
    ],
    duration: "",
    groupSize: "",
    tourType: [],
    images: [],
  });

  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  let newArray = [];

  const handleFileUpload = async (event) => {
    const fileList = event.target.files;
    const newImages = [];

    const formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (!["image/png", "image/jpeg"].includes(file.type.toLowerCase())) {
        setError(
          `Image ${file.name} is not a valid file type. Only PNG and JPEG are allowed.`
        );
        continue;
      }

      formData.append("file", file);
      newImages.push(URL.createObjectURL(file));

      const fileReader = new FileReader();

      const fileReaderPromise = new Promise((resolve, reject) => {
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = reject;
      });

      fileReader.readAsDataURL(file);

      try {
        const result = await fileReaderPromise;
        formData.append("file", result);
      } catch (error) {
        console.error("Error reading file:", error);
        setError(`Error reading file ${file.name}`);
      }
    }

    setImages([...images, ...newImages]);
    setError("");

    formData.append("upload_preset", "ljqbwqy9");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dmyzudtut/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setTourData(
        (prevData) => ({
          ...prevData,
          images: [...prevData.images, data.url],
        }),
        () => {
          // This callback function will be executed after setTourData has completed
          onDataFromChild({ images: tourData.images }); // Send updated images array to parent component
        }
      );
    } catch (error) {
      console.error("Error uploading image(s) to Cloudinary:", error);
    }
  };
  useEffect(() => {
    onDataFromChild({ images: tourData.images }); // Send updated images array to parent component
  }, [tourData.images]);
 

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleTourDataChangeTypes = (fieldName, value) => {
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
    // Trim string values
    if (typeof value === "string") {
      value = value
    }
  
    // Update duration separately
    if (fieldName === "duration") {
      const durationNumber = parseFloat(value);
      setTourData((prevData) => ({
        ...prevData,
        [fieldName]: durationNumber,
      }));
    } else if (fieldName === "standardPrice" || fieldName === "deluxePrice" || fieldName === "premiumPrice") {
      // Determine the index based on the fieldName
      let index = 0;
      if (fieldName === "deluxePrice") {
        index = 1;
      } else if (fieldName === "premiumPrice") {
        index = 2;
      }
  
      // Update the corresponding cost field at the specified index
      setTourData((prevData) => ({
        ...prevData,
        cost: [
          ...prevData.cost.slice(0, index), 
          { ...prevData.cost[index], [fieldName]: value }, 
          ...prevData.cost.slice(index + 1), 
        ],
      }));
      onDataFromChild({
        ...tourData,
        [fieldName]: value, 
      });
    } else {
      // Update other fields
      setTourData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
      onDataFromChild({
        ...tourData,
        [fieldName]: value, // Use value instead of fieldValue
      });
    }
};

  const handleSaveChanges = async () => {
    setShowLoader(true);

    if (isAnyFieldFilled()) {
      try {
        // Upload images to Cloudinary first
        await uploadImageToCloudinary();

        // Once images are uploaded, proceed to save changes
        await onSaveChanges();

        setShowLoader(false);
        setShowSuccessMessage(true);
      } catch (error) {
        console.error("Error:", error);
        setShowLoader(false);
      }
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
  const uploadImageToCloudinary = async () => {
    try {
      let imgArray = [];
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dmyzudtut/image/upload`,
          {
            method: "POST",
            body: imgData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image(s) to Cloudinary");
        }

        const data = await response.json();
       
        imgArray.push(data.url);
        onDataFromChild({ images: imgArray });
      } catch (error) {
        console.error("Error uploading image(s) to Cloudinary:", error);
        // Handle error
      }
    } catch (error) {
      console.error("Error uploading image(s) to Cloudinary:", error);
      throw error;
    }
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              id="religious"
              name="tourType"
              value="religious"
              onChange={(e) =>
                handleTourDataChangeTypes(e.target.value, e.target.checked)
              }
            />
            <label className="lh-1 text-16 " htmlFor="religious">
              Religious
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              id="customized"
              name="tourType"
              value="customised"
              onChange={(e) =>
                handleTourDataChangeTypes(e.target.value, e.target.checked)
              }
            />
            <label className="lh-1 text-16 " htmlFor="customized">
              Customised
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              id="group"
              name="tourType"
              value="group Tour"
              onChange={(e) =>
                handleTourDataChangeTypes(e.target.value, e.target.checked)
              }
            />
            <label className="lh-1 text-16 " htmlFor="group">
              Group Tour
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              id="private"
              name="tourType"
              value="private"
              onChange={(e) =>
                handleTourDataChangeTypes(e.target.value, e.target.checked)
              }
            />
            <label className="lh-1 text-16 " htmlFor="private">
              Private
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              id="solo"
              name="tourType"
              value="solo Tour"
              onChange={(e) =>
                handleTourDataChangeTypes(e.target.value, e.target.checked)
              }
            />
            <label className="lh-1 text-16 " htmlFor="solo">
              Solo Tour
            </label>
          </div>
        </div>

        <div className="col-12">
          <h3>Pricing</h3>
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.standardPrice}
              onChange={(e) =>
                handleTourDataChange("standardPrice", e.target.value)
              }
            />
            <label className="lh-1 text-16">Standard Price</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.deluxePrice}
              onChange={(e) =>
                handleTourDataChange("deluxePrice", e.target.value)
              }
            />
            <label className="lh-1 text-16">Deluxe Price</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.premiumPrice}
              onChange={(e) =>
                handleTourDataChange("premiumPrice", e.target.value)
              }
            />
            <label className="lh-1 text-16">Premium Price</label>
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

        <div className="row x-gap-20 y-gap-20 pt-15">
          <div className="col-auto">
            <div className="w-200">
              <label htmlFor="bannerUpload" className="d-flex ratio ratio-1:1">
                <div className="flex-center flex-column text-center bg-blue-2 h-full w-1/1 absolute rounded-4 border-type-1">
                  <div className="icon-upload-file text-40 text-blue-1 mb-10" />
                  <div className="text-blue-1 fw-500">Upload Images</div>
                </div>
              </label>
              <input
                type="file"
                id="bannerUpload"
                multiple
                accept="image/png, image/jpeg"
                className="d-none"
                onChange={handleFileUpload}
              />
              <div className="text-start mt-10 text-14 text-light-1">
                PNG or JPG no bigger than 800px wide and tall.
              </div>
            </div>
          </div>
          {/* End uploader field */}

          {images.map((image, index) => (
            <div className="col-auto" key={index}>
              <div className="d-flex ratio ratio-1:1 w-200">
                <img src={image} alt="image" className="img-ratio rounded-4" />
                <div
                  className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute"
                  onClick={() => handleRemoveImage(index)}
                >
                  <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                    <i className="icon-trash text-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {error && <div className="col-12 mb-10  text-red-1">{error}</div>}
        </div>
      </div>

      {error && <div className="text-danger">{error}</div>}
      {showSuccessMessage && (
        <div className="text-success">Tour Information saved successfully!</div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
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
        <Link to="/vendor-dashboard/tours">
          <button
            type="button"
            className="button h-50 px-24  bg-red-1 text-white"
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContentTabContent;
