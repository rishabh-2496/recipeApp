import React, { useEffect } from "react";
import { logout } from "../utils/genericUtils";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);
  return null;
};

export default Logout;
