// import React from "react";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../../store";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isloggedIn);
//   const history = useNavigate();

//   const handleLogout = () => {
//     dispatch(authActions.logout());
//     localStorage.removeItem("token");
//     history("/");
//   };
//   return (
//     <div position="fixed" className="bg-red-400 ">
//       <Typography className="flex items-center justify-between h-12 px-16">
//         <Typography variant="h6" className="text-white">
//           FOODIE
//         </Typography>
//         {!isLoggedIn && (
//           <Link to="/signup">
//             <button className="flex justify-center w-20 py-1.5 px-1 text-base font-medium text-white rounded-md cursor-pointer hover:text-white hover:bg-slate-300 hover:bg-opacity-40">
//               Sign Up
//             </button>
//           </Link>
//         )}

//         {isLoggedIn && (
//           <button
//             className="flex justify-center w-16 py-1.5 text-base font-medium text-white rounded-md cursor-pointer hover:text-white hover:bg-slate-300 hover:bg-opacity-50"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         )}
//       </Typography>
//     </div>
//   );
// };

// export default Navbar;


import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store"; // Ensure the path is correct
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isloggedIn); // Accessing logged-in state
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    navigate("/"); // Navigate to home after logout
  };

  return (
    <div position="fixed" className="bg-red-400">
      <Typography className="flex items-center justify-between h-12 px-16">
        <Typography variant="h6" className="text-white">
          FOODIE
        </Typography>
        
        {!isLoggedIn ? ( // Conditional rendering based on login state
          <>
            <Link to="/signup">
              <button className="flex justify-center w-20 py-1.5 px-1 text-base font-medium text-white rounded-md cursor-pointer hover:text-white hover:bg-slate-300 hover:bg-opacity-40">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button
            className="flex justify-center w-16 py-1.5 text-base font-medium text-white rounded-md cursor-pointer hover:text-white hover:bg-slate-300 hover:bg-opacity-50"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </Typography>
    </div>
  );
};

export default Navbar;
