import { Link } from "react-router-dom";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/headers'
import Loader from "../loader/loader";
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    accountType:"user"
  });


  const [showLoader, setshowLoader] = useState(false);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setshowLoader(true)
      const response = await fetch(`${BASE_URL}/user/login`, {
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
        localStorage.setItem('userName', user.firstName);
        localStorage.setItem('userId',_id);
        toast.success('Login successful');
        navigate("/");
        setshowLoader(false)
      } else {
        setshowLoader(false)
        const errorData = await response.json();
      
        setError(errorData.error || "Something went wrong");
      }
    } catch (error) {
      // setError(response.error || "Something went wrong");
    }
  };

  return (
    <form className="row y-gap-20" >
    
   
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link to="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      
    {error && (
        <div className="col-12">
          <p className="text-red-1">{error}</p>
        </div>
      )}
      
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

    

      <div className="col-12">
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
        </a>
      </div>
      {
      showLoader ?  <Loader/> : null
    }
{showLoader ?null : <div className="col-12">
        <button
          type="submit"
          onClick={handleSubmit}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign In <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>  }
      
     
    </form>
  );
};

export default LoginForm;
