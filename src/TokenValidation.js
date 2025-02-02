// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TokenValidation = (token) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const validateToken = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/validatetoken", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.data.valid) {
//           throw new Error(response.data.message);
//         }
//       } catch (err) {
//         localStorage.removeItem("authToken");
//         alert("Your session has expired. Please log in again.");
//         navigate("/login");
//       }
//     };

//     // Validate token every 1 minute
//     const interval = setInterval(() => {
//       validateToken();
//     }, 60000);

//     // Initial validation
//     validateToken();

//     return () => clearInterval(interval); // Cleanup interval
//   }, [token, navigate]);
// };

// export default TokenValidation;
