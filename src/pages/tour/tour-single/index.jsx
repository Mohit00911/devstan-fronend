import "photoswipe/dist/photoswipe.css";
import toursData from "@/data/tours";
import Header11 from "@/components/header/header-11";
import TopBreadCrumb from "@/components/tour-single/TopBreadCrumb";
import ReviewProgress2 from "@/components/tour-single/guest-reviews/ReviewProgress2";
import DetailsReview2 from "@/components/tour-single/guest-reviews/DetailsReview2";
import ReplyForm from "@/components/tour-single/ReplyForm";
import ReplyFormReview2 from "@/components/tour-single/ReplyFormReview2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import Tours from "@/components/tours/Tours";
import Faq from "@/components/faq/Faq";
import { Link, useParams } from "react-router-dom";
import Itinerary from "@/components/tour-single/itinerary";
import ImportantInfo from "@/components/tour-single/ImportantInfo";
import TourGallery from "@/components/tour-single/TourGallery";

import SidebarRight from "@/components/tour-single/SidebarRight";
import Overview from "@/components/tour-single/Overview";
import TourSnapShot from "@/components/tour-single/TourSnapShot";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ModalVideo from "react-modal-video";
import FilterBox from "../../../components/tour-single/filter-box";
import MetaComponent from "@/components/common/MetaComponent";
import { BASE_URL } from "@/utils/headers";
import { useEffect, useState } from "react";

