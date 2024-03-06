import { useState, useEffect } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "../components/ActionsButton";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { BASE_URL } from "@/utils/headers";

const BookingTable = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const secretKey = "sh121";
  const fetchTours = async () => {
    try {
      const vendorId = localStorage.getItem("vendorID");

      const payload = {
        vendorId,
      };
      const response = await fetch(`${BASE_URL}/api/vendorTours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  const handleEditClick = (tourId) => {
    navigate(`/vendor-dashboard/edit-tour/${tourId}`);
  };

  const handleEnableButtonClick = async (tourId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/updateTour/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "enabled" }),
      });

      if (response.ok) {
        fetchTours();
        console.log("API call successful");
      } else {
        console.error("API call failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteButtonClick = async (tourId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/updateTour/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "disabled" }),
      });

      if (response.ok) {
        // Handle success
        fetchTours();
        console.log("API call successful");
      } else {
        // Handle error
        console.error("API call failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const tabItems = [
    "All Tours",
    "Completed",
    "Processing",
    "Confirmed",
    "Cancelled",
    "Paid",
    "Unpaid",
    "Partial Payment",
  ];
  useEffect(() => {
    fetchTours();
  }, []);
  // Empty dependency array to run the effect only once on mount

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-4 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>
                      <div className="d-flex items-center">
                        <div className="form-checkbox ">
                          <input type="checkbox" name="name" />
                          <div className="form-checkbox__mark">
                            <div className="form-checkbox__icon icon-check" />
                          </div>
                        </div>
                      </div>
                    </th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Reviews</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {tours &&
                    tours.map((item) => (
                      <tr key={item._id}>
                        {console.log(item.status)}
                        <td>
                          <div className="d-flex items-center">
                            <div className="form-checkbox ">
                              <input type="checkbox" name="name" />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-blue-1 fw-500">{item.name}</td>
                        <td>{item.location}</td>
                        <td>{item.vendorName}</td>
                        <td>
                          {item.status === "confirmed" && (
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                              Confirmed
                            </span>
                          )}
                          {item.status === "pending" && (
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-1 text-yellow-2">
                              Pending
                            </span>
                          )}
                          {item.status === "disabled" && (
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-red-1 text-white-2">
                              Disabled
                            </span>
                          )}
                          {item.status === "enabled" && (
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-green-1 text-green-2">
                              Enabled
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="rounded-4 size-35 bg-blue-1 text-white flex-center text-12 fw-600">
                            4.8
                          </div>
                        </td>

                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="row x-gap-10 y-gap-10 items-center">
                            <div className="col-auto">
                              <button
                                className="flex-center bg-light-2 rounded-4 size-35"
                                onClick={() =>
                                  handleEnableButtonClick(item.uuid)
                                }
                              >
                                <i className="icon-eye text-16 text-light-1" />
                              </button>
                            </div>
                            <div className="col-auto">
                              <button
                                className="flex-center bg-light-2 rounded-4 size-35"
                                onClick={() => handleEditClick(item.uuid)}
                              >
                                <i className="icon-edit text-16 text-light-1" />
                              </button>
                            </div>
                            <div className="col-auto">
                              <button
                                className="flex-center bg-light-2 rounded-4 size-35"
                                onClick={() =>
                                  handleDeleteButtonClick(item.uuid)
                                }
                              >
                                <i className="icon-trash-2 text-16 text-light-1" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
                {/* End tbody */}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default BookingTable;
