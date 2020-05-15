import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import Post from "../../action/post";
import axios from "axios";
import Cookie from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginProtected } from "./action";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";

function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values: Store) => {
    setLoading(true);
    await Post(
      {
        url: "/auth/admin/login",
        type: "form",
        values,
      },
      () => {
        const access_token = Cookie.get("access_token");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        dispatch(loginProtected());
      }
    );
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <div>
          <img
            src={require("../../assets/logoPrimary.png")}
            alt="Logo Primary"
            className="logo-primary"
          />
        </div>
        <Form className="login-form" layout="horizontal" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username / Email!",
              },
              ({ getFieldValue }) => ({
                validator(value) {
                  if (!value || getFieldValue("username").length >= 8) {
                    return Promise.resolve();
                  }
                  return Promise.reject("must be over 8 characters");
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username/ Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item valuePropName="checked" style={{ marginBottom: 2 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
