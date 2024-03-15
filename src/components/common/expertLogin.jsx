import { Link } from "react-router-dom";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/headers'

import 'react-toastify/dist/ReactToastify.css';
import Loader from "../loader/loader";

const ExpertLoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    accountType:"vendor"
  });

  const [showLoader, setshowLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmitExpert = async (e) => {
    e.preventDefault();
    try {
      setshowLoader(true)
      const response = await fetch(`${BASE_URL}/expert/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });


      if (response.ok) {
        const data = await response.json();
        const { token, user,accountType,_id } = data;
        localStorage.setItem('accountType', accountType);
        localStorage.setItem('token', token);
        localStorage.setItem('vendorID', _id);
        localStorage.setItem('userName', user.firstName);
      
        toast.success('Login successfull');
      
        navigate("/vendor-dashboard/dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link to="/expert-signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
        <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
        <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
        </a>
      </div>
      {/* End .col */}

      <div className="col-12">
  {showLoader ? (
    <Loader />
  ) : (
    <button
      type="submit"
      className="button py-20 -dark-1 bg-blue-1 text-white w-100"
      onClick={handleSubmitExpert}
    >
      Sign Up <div className="icon-arrow-top-right ml-15" />
    </button>
  )}
</div>
      {/* End .col */}
    </form>
  );
};

export default ExpertLoginForm;
