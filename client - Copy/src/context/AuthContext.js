import { createContext, useReducer, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
// Create context
export const AuthContext = createContext();

// Reducer function to manage auth state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

// Context Provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null ,loading: true});

  // Load user from localStorage if token exists
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetch("/api/user/profile/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((userData) => {
        console.log("UserData from /me:", userData); // 👈
  console.log("Token from localStorage:", token);
        dispatch({ type: "LOGIN", payload: { ...userData,token, } });
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
      })
      .finally(() => {
        dispatch({ type: "STOP_LOADING" });
      });
  } else {
    dispatch({ type: "STOP_LOADING" });
  }
}, []);

  // Helper logout function (can be used in Navbar)
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};