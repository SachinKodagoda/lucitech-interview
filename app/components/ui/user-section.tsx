import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { logout } from "@/stores/slices/auth-slice";
import { Button, Typography } from "antd";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function UserSection() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-6 gap-2">
      {user && <Typography.Text>{user.email}</Typography.Text>}
      <Button
        icon={<IoLogOutOutline />}
        onClick={handleLogout}
        variant="outlined"
      >
        Logout
      </Button>
    </div>
  );
}
