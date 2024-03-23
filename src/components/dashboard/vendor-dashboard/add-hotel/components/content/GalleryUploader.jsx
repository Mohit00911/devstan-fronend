import { useState } from "react";

const GalleryUploader = ({ onSaveImages }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const fileList = event.target.files;
    const newImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === fileList.length) {
          setImages([...images, ...newImages]);
          setError("");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSaveImages = () => {
    onSaveImages(images);
  };

  return (
    <div className="row x-gap-20 y-gap-20 pt-15">
      <div className="col-auto">
        <div className="w-200">
          <label htmlFor="uploadGallery" className="d-flex ratio ratio-1:1">
            <div className="flex-center flex-column text-center bg-blue-2 h-full w-1/1 absolute rounded-4 border-type-1">
              <div className="icon-upload-file text-40 text-blue-1 mb-10" />
              <div className="text-blue-1 fw-500">Upload Images</div>
            </div>
          </label>
          <input
            type="file"
            id="uploadGallery"
            multiple
            accept="image/*"
            className="d-none"
            onChange={handleFileUpload}
          />
          <div className="text-start mt-10 text-14 text-light-1">
            Any image format is allowed.
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

      <div className="col-12 mt-10">
        <button
          type="button"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          onClick={handleSaveImages}
        >
          Save Images
        </button>
      </div>
    </div>
  );
};

export default GalleryUploader;
