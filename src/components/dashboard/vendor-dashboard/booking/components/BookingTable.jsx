import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "../components/ActionsButton";
import { BASE_URL } from "@/utils/headers";

const BookingTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedActions, setSelectedActions] = useState({});
  const [tours, setTours] = useState("");
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Booking",
    "Completed",
    "Processing",
    "Confirmed",
    "Cancelled",
    "Paid",
    "Unpaid",
    "Partial Payment",
  ];
  useEffect(() => {
    const fetchUserData = async () => {
      try {
      
        const vendorId = localStorage.getItem("vendorID");

        const bookingResponse = await fetch(
          `${BASE_URL}/api/getBookedTours/${vendorId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (bookingResponse.ok) {
          const data = await bookingResponse.json();

          setTours(data.bookedTours);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [activeFilter]);


  const handleFilterClick = async (filter,orderId) => {
    
  try {
   
    const response = await fetch(`${BASE_URL}/api/updateTourStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        newStatus: filter, 
      }),
    });

    if (response.ok) {
      
      setActiveFilter(filter);
     
    } else {
      throw new Error("Failed to update tour status");
    }
  } catch (error) {
    console.error("Error updating tour status:", error);
  }
};

  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Processing", value: "processing" },
    { label: "Cancelled", value: "cancelled" },
  ];

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
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Order Date</th>

                    <th>Total</th>
                    <th>Paid</th>
                    <th>Remain</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tours &&
                    tours.map((item) => {
                      return (
                        <tr>
                          <td>Tour</td>
                          <td>{item.tourName}</td>
                          <td>{item.createdAt}</td>

                          <td className="fw-500">Rs.{item.totalPrice}</td>
                          <td>$0</td>
                          <td>$35</td>
                          <td>
                            <span className="rounded-100 py-4 px-10 text-center text-14 fw-500  text-blue-3">
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <div className="dropdown js-dropdown js-actions-1-active">
                              <div
                                className="dropdown__button d-flex items-center rounded-4 text-blue-1  text-14 px-15 py-5"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="true"
                                aria-expanded="false"
                                data-bs-offset="0,10"
                              >
                                 <span className="js-dropdown-title">
                                {selectedActions[item.orderId] === undefined
                                  ? "Actions"
                                  : selectedActions[item.orderId]}
                              </span>
                                <i className="icon icon-chevron-sm-down text-7 ml-10" />
                              </div>
                              <div className="toggle-element -dropdown-2 js-click-dropdown dropdown-menu">
                                <div className="text-14 fw-500 js-dropdown-list">
                                  {filters.map((filter) => (
                                    <div key={filter.value}>
                                      <button
                                        className={`d-block js-dropdown-link ${
                                          activeFilter === filter.value
                                            ? "text-blue-1"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleFilterClick(filter.value,item.orderId)
                                        }
                                      >
                                        {filter.label}
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* <ActionsButton /> */}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
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
