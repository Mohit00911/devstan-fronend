import Sidebar from "../common/Sidebar";
import Header from "../../../header/dashboard-header";

import Footer from "../common/Footer";
import BookingTable from "./components/BookingTable";

const index = () => {
  return (
    <>
      <div className="header-margin"></div>

      <Header />
      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Booking History</h1>
                <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <BookingTable />
              {/* End tabs */}
            </div>

            <Footer />
          </div>
          
        </div>
      
      </div>
      {/* End dashbaord content */}
    </>  
  );
};

export default index;
