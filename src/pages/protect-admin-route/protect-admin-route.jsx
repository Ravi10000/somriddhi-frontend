import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AdminPage from "../admin/admin.page";
import AdminLogin from "../admin-login/admin-login";

export default function ProtectAdminRoute({ children }) {
  const [admin, setAdmin] = useState(true);
  const params = useParams();
  const location = useLocation();
  console.log({ params, location });
  // useEffect(() => {
  //   localStorage.getItem("admin") &&
  //     setAdmin(JSON.parse(localStorage.getItem("admin")));
  // }, []);

  return <></>;
  // return <>{admin ? children : <AdminLogin />}</>;
}
