import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import TopHeaderFilter from "@/components/tour-list/tour-list-v2/TopHeaderFilter";
import TourProperties from "@/components/tour-list/tour-list-v2/TourProperties";
import Pagination from "@/components/tour-list/common/Pagination";
import Sidebar from "@/components/tour-list/tour-list-v2/Sidebar";
import { useLocation } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { BASE_URL } from "@/utils/headers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import isTextMatched from "../../../utils/isTextMatched";
import CategoryTypes from "../../../components/tour-list/sidebar/CategoryTypes";
import OthersFilter from "../../../components/tour-list/sidebar/OthersFilter";
import Duration from "../../../components/tour-list/sidebar/Duration";
import Languages from "../../../components/tour-list/sidebar/Languages";
import PirceSlider from "../../../components/tour-list/sidebar/PirceSlider";
import MainFilterSearchBox from "../../../components/tour-list/tour-list-v2/MainFilterSearchBox";
import DateSearch from "../../../components/hero/DateSearch";
import LocationSearch from "../../../components/hero/hero-1/LocationSearch";
import { useNavigate } from "react-router-dom";
const metadata = {
  title: "Tour List v2 || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};
const others = [{ name: "Free Cancellation", count: 92 }];
const categories = [
  { name: "Tours", count: 92 },
  { name: "Attractions", count: 45 },
  { name: "Day Trips", count: 21 },
  { name: "Outdoor Activities", count: 78 },
  { name: "Concerts & Shows", count: 679 },
];
const TourListPage2 = ({ onTabChange}) => {
  const [tourData, setTourData] = useState({ location: "", date: "" });
  const [tours, setTours] = useState("");
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTours = async () => {
    try {
      const locationParam = queryParams.get("location");
      const dateParam = queryParams.get("date");
      const response = await fetch(
        `${BASE_URL}/api/tours/${locationParam}/${dateParam}`
      );
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
    }
  };
  useEffect(() => {
    searchTours();
  }, [location.search]);

  const handleLocationSelect = (selectedLocation) => {
    setTourData((prevData) => ({ ...prevData, location: selectedLocation.location }));
  };
  const handledDateSelect = (selectedDates) => {
    setTourData((prevData) => ({ ...prevData, date: selectedDates }));
  };
  const handleSearch = () => {
console.log("hii")
    navigate(`/tour-list-v2?location=${tourData.location}&date=${tourData.date}`);
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header11 />
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">


                {/* Sidebar */}

                <div className="sidebar__item -no-border">
                  <div className="px-20 py-20 bg-light-2 rounded-4">
                    <h5 className="text-18 fw-500 mb-10">Search Tours</h5>
                    <div className="row y-gap-20 pt-20">
                      {/* <MainFilterSearchBox /> */}





                      <div className="col-12">
        <LocationSearch onLocationSelect={handleLocationSelect}/>
        {/* End Location */}
      </div>
      {/* End .col-12 */}


      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 bg-white rounded-4 -left js-form-dd js-calendar">
          <div className="d-flex">
            <i className="icon-calendar-2 text-20 text-light-1 mt-5"></i>
            <div className="ml-10 flex-grow-1">
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <DateSearch onDateChange={handledDateSelect} />
            </div>
          </div>
        </div>
        {/* End check-in-out */}
      </div>
      {/* End .col-12 */}

      <div className="col-12"
       
      >
        <div className="button-item h-full"
         onClick={handleSearch}
        >
          <button className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-blue-1 text-white"
         
          >
            <i className="icon-search text-20 mr-10" 
              
            />
            
            Search
          </button>
        </div>
        {/* End search button_item */}
      </div>
      {/* End .col-12 */}
                    </div>
                  </div>
                </div>
                <div className="sidebar__item -no-border">
                  <h5 className="text-18 fw-500 mb-10">Category Types</h5>
                  <div className="sidebar-checkbox">
                    {/* <CategoryTypes /> */}
                    {categories.map((category) => (
        <div
          className="row y-gap-10 items-center justify-between"
          key={category.name}
        >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{category.name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{category.count}</div>
          </div>
        </div>
      ))}
                  </div>
                </div>
                <div className="sidebar__item">
                  <h5 className="text-18 fw-500 mb-10">Other</h5>
                  <div className="sidebar-checkbox">
                    {/* <OthersFilter />
                     */}
                     {others.map((item, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{item.name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{item.count}</div>
          </div>
        </div>
      ))}
                  </div>
                </div>

                <div className="sidebar__item pb-30">
                  <h5 className="text-18 fw-500 mb-10">Price</h5>
                  <div className="row x-gap-10 y-gap-30">
                    <div className="col-12">
                      <PirceSlider />
                    </div>
                  </div>
                </div>
                <div className="sidebar__item">
                  <h5 className="text-18 fw-500 mb-10">Duration</h5>
                  <div className="sidebar-checkbox">
                    <Duration />
                  </div>
                </div>
                <div className="sidebar__item">
                  <h5 className="text-18 fw-500 mb-10">Languages</h5>
                  <div className="sidebar-checkbox">
                    <Languages />
                  </div>
                </div>

                {/* <Sidebar /> */}
              </aside>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Tours
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
              </div>
            </div>
            <div className="col-xl-9 ">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                {tours &&
                  tours.map((item) => (
                    <div
                      className="col-lg-4 col-sm-6"
                      key={item?.id}
                      data-aos="fade"
                      data-aos-delay={item?.delayAnimation}
                    >
                      <Link
                        to={`/tour-single/${item.uuid}`}
                        className="tourCard -type-1 rounded-4 position-relative"
                      >
                        <div className="tourCard__image">
                          <div className="cardImage ratio ratio-1:1">
                            <div className="cardImage__content">
                              <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                                {/* <Swiper
                      className="mySwiper"
                      modules={[Pagination, Navigation]}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                    >
                      {item?.slideImg?.map((slide, i) => (
                        <SwiperSlide key={i}>
                          <img
                            className="rounded-4 col-12 js-lazy"
                            src={slide}
                            alt="image"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper> */}
                              </div>
                            </div>
                          </div>

                          <div className="cardImage__wishlist">
                            <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                              <i className="icon-heart text-12" />
                            </button>
                          </div>

                          <div className="cardImage__leftBadge">
                            <div
                              className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                                isTextMatched(item?.tag, "likely to sell out*")
                                  ? "bg-dark-1 text-white"
                                  : ""
                              } ${
                                isTextMatched(item?.tag, "best seller")
                                  ? "bg-blue-1 text-white"
                                  : ""
                              }  ${
                                isTextMatched(item?.tag, "top rated")
                                  ? "bg-yellow-1 text-dark-1"
                                  : ""
                              }`}
                            >
                              {item.tag}
                            </div>
                          </div>
                        </div>
                        {/* End .tourCard__image */}

                        <div className="tourCard__content mt-10">
                          <div className="d-flex items-center lh-14 mb-5">
                            <div className="text-14 text-light-1">
                              {item?.duration}+ hours
                            </div>
                            <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
                            <div className="text-14 text-light-1">
                              {item?.tourType}
                            </div>
                          </div>
                          <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                            <span>{item?.name}</span>
                          </h4>
                          <p className="text-light-1 lh-14 text-14 mt-5">
                            {item?.location}
                          </p>

                          <div className="row justify-between items-center pt-15">
                            <div className="col-auto">
                              <div className="d-flex items-center">
                                <div className="d-flex items-center x-gap-5">
                                  <div className="icon-star text-yellow-1 text-10" />
                                  <div className="icon-star text-yellow-1 text-10" />
                                  <div className="icon-star text-yellow-1 text-10" />
                                  <div className="icon-star text-yellow-1 text-10" />
                                  <div className="icon-star text-yellow-1 text-10" />
                                </div>
                                {/* End ratings */}

                                <div className="text-14 text-light-1 ml-10">
                                  {item?.numberOfReviews} reviews
                                </div>
                              </div>
                            </div>
                            <div className="col-auto">
                              <div className="text-14 text-light-1">
                                From
                                <span className="text-16 fw-500 text-dark-1">
                                  {" "}
                                  US${item.cost}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                {/* <TourProperties tours={tours}/> */}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default TourListPage2;
