import { useEffect } from "react";
import type { FormProps } from "antd";
import { App, Button, Checkbox, Form, Input, message } from "antd";
import { clearError, loginUser } from "@/stores/slices/auth-slice";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { LoginFieldType } from "@/types/index";
import Beams from "@/ui/beams";

const Login = () => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const onFinish: FormProps<LoginFieldType>["onFinish"] = (values) => {
    dispatch(loginUser(values));
  };

  const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    if (!errorInfo) {
      dispatch(clearError());
    }
  };

  useEffect(() => {
    if (error) {
      message.error("email or password is incorrect, try again");
    }
  }, [error, message]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard?page_size=10&page=1&sort_by=id&asc=false");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center  h-svh relative overflow-hidden">
      <div
        style={{
          backgroundImage: `url("/grid.svg")`,
        }}
        className="absolute inset-0 opacity-20"
      />
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950/0 to-[#fff]" />
      <div
        style={{
          backgroundImage: `url("/man.jpg")`,
        }}
        className="absolute inset-0 opacity-10"
      />

      <Beams />

      <div className="p-10 rounded-md bg-white border-blue-950/60 z-50 shadow-md border-2 relative min-w-[310px] md:min-w-[400px]">
        <div className="inset-2 border border-dashed absolute border-gray-600/50 rounded-md" />
        <div className="ribbon bg-cyan-700 text-white">Home24 BXP</div>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<LoginFieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginFieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<LoginFieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
