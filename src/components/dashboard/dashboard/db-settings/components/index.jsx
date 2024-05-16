import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import AvatarUploader from "./AvatarUploader";
import { BASE_URL } from "@/utils/headers";

const Index = () => {
  const token = localStorage.getItem("userId");
  const [tourData, setTourData] = useState({});
  const [userData, setUserData] = useState({
    _id: token,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    profilePic: "",
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (event) => {
    const fileList = event.target.files[0];

    const formData = new FormData();

    const file = fileList;

    formData.append("file", file);

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
      setUserData((prevState) => ({
        ...prevState,
        profilePic: data.url,
      }));

      setImage(data.url);
    } catch (error) {
      console.error("Error uploading image(s) to Cloudinary:", error);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await fetch(`${BASE_URL}/api/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        });

        if (userDetails.ok) {
          const response = await userDetails.json();
          setImage(response.profilePic);
          // setTourData(response);
          setUserData(response);
        } else {
          console.error("Failed to fetch user data:", userDetails.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User details updated successfully");
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const tabs = [
    {
      label: "Personal Information",
      content: (
        <div>
          <div className="row y-gap-30 items-center">
            <div className="col-auto">
              {image ? (
                <div className="d-flex ratio ratio-1:1 w-200">
                  <img
                    src={image}
                    alt="avatar"
                    className="img-ratio rounded-4"
                  />
                  <div className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute">
                    <div
                      className="size-40 bg-white rounded-4 flex-center cursor-pointer"
                      onClick={() => setImage("")}
                    >
                      <i className="icon-trash text-16" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex ratio ratio-1:1 w-200">
                  <img
                    src="/img/misc/avatar-1.png"
                    alt="image"
                    className="img-ratio rounded-4"
                  />
                  <div className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute">
                    <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                      <i className="icon-trash text-16" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-auto">
              <h4 className="text-16 fw-500">Your avatar</h4>
              <div className="text-14 mt-5">
                PNG or JPG no bigger than 800px wide and tall.
              </div>
              <div className="d-inline-block mt-15">
                <label
                  htmlFor="avatar-upload"
                  role="button"
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                >
                  <i className="icon-upload-file text-20 mr-10" />
                  Browse
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/png, image/jpeg"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </div>
              {error && !success && (
                <div className="text-red-1 mt-1">{error}</div>
              )}
            </div>
          </div>

          <div className="border-top-light mt-30 mb-30" />

          <div className="col-xl-9">
            <div className="row x-gap-20 y-gap-20">
              <div className="form-input">
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>

              <div className="form-input">
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>

              <div className="form-input">
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">Email</label>
              </div>

              <div className="form-input">
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">Phone</label>
              </div>

              <div className="form-input">
                <textarea
                  required
                  rows={5}
                  defaultValue={""}
                  type="text"
                  name="about"
                  value={userData.about}
                  onChange={handleInputChange}
                />
                <label className="lh-1 text-16 text-light-1">
                  About Yourself
                </label>
              </div>
            </div>
          </div>

          <div className="d-inline-block pt-30">
            <button
              type="submit"
              className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
              onClick={() => handleSubmit()}
            >
              Save Changes <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </div>
      ),
    },
    {
      label: "Location Information",
      content: (
        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-12">
              <div className="form-input">
                <input
                  type="text"
                  name="addressLine1"
                  value={userData.addressLine1}
                  onChange={handleInputChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  addressLine1
                </label>
              </div>
            </div>

            <div className="form-input">
              <input
                type="text"
                name="addressLine2"
                value={userData.addressLine2}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">addressLine2</label>
            </div>

            <div className="form-input">
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">City</label>
            </div>
            {/* End col-6 */}

            <div className="form-input">
              <input
                type="text"
                name="state"
                value={userData.state}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">State</label>
            </div>

            <div className="form-input">
              <input
                type="text"
                name="country"
                value={userData.country}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Country</label>
            </div>

            <div className="form-input">
              <input
                type="text"
                name="postalCode"
                value={userData.postalCode}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Zip Code</label>
            </div>

            <div className="col-12">
              <div className="d-inline-block">
                <button
                  type="submit"
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                  onClick={() => handleSubmit()}
                >
                  Save Changes <div className="icon-arrow-top-right ml-15" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Change Password",
      content: (
        <form className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  Current Password
                </label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  New Password
                </label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  New Password Again
                </label>
              </div>
            </div>

            <div className="col-12">
              <div className="row x-gap-10 y-gap-10">
                <div className="col-auto">
                  <button
                    type="submit"
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                  >
                    Save Changes <div className="icon-arrow-top-right ml-15" />
                  </button>
                </div>
                <div className="col-auto">
                  <button className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ),
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      className="tabs -underline-2 js-tabs"
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
    >
      <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20">
        {tabs.map((tab, index) => (
          <Tab key={index} className="col-auto">
            <button className="tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button">
              {tab.label}
            </button>
          </Tab>
        ))}
      </TabList>

      <div className="tabs__content pt-30 js-tabs-content">
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            className={`-tab-item-${index + 1} ${
              tabIndex === index ? "is-tab-el-active" : ""
            }`}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default Index;
