import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import StepperBooking from "@/components/booking-page/stepper-booking";
import { useParams } from 'react-router-dom';
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/headers";

const metadata = {
  title: "Hotel Booking Page || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const BookingPage = () => {
  const { tourUUID } = useParams();
  const {selectedPrice} = useParams();
  const {selectedPriceName} = useParams();
  console.log(useParams())
 const [tourData,setTourData] =useState()
 
  const searchTours = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getTour/${tourUUID}`);
      const data = await response.json();
   
    setTourData(data[0])
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
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 layout-pb-md">
        <div className="container">
          <StepperBooking tourData={tourData} selectedPriceName={selectedPriceName} selectedPrice={selectedPrice}/>
        </div>
        {/* End container */}
      </section>
      {/* End stepper */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default BookingPage;
