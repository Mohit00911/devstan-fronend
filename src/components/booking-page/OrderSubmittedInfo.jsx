import { BASE_URL } from "@/utils/headers";
import { useEffect, useState } from "react";

const OrderSubmittedInfo = () => {
  const [userData,setUserData]=useState("")
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userId");

        const response = await fetch(`${BASE_URL}/api/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUserData(data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  console.log(userData)
  return (
    <>
      <div className="col-xl-8 col-lg-8">
        <div className="order-completed-wrapper">
          <div className="d-flex flex-column items-center mt-40 lg:md-40 sm:mt-24">
            <div className="size-80 flex-center rounded-full bg-dark-3">
              <i className="icon-check text-30 text-white" />
            </div>
            <div className="text-30 lh-1 fw-600 mt-20">
              System, your order was submitted successfully!
            </div>
            <div className="text-15 text-light-1 mt-10">
           
              {`Booking details has been sent to:${userData.email}`}
            </div>
          </div>
          {/* End header */}

          <div className="border-type-1 rounded-8 px-50 py-35 mt-40">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Order Number</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  13119
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Date</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  27/07/2021
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Total</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  $40.10
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Payment Method</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  Direct Bank Transfer
                </div>
              </div>
              {/* End .col */}
            </div>
          </div>
          {/* order price info */}

          <div className="border-light rounded-8 px-50 py-40 mt-40">
            <h4 className="text-20 fw-500 mb-30">Your Information</h4>
            <div className="row y-gap-10">
              <div className="col-12">
                <div className="d-flex justify-between ">
                  <div className="text-15 lh-16">First name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">{userData.firstName}</div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Last name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">{userData.lastName}</div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Email</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.email}
                  </div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Phone</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.phone}
                  </div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 1</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.addressLine1}
                  </div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 2</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.addressLine2}
                  </div>
                </div>
              </div>
              {/* End .col */}
              {/* <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">City</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.city}
                  </div>
                </div>
              </div> */}
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">State/Province/Region</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.state}
                  </div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">ZIP code/Postal code</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {userData.postalCode}
                  </div>
                </div>
              </div>
              {/* End .col */}
              {/* <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Country</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                    United States
                  </div>
                </div>
              </div> */}
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Special Requirements</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End order information */}
        </div>
      </div>
    </>
  );
};

export default OrderSubmittedInfo;
