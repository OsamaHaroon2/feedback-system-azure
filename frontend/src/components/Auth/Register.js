// import React, { useState } from "react";
// import { apiClient } from "../../services/api";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "student",
//     registration_code: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // Initialize navigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await apiClient.post("/register", formData);
//       setMessage({ type: "success", text: response.data });

//       // Redirect to the appropriate dashboard based on role
//       setTimeout(() => {
//         if (formData.role === "student") {
//           navigate("/student-dashboard"); // Redirect to Student Dashboard
//         } else if (formData.role === "admin") {
//           navigate("/admin-dashboard"); // Redirect to Admin Dashboard
//         }
//       }, 1500);
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data || "An error occurred. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           required
//         />
//         <select
//           value={formData.role}
//           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//         >
//           <option value="student">Student</option>
//           <option value="admin">Admin</option>
//         </select>
//         {formData.role === "admin" && (
//           <input
//             type="text"
//             placeholder="Registration Code"
//             value={formData.registration_code}
//             onChange={(e) =>
//               setFormData({ ...formData, registration_code: e.target.value })
//             }
//             required
//           />
//         )}
//         <button type="submit">Register</button>
//       </form>
//       {message && (
//         <p className={message.type === "success" ? "success" : "error"}>
//           {message.text}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { apiClient } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
    registration_code: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/register", formData);
      setMessage({ type: "success", text: response.data });

      setTimeout(() => {
        if (formData.role === "student") {
          navigate("/student-dashboard");
        } else if (formData.role === "admin") {
          navigate("/admin-dashboard");
        }
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6]">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Registration Code (Only for Admin) */}
          {formData.role === "admin" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Registration Code
              </label>
              <input
                type="text"
                placeholder="Enter your registration code"
                value={formData.registration_code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_code: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
          <button
            type="submit"
            className="w-fit bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-white hover:border-teal-500 border-2 hover:text-teal-500 transition duration-300"
          >
            Register
          </button>
          </div>
          <div className="flex justify-center">
            Already have an account? 
             <Link className="mx-1 text-teal-500 hover:text-teal-700" to= "/login"> Login</Link>
          </div>
         
        </form>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-6 text-center font-medium text-sm ${
              message.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
