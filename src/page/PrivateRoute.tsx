import * as React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children?: any;
}
export default function PrivateRoute({ children }: Props) {
  const isLoggedIn = Boolean(localStorage.getItem("isLogin"));
  return isLoggedIn ? children : <Navigate to="/login" />;
}
