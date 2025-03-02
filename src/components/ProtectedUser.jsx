import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { authAtom } from "@/store/userAtom";
import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom";

const ProtectedUser = () => {
  const user = useAtomValue(authAtom);
  // user?.user.role === "normal"
  return user?.isAuthenticated && user?.token && user?.user?.role === "normal" ? (
    <Outlet />
  ) : (
    <UnauthorizedPage />
  );
};

export default ProtectedUser;
