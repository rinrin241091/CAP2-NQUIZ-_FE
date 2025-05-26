import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("🛡 RequireAuth running, token:", accessToken);
  if (!accessToken) {
    console.log("🔁 Redirecting to /login");
    return <Navigate to="/login" />;
  }
  return children;
};


export const RequireAdmin = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/Home" />;
  }

  return children;
};

export const RequireUser = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (userRole === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
