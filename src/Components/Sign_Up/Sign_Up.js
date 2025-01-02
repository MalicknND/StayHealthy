import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  // State variables using useState hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState(""); // State to show error messages
  const [errors, setErrors] = useState({}); // Errors object to store validation errors
  const navigate = useNavigate(); // Navigation hook from react-router

  // Validate phone number (must be 10 digits)
  const validatePhone = (phone) => {
    return phone.length === 10 && /^[0-9]{10}$/.test(phone); // Exactly 10 digits
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email); // Standard email regex
  };

  // Validate name (at least 4 characters)
  const validateName = (name) => {
    return name.length >= 4; // Minimum 4 characters for name
  };

  // Validate password (at least 8 characters)
  const validatePassword = (password) => {
    return password.length >= 8; // Minimum 8 characters for password
  };

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear previous errors
    setErrors({});

    let validationErrors = {};

    // Validate form fields
    if (!validateName(name)) {
      validationErrors.name = "Username should be at least 4 characters.";
    }

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email.";
    }

    if (!validatePhone(phone)) {
      validationErrors.phone = "Phone number should be exactly 10 digits.";
    }

    if (!validatePassword(password)) {
      validationErrors.password = "Password should be at least 8 characters.";
    }

    // If there are validation errors, update state and stop the submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // API Call to register user if validation passes
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });
    const json = await response.json(); // Parse the response JSON

    if (json.authtoken) {
      // Store user data in session storage
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      // Redirect user to home page
      navigate("/");
      window.location.reload(); // Refresh the page
    } else {
      if (json.errors) {
        // Show errors from the API response
        setShowerr(json.errors.map((error) => error.msg).join(", "));
      } else {
        setShowerr(json.error);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member?
          <span>
            <a href="/login" style={{ color: "#2190ff" }}>
              Login
            </a>
          </span>
        </div>
        <br />
        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <div className="err" style={{ color: "red" }}>
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
              {errors.email && (
                <div className="err" style={{ color: "red" }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="err" style={{ color: "red" }}>
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <div className="err" style={{ color: "red" }}>
                  {errors.phone}
                </div>
              )}
            </div>

            {showerr && (
              <div className="err" style={{ color: "red" }}>
                {showerr}
              </div>
            )}

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
