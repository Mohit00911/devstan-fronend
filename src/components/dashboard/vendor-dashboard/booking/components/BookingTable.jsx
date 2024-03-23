import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "../components/ActionsButton";
import { BASE_URL } from "@/utils/headers";

const BookingTable = () => {
  const [activeTab, setActiveTab] = useState(0);

const [tours,setTours]=useState("")
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
        console.log(localStorage)
        const vendorId=localStorage.getItem("vendorID")
      
      
        const bookingResponse = await fetch(`${BASE_URL}/api/getBookedTours/${vendorId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         
        })

        if (bookingResponse.ok) {
          const data = await bookingResponse.json();
    
          setTours(data.bookedTours);
          
          
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
console.log(tours)
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
                {
                 tours &&  tours.map((item)=>{
                    return(

                      <tr>
                    <td>Tour</td>
                    <td>{item.tourName}</td>
                    <td>{item.createdAt}</td>
                    
                  
                    <td className="fw-500">Rs.{item.totalPrice}</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                       {item.status}
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>

                    )

                  

                    
                    
                      
                    
                  })
                }
                 
                 
                 
                  
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
