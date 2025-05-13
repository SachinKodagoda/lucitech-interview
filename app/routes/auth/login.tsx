import { useEffect } from "react";
import type { FormProps } from "antd";
import { App, Button, Checkbox, Form, Input, message } from "antd";
import { clearError, loginUser } from "@/stores/slices/auth-slice";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { LoginFieldType } from "@/types/index";

const Login = () => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);
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
      navigate("/dashboard?page_size=5&page=1");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center  h-dvh">
      <div className="border p-6 pb-0 border-gray-500/50 rounded-md">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
