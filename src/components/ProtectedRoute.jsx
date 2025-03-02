import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { authAtom } from "@/store/userAtom";
import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useAtomValue(authAtom);
  // user?.user.role === "normal"
  return user?.isAuthenticated &&
    user?.token &&
    user?.user?.role === "admin" ? (
    <Outlet />
  ) : (
    <UnauthorizedPage />
  );
};

export default ProtectedRoute;
