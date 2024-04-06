import AddBanner from "@/components/add-banner/AddBanner";
import PopularDestinations from "@/components/destinations/PopularDestinations";
import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/header-1";
import Hero1 from "@/components/hero/hero-1";
import BlockGuide from "@/components/block/BlockGuide";
import Blog from "@/components/blog/Blog3";
import CallToActions from "@/components/common/CallToActions";
import Destinations from "@/components/home/home-1/Destinations";
import Testimonial from "@/components/home/home-1/Testimonial";
import TestimonialLeftCol from "@/components/home/home-1/TestimonialLeftCol";
import Hotels from "@/components/hotels/Hotels";
import SelectFilter from "@/components/hotels/filter-tabs/SelectFilter";

import React, { useEffect, useState } from 'react';

import MetaComponent from "@/components/common/MetaComponent";
import Tours from "@/components/tours/Tours";
import { BASE_URL } from "@/utils/headers";


const metadata = {
  title: "Home-1 || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const Home_1 = () => {


  const [selectedTab, setSelectedTab] = useState('Hotel');



  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);

  };
  
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <Header1 />
      {/* End Header 1 */}

      {/* <Hero1 onTabChange={handleTabChange} /> */}
      {/* End Hero 1 */}

      {/* <section className="layout-pt-lg layout-pb-md" data-aos="fade-up">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">


                <h2 className="sectionTitle__title">Popular Destinations</h2>s


                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          

            <div className="col-auto md:d-none">
              <a
                href="#"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                View All Destinations
                <div className="icon-arrow-top-right ml-15" />
              </a>
            </div>
           
          </div>
         

          <div className="relative pt-40 sm:pt-20">
            <PopularDestinations />
          </div>
        </div>
       
      </section>
    */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            {/* <AddBanner /> */}
          </div>
        </div>
       
      </section>
     

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-10 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">All Tours</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                 All Tours
                </p>
              </div>
            </div>
            <div className="col-sm-auto">
              <SelectFilter />
            </div>
          </div>


          <div className="relative overflow-hidden pt-40 sm:pt-20 js-section-slider item_gap-x30">
          {selectedTab == "Hotel" ? <Hotels /> : null}
            {selectedTab == "Tour" ?  <Tours/> : null}
           
          </div>
         
        </div>
      </section>
    

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between">
            <BlockGuide />
          </div>
        </div>
      </section>
     

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <TestimonialLeftCol />
            </div>
           

            <div className="col-lg-6">
              <div
                className="overflow-hidden js-testimonials-slider-3"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <Testimonial />
              </div>
            </div>
          </div>
         
        </div>
       
      </section>
     
{/* 
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Get inspiration for your next trip
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames
                </p>
              </div>
            </div>
          </div>
          
        </div>
       
      </section> */}
      

      {/* <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Destinations we love</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
          </div>


          <div className="tabs -pills pt-40 js-tabs">
            <Destinations />
          </div>

        </div>
      </section> */}
     

      <CallToActions />
    

      <DefaultFooter />
     
    </>
  );
};

export default Home_1;