const metadata = {
  title: "Tour Single || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const TourSingleV1Dynamic = () => {
  const [isOpen, setOpen] = useState(false);
  const [tour, setTour] = useState("");
  const { id } = useParams();
  const searchTours = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getTour/${id}`);
      const data = await response.json();
      setTour(data[0]);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
    }
  };
  useEffect(() => {
    searchTours();
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />

      <div className="header-margin"></div>

      <Header11 />

      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <h1 className="text-30 fw-600">{tour?.name}</h1>

              <div className="row x-gap-20 y-gap-20 items-center pt-10">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="d-flex x-gap-5 items-center">
                      <i className="icon-star text-10 text-yellow-1"></i>

                      <i className="icon-star text-10 text-yellow-1"></i>

                      <i className="icon-star text-10 text-yellow-1"></i>

                      <i className="icon-star text-10 text-yellow-1"></i>

                      <i className="icon-star text-10 text-yellow-1"></i>
                    </div>

                    <div className="text-14 text-light-1 ml-10">
                      {tour?.numberOfReviews} reviews
                    </div>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="row x-gap-10 items-center">
                    <div className="col-auto">
                      <div className="d-flex x-gap-5 items-center">
                        <i className="icon-placeholder text-16 text-light-1"></i>
                        <div className="text-15 text-light-1">
                          {tour?.location}
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <button
                        data-x-click="mapFilter"
                        className="text-blue-1 text-15 underline"
                      >
                        Show on map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="row x-gap-10 y-gap-10">
                <div className="col-auto">
                  <button className="button px-15 py-10 -blue-1">
                    <i className="icon-share mr-10"></i>
                    Share
                  </button>
                </div>

                <div className="col-auto">
                  <button className="button px-15 py-10 -blue-1 bg-light-2">
                    <i className="icon-heart mr-10"></i>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
      />

      <section className="pt-40 js-pin-container">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="relative d-flex justify-center overflow-hidden js-section-slider">
                <Swiper
                  modules={[Navigation]}
                  loop={true}
                  navigation={{
                    nextEl: ".js-img-next",
                    prevEl: ".js-img-prev",
                  }}
                >
                  {tour?.slideImg?.map((slide, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={slide}
                        alt="image"
                        style={{ height: "501px" }}
                        className="rounded-4 col-12 cover object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Gallery>
                  {tour?.slideImg?.map((slide, i) => (
                    <div
                      className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end z-2 bottom-0 end-0"
                      key={i}
                    >
                      <Item
                        original={slide}
                        thumbnail={slide}
                        width={451}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <div
                            className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                            ref={ref}
                            onClick={open}
                            role="button"
                          >
                            See All Photos
                          </div>
                        )}
                      </Item>
                    </div>
                  ))}
                </Gallery>

                <div className="absolute h-full col-11">
                  <button className="section-slider-nav -prev flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-img-prev">
                    <i className="icon icon-chevron-left text-12" />
                  </button>
                  <button className="section-slider-nav -next flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-img-next">
                    <i className="icon icon-chevron-right text-12" />
                  </button>
                </div>
              </div>
              <h3 className="text-22 fw-500 mt-40">Tour snapshot</h3>
              <TourSnapShot tour={tour} />
              <div className="border-top-light mt-40 mb-40"></div>
              <Overview tour={tour && tour} />
            </div>
            <div className="col-xl-4">
              <div className="d-flex justify-end js-pin-content">
                <div className="w-360 lg:w-full d-flex flex-column items-center">
                  <div className="px-30 py-30 rounded-4 border-light bg-white shadow-4">
                    <div className="text-14 text-light-1">
                      From{" "}
                      <span className="text-20 fw-500 text-dark-1 ml-5">
                        Rs.{tour?.cost}
                      </span>
                    </div>

                    <div className="row y-gap-20 pt-30">
                      <FilterBox tour={tour} />
                    </div>

                    <div className="d-flex items-center pt-20">
                      <div className="size-40 flex-center bg-light-2 rounded-full">
                        <i className="icon-heart text-16 text-green-2" />
                      </div>
                      <div className="text-14 lh-16 ml-10">
                        94% of travelers recommend this experience
                      </div>
                    </div>
                  </div>

                  <div className="px-30">
                    <div className="text-14 text-light-1 mt-30">
                      Not sure? You can cancel this reservation up to 24 hours
                      in advance for a full refund.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row x-gap-40 y-gap-40">
              <div className="col-auto">
                <h3 className="text-22 fw-500">Important information</h3>
              </div>
            </div>

            <ImportantInfo tour={tour} />
          </div>
        </div>
      </section>

      <section className="border-top-light  mt-40 pt-40">
        <div className="container">
          <h3 className="text-22 fw-500 mb-20">Itinerary</h3>
          <Itinerary tour={tour.itineraries && tour.itineraries} />
        </div>
      </section>

      {/* <section className="mt-40">
        <div className="container ">
          <div className="pt-40 border-top-light">
            <div className="row y-gap-20">
               <div className="col-lg-4">

                <h2 className="text-22 fw-500">
                  FAQs about
                  <br /> The Crown Hotel
                </h2>

              </div> 
          


              <div className="col-lg-8">
                <div
                  className="accordion -simple row y-gap-20 js-accordion"
                  id="Faq1"
                >
                  <Faq />
                </div>
              </div>

             
            </div>
           
          </div>
         
        </div>
       
      </section> */}

      {/* <section className="mt-40 border-top-light pt-40">
>>>>>>> 889f052 (latest)
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-3">
              <h3 className="text-22 fw-500">Guest reviews</h3>
              <ReviewProgress2 />

            
            </div>
            
>>>>>>> 889f052 (latest)

            <div className="col-xl-8">
              <DetailsReview2 />
            </div>

            
          </div>
         
        </div>
       
        
      </section> */}

      {/* <section className="mt-40 border-top-light pt-40">
>>>>>>> 889f052 (latest)
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-3">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                  <p className="text-15 text-dark-1 mt-5">
                    Your email address will not be published.
                  </p>
                </div>
              </div>
             

              <ReplyFormReview2 />
              
            </div>
            
>>>>>>> 889f052 (latest)

            <div className="col-xl-8">
              <ReplyForm />
            </div>

            
          </div>
        
        </div>
      
      </section>
       */}

      <section className="layout-pt-lg layout-pb-lg mt-50 border-top-light">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Most Popular Tours</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsumðˇ
                </p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                to="#"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
            {/* End .col */}
          </div>

          <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
            <Tours />
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End Tours Sections */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default TourSingleV1Dynamic;
