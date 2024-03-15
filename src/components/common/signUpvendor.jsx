
// import React, { useState } from "react";
// import { BASE_URL } from "@/utils/headers";
// import { Link } from "react-router-dom";
// const SignUpForm = () => {

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone:"",
//     accountType: "vendor",
//   });
//   console.log(formData)

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${BASE_URL}/expert/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };


//   return (
//     <form className="row y-gap-20" onSubmit={handleSubmit}>
// <div className="col-12">
//         <h1 className="text-22 fw-500">Create an account</h1>
//         <p className="mt-10">
//           Already have an account?{" "}
//           <Link to="/expert-login" className="text-blue-1">
//             Log in
//           </Link>
//         </p>
//       </div>
//       <div className="col-12">
//         <div className="form-input ">
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <label className="lh-1 text-14 text-light-1">First Name</label>
//         </div>
//       </div>

//       <div className="col-12">
//         <div className="form-input ">
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <label className="lh-1 text-14 text-light-1">Last Name</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <label className="lh-1 text-14 text-light-1">Email</label>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="form-input ">
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <label className="lh-1 text-14 text-light-1">Phone</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <label className="lh-1 text-14 text-light-1">Password</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//           <label className="lh-1 text-14 text-light-1">Confirm Password</label>
//         </div>
//       </div>

//       {/* End .col */}

//       <div className="col-12">
//         <div className="d-flex ">
//           <div className="form-checkbox mt-5">
//             <input
//               type="checkbox"
//               name="subscribe"
//               checked={formData.subscribe}
//               onChange={handleChange}
//             />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//           </div>
//           <div className="text-15 lh-15 text-light-1 ml-10">
//             Email me exclusive Agoda promotions. I can opt out later as stated
//             in the Privacy Policy.
//           </div>
//         </div>
//       </div>

//       {/* End .col */}

//       <div className="col-12">
//         <button
//           type="submit"
//           className="button py-20 -dark-1 bg-blue-1 text-white w-100"

//         >
//           Sign Up <div className="icon-arrow-top-right ml-15" />
//         </button>
//       </div>
//       {/* End .col */}
//     </form>
//   );
// };

// export default SignUpForm;



import React, { useState } from "react";
import { BASE_URL } from "../../utils/headers";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

// API call function defined outside of the component
const expertSignUpApiCall = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/expert/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || "Something went wrong" };
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    return { success: false, error: "Something went wrong" };
  }
};

const ExpertSignUpForm = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    phone: "",
    accountType: "vendor",
  });
  const [showLoader, setShowLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone No. is required";
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      errors.phone = "Phone No. must contain only numbers";
    } else if (formData.phone.length !== 10) {
      errors.phone = "Phone No. must be exactly 10 digits";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (!/(?=.*[a-z])/.test(formData.password.trim())) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password.trim())) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password.trim())) {
      errors.password = "Password must contain at least one number";
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password.trim())) {
      errors.password = "Password must contain at least one special character";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      setShowLoader(true);
      const result = await expertSignUpApiCall(formData);

      if (result.success) {
        // Redirect to expert login form upon successful signup
        navigate("/expert-login");
      } else {
        setErrors({ general: result.error });
      }
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
        <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">

        <h1 className="text-22 fw-500">Create an account</h1>
        <p className="mt-10">
          Already have an account?{" "}
          <Link to="/expert-login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>

      <div className="col-12">
        <div className="form-input ">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">First Name</label>

          {errors.firstName && (
            <p className="text-red-1">{errors.firstName}</p>
          )}

        </div>
      </div>

      <div className="col-12">
        <div className="form-input ">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Last Name</label>

          {errors.lastName && <p className="text-red-1">{errors.lastName}</p>}
        </div>
      </div>

 

      <div className="col-12">
        <div className="form-input ">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>

        {errors.email && <p className="text-red-1">{errors.email}</p>}
      </div>



      <div className="col-12">
        <div className="form-input ">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Phone</label>
        </div>

        {errors.phone && <p className="text-red-1">{errors.phone}</p>}
      </div>



      <div className="col-12">
        <div className="form-input ">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>

        {errors.password && (
          <p className="text-red-1">{errors.password}</p>
        )}

      </div>


    

      <div className="col-12">
        <div className="form-input ">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-1">{errors.confirmPassword}</p>
        )}
      </div>


      <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            Email me exclusive Agoda promotions. I can opt out later as stated
            in the Privacy Policy.
          </div>
        </div>
      </div>


      <div className="col-12">
        {showLoader ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          >
            Sign Up <div className="icon-arrow-top-right ml-15" />
          </button>
        )}
      </div>

      {errors.general && (
        <div className="col-12">
          <p className="text-red-1">{errors.general}</p>
        </div>
      )}

    </form>
    
    </>

  );
};


export default ExpertSignUpForm;

