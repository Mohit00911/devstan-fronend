import Sidebar from "../common/Sidebar";
import Header from "../../../header/dashboard-header";
import Footer from "../common/Footer";
import BookingTable from "./components/BookingTable";
import FilterBox from "./components/filter-box";

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
              <div className="col-auto">
                <h1 className="text-30 lh-14 fw-600">Booking History</h1>
                <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              <div className="col-auto">
                <FilterBox />
              </div>
            </div>
            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <BookingTable />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
