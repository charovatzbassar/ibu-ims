import { useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/store";
import { loginUser } from "@/store/slices/auth";
import { AppDispatch } from "@/store";
import { CircularProgress } from "@mui/material";

const ProtectedRoute: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(loginUser());
      setLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && !user.token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
