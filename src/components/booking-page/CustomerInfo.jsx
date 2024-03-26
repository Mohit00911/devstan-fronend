import { Link } from "react-router-dom";
import BookingDetails from "./sidebar/BookingDetails";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/headers";

const CustomerInfo = ({ tourData }) => {
  const token = localStorage.getItem("userId");
  const [userData, setUserData] = useState({
    token: token,
    firstName: "",
    email: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    postalCode: "",
    specialRequests: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userId");

        const response = await fetch(`${BASE_URL}/api/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);

      if (response.ok) {
        console.log("User details updated successfully");
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const keyResponse = await fetch(`${BASE_URL}/api/getkey`);
      const keyData = await keyResponse.json();
      const key = keyData;

      const response = await fetch(`${BASE_URL}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: tourData && tourData.cost }),
      });
      const responseData = await response.json();

      const options = {
        key,
        amount: tourData.cost,
        currency: "INR",
        name: "Mohit",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: responseData.orderId,
        handler: async function (responseData) {
          const body = { ...responseData };

          const response = await fetch(`${BASE_URL}/api/paymentVerification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (response.ok) {
            const data = await response.json();
            const generateOrderId = () => {
              const timestamp = Date.now().toString();
              const randomNumber = Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0");
              return timestamp + randomNumber;
            };

            const orderId = generateOrderId();

            const bookingResponse = await fetch(`${BASE_URL}/api/userBooking`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: orderId,
                userId: userData._id,
                userDetails: {
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  email: userData.email,
                  phone: userData.phone,
                  addressLine1: userData.addressLine1,
                  addressLine2: userData.addressLine2,
                  state: userData.state,
                  postalCode: userData.postalCode,
                  specialRequirement: userData.specialRequests
                },
                totalPrice: tourData.cost,
                paymentId: data.paymentId,
                bookedTour: tourData.uuid,
                vendorId: tourData.vendor,
                status: "pending",
                tourName: tourData.name
              }),
            });

            console.log(await bookingResponse.json());
            
            window.location.href = `https://devsthan-fronend.vercel.app/invoice-page/${data.paymentId}`;
           
          } else {
            throw new Error("Failed to fetch user data");
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();

      if (response.ok) {
        console.log("User details updated successfully");

      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <>
      <div className="col-xl-7 col-lg-8 mt-30">
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
          Sign in to book with your saved details or{" "}
          <Link to="/signup" className="text-blue-1 fw-500">
            register
          </Link>{" "}
          to manage your bookings on the go!
        </div>
        {/* End register notify */}

        <h2 className="text-22 fw-500 mt-40 md:mt-24">
          Let us know who you are
        </h2>

        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">First Name</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Last Name</label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Email</label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Phone Number</label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="addressLine1"
                value={userData.addressLine1}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">
                Address line 1
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="addressLine2"
                value={userData.addressLine2}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">
                Address line 2
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                name="state"
                value={userData.state}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">
                State/Province/Region
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                name="postalCode"
                value={userData.postalCode}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">
                ZIP code/Postal code
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <textarea
                name="specialRequests"
                value={userData.specialRequests}
                onChange={handleInputChange}
                required
                rows={6}
                defaultValue={""}
              />
              <label className="lh-1 text-16 text-light-1">
                Special Requests
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="row y-gap-20 items-center justify-between">
              <div className="col-auto">
                <div className="text-14 text-light-1">
                  By proceeding with this booking, I agree to GoTrip Terms of
                  Use and Privacy Policy.
                </div>
              </div>
              {/* End col-12 */}
            </div>
          </div>
          {/* End col-12 */}
        </div>
        <button
          className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
          onClick={() => {
            handleSubmit();
            handleUpdateUser();
          }}
        >
          Book Now <div className="icon-arrow-top-right ml-15" />
        </button>

        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}

      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          <BookingDetails tourData={tourData} />
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default CustomerInfo;
