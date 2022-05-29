import { FC, useRef, useState } from "react";
import { Form, Input, Button, FormInstance } from "antd";
import '../../assets/css/Login.less'

export interface LoginDataInt {
    username: string,
    password: string
}


const Login: FC = () => {

  
  // const loginData = new LoginData();
  const loginForm = useRef<FormInstance | null>(null)

  const onFinish = (values: LoginDataInt) => {
    let loginData: LoginDataInt = {
      username: values.username,
      password: values.password,
    };
    console.log("Success:", loginData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const validatePass = (rule: any, value: any, callback: any) => {
    //  密码只能由大小写英文字母或数字开头，且由大小写英文字母_.组成
    const reg = /^[A-Za-z0-9][A-Za-z0-9_.]{5,14}$/
    if (!value.match(reg)) {
      callback(new Error('密码由字母或数字开头，且只能为字母,数字,下划线及（.）'))
    } else {
      callback()
    }
    };
  return (
    <div className="container">
      <div className="login-box">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          ref={loginForm}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!", validator: validatePass }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
