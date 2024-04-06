import React, { useState } from "react";
import { CloudinaryContext, Image, Transformation, Video } from 'cloudinary-react';
import Loader from "@/components/loader/loader";
import { Link } from "react-router-dom";
// import {v2 as cloudinary} from 'cloudinary';

const ContentTabContent = ({ onDataFromChild, onSaveChanges }) => {
  const [tourData, setTourData] = useState({
    name: "",
    location: "",
    cost: "",
    duration: "",
    groupSize: "",
    tourType: [],
    images: [],
  });

  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const fileList = event.target.files;
    const newImages = [];
    const fileObjects = []; // Array to store file objects
  
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Push the file object to the fileObjects array
      fileObjects.push(file);
  
      // Optionally, you can push the file name to the newImages array
      newImages.push(file.name);
    }
  
    // Update the state with the new file objects and image names
    setImages([...images, ...newImages]);
    setError("");
  };
  console.log(images)
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
    console.log(fieldName)
    console.log(value)
  
    if (typeof value === 'string' || value instanceof String) {
      value = value.trim(); 
    }
  
    if (fieldName === "duration") {
      const durationNumber = parseFloat(value);
      setTourData((prevData) => ({
        ...prevData,
        [fieldName]: durationNumber,
      }));
    } else {
      // Check if value is a string before calling trim()
      const fieldValue = typeof value === 'string' ? value.trim() : value;
      
      setTourData((prevData) => ({
        ...prevData,
        [fieldName]: fieldValue,
      }));
      onDataFromChild({
        ...tourData,
        [fieldName]: fieldValue,
      });
  
      setError("");
    }
  };
  
  
  const handleSaveChanges = async () => {
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
        });
        // console.log(images)
        uploadImageToCloudinary()
      // const uploadedImages = await Promise.all(
      //   images.map((image) => uploadImageToCloudinary(image))
      // );
      // console.log(uploadedImages);

      // const imageUrls = uploadedImages.map((response) => response.secure_url);
      // console.log(imageUrls)
    } else {
      setShowLoader(false);
      setShowSuccessMessage(false);
      setError("Please fill at least one input field.");
    }
  };
  const isAnyFieldFilled = () => {
    for (let key in tourData) {
      // Check if the value is a string before calling trim()
      if (typeof tourData[key] === 'string' && tourData[key].trim() !== "") {
        return true;
      }
    }
    return false;
  };

  
  const uploadImageToCloudinary = async () => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`file${index + 1}`, image);
        console.log(image)
      });
      formData.append('upload_preset', 'ljqbwqy9');

      const response = await fetch(`https://api.cloudinary.com/v1_1/dmyzudtut/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }
  
      const data = await response.json();
      console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
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
          <div className="form-input">
            <input
              type="text"
              required
              value={tourData.cost}
              onChange={(e) => handleTourDataChange("cost", e.target.value)}
            />
            <label className="lh-1 text-16 ">Price</label>
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
