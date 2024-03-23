

import React, { useState } from "react";
import { BASE_URL } from "../../utils/headers";
import Loader from "../loader/loader";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const ContactForm = () => {
  const contactApiCall = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/contactus`, {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [showLoader, setShowLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted successfully

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setShowLoader(true);
      const result = await contactApiCall(formData);

      if (result.success) {
        setSuccessMessage("Form submitted successfully");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setSubmitted(true); // Update submitted state
      } else {
        setErrors({ general: result.error });
      }
    } finally {
      setShowLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      {!submitted ? ( // Render form if not submitted
        <form className="row y-gap-20 pt-20" onSubmit={handleSubmit}>
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className="lh-1 text-16 text-light-1">
                Full Name
              </label>
              {errors.name && <p className="text-red">{errors.name}</p>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-input">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="lh-1 text-16 text-light-1">
                Email
              </label>
              {errors.email && <p className="text-red">{errors.email}</p>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <label htmlFor="subject" className="lh-1 text-16 text-light-1">
                Subject
              </label>
              {errors.subject && <p className="text-red">{errors.subject}</p>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-input">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
              ></textarea>
              <label htmlFor="message" className="lh-1 text-16 text-light-1">
                Your Message
              </label>
              {errors.message && <p className="text-red">{errors.message}</p>}
            </div>
          </div>
          <div className="col-auto">
            {showLoader ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="button px-24 h-50 -dark-1 bg-blue-1 text-white"
              >
                Send Message <div className="icon-arrow-top-right ml-15"></div>
              </button>
            )}
          </div>
          {errors.general && (
            <div className="col-12">
              <p className="text-red">{errors.general}</p>
            </div>
          )}
        </form>
      ) : (
        <div className="row y-gap-20 pt-20">
          {/* Display success message */}
          <div className="col-12 border border-success p-4 text-center">
          <IoCheckmarkDoneCircleOutline style={{color: "green", fontSize:"10rem"}}/>
            <h2 className="text-green">{successMessage}</h2>
            <p>We will get back to you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
