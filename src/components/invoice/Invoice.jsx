import { BASE_URL } from "@/utils/headers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header11 from "@/components/header/header-11";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import { Link } from 'react-router-dom';
const OrderSubmittedInfo = () => {
  const [userData,setUserData]=useState("")
  const { paymentId } = useParams();
  const[tourData,setTourData]=useState("")
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
       
      
      
        const bookingResponse = await fetch(`${BASE_URL}/api/getBookedUserDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId
          }),
        })

        if (bookingResponse.ok) {
          const data = await bookingResponse.json();
    
          setUserData(data.bookedUserDetails);
          const searchTours = async () => {
            try {
              console.log(data.bookedUserDetails.bookedTour)
              const response = await fetch(`${BASE_URL}/api/getTour/${data.bookedUserDetails.bookedTour}`);
              const fetchedTourdata = await response.json();
              setTourData(fetchedTourdata[0])
            } catch (error) {
              console.error("Error fetching tours:", error);
            } finally {
            }
          };
          searchTours()
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
    <Header11 />
    <div style={{marginBlock:"100px"}}>
    <div className="row" style={{display:"flex",justifyContent:"center",alignItems:"center",paddingInline:"20px"}}> <div className="col-xl-8 col-lg-8">
        <div className="order-completed-wrapper">
          <div className="d-flex flex-column items-center mt-40 lg:md-40 sm:mt-24">
            <div className="size-80 flex-center rounded-full bg-dark-3">
              <i className="icon-check text-30 text-white" />
            </div>
            <div className="text-30 lh-1 fw-600 mt-20">
              System, your order was submitted successfully!
            </div>
            <div className="text-15 text-light-1 mt-10">
            
              {`Booking details has been sent to:${userData && userData.userDetails.email}`}
            </div>
          </div>
          

          <div className="border-type-1 rounded-8 px-50 py-35 mt-40">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Order Number</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
               {userData && userData.orderId}
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Date</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                {userData && userData.createdAt}
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Total</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                Rs.{userData && userData.totalPrice}
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Payment Method</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  Direct Bank Transfer
                </div>
              </div>
              
            </div>
          </div>
          

          <div className="border-light rounded-8 mt-40" style={{padding:"20px"}}>
            <h4 className="text-20 fw-500 mb-30">Your Information</h4>
            <div className="row y-gap-10">
              <div className="col-12">
                <div className="d-flex justify-between ">
                  <div className="text-15 lh-16">First name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">{userData && userData.userDetails.firstName}</div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Last name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">{userData && userData.userDetails.lastName}</div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Email</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.email}
                  </div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Phone</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.phone}
                  </div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 1</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.addressLine1}
                  </div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 2</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.addressLine2}
                  </div>
                </div>
              </div>
              
             
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">State/Province/Region</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.state}
                  </div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">ZIP code/Postal code</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.postalCode}
                  </div>
                </div>
              </div>
              
              
              
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Special Requirements</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData && userData.userDetails.specialRequirement}
                  </div>
                
                </div>
              </div>


              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Vendor Name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {tourData && tourData.vendorName}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-center border-top-light pt-10" >
                  
                  <div className="px-30 py-30 border-light rounded-4" style={{maxWidth: "100%"}}>
      <div className="text-20 fw-500 mb-30">Your booked tour</div>
      <div className="row x-gap-15 y-gap-20">
        <div className="col-auto">
          <img
            src="/img/backgrounds/1.png"
            alt="image"
            className="size-140 rounded-4 object-cover"
          />
        </div>
       
        <div className="col">
          <div className="d-flex x-gap-5 pb-10">
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
          </div>
         
          <div className="lh-17 fw-500">
           {tourData && tourData.name}
          </div>
          <div className="text-14 lh-15 mt-5">{tourData && tourData.location}</div>
          <div className="row x-gap-10 y-gap-10 items-center pt-10">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="size-30 flex-center bg-blue-1 rounded-4">
                  <div className="text-12 fw-600 text-white">4.8</div>
                </div>
                <div className="text-14 fw-500 ml-10">Exceptional</div>
              </div>
            </div>
           
          </div>
        </div>
       
      </div>
     

      
     

     
    </div>
                </div>
              </div>
              
              
            </div>
         
      <Link to="/" className="button h-60 px-24 -dark-1 bg-blue-1 text-white " style={{maxWidth:"180px",marginTop:"20px"}}>
      Go to Homepage
    </Link>
          </div>
         
        </div>
      </div></div>
    </div>
    <CallToActions />
    <DefaultFooter />
    </>
  );
};

export default OrderSubmittedInfo;
