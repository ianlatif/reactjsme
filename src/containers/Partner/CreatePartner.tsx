import React, { useState, useRef } from "react";
import MainLayout from "../../layouts/Main";
import { breadCrumbUser } from "./Partner";
import {
  Steps,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  message,
  Empty,
  Typography,
  Spin,
} from "antd";
import UploadFileForm from "../../components/Upload/Upload";
import { useParams, useHistory } from "react-router-dom";
import { CreateUserWrapper } from "./style";
import { Store } from "antd/lib/form/interface";
import PhoneInput from "../../components/PhoneInput/PhoneInput";
import { CompanyInformationType, AddresSearch } from "./type";
import Post from "../../action/post";
import queryString from "query-string";
import Get from "../../action/get";

const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;

const CreateUser = () => {
  const { progress } = useParams();
  const [loading, setLoading] = useState(false);
  const [districtName, setDistrictName] = useState("");
  const timer = useRef<any>(null);
  const [form] = Form.useForm();
  const [searchAddress, setSearchAddress] = useState<AddresSearch[] | null>([]);
  const CompanyInformation = localStorage.getItem("companyInformation") || "{}";
  const UserCredentials = localStorage.getItem("userCredential") || "{}";
  const formValues: CompanyInformationType = {
    ...JSON.parse(CompanyInformation),
    ...JSON.parse(UserCredentials),
  };
  const history = useHistory();

  const checkStatus = (name: string) => {
    if (name === progress) {
      if (name === "verify") {
        return "finish";
      }
      return "process";
    }

    if (name === "company-information" && progress === "user-credential") {
      return "finish";
    }

    if (
      (name === "company-information" || name === "user-credential") &&
      progress === "verify"
    ) {
      return "finish";
    }
  };

  const onPrevious = () => {
    if (progress === "user-credential") {
      history.push("/create/partner/company-information");
    }
  };

  const onAddressSearch = async (value: string) => {
    const searchquery = {
      q: value,
    };
    setSearchAddress(null);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      Get(
        {
          url: `/zone/district/list`,
          query: queryString.stringify(searchquery),
          onError: (e) => {
            setSearchAddress(null);
          },
        },
        (payload) => {
          console.log("hii");
          setSearchAddress(payload.data);
          return;
        }
      );
    }, 300);
  };

  const checkAddress = (
    name: "country_name" | "region_name" | "district_name" | "zip_codes",
    i: string
  ) => {
    if (Array.isArray(searchAddress)) {
      let index = searchAddress.filter((data) => data.district_name === i);

      console.log(index, " vcheck index", name, i);

      return index[0] ? index[0][name] : "";
    }
    return "";
  };

  const onFinish = async (values: Store) => {
    if (progress === "company-information") {
      localStorage.setItem(
        "companyInformation",
        JSON.stringify({
          ...values,
          profile_image: "",
          country_name: checkAddress("country_name", values.district_name),
          region_name: checkAddress("region_name", values.district_name),
        })
      );
      history.push("/create/partner/user-credential");
    }

    if (progress === "user-credential") {
      setLoading(true);
      const hide = message.loading("Creating Partner in progress");
      const companyInformation = JSON.parse(
        localStorage.getItem("companyInformation") || ""
      );
      localStorage.setItem(
        "userCredential",
        JSON.stringify({
          ...values,
          password: "",
        })
      );

      const phone_number =
        companyInformation.phone_number?.countryCode +
        companyInformation.phone_number?.phoneNumber;

      const mobile_number =
        values.mobile_number?.countryCode + values.mobile_number?.phoneNumber;

      await Post(
        {
          url: "/user/register",
          values: {
            ...companyInformation,
            ...values,
            profile_image: values.profile_image?.file?.originFileObj,
            phone_number: phone_number,
            username: values.username.toLowerCase(),
            mobile_number: mobile_number,
          },
          type: "form",
        },
        (data) => {
          localStorage.removeItem("companyInformation");
          localStorage.removeItem("userCredential");
          message.success(data.msg);
          history.push("/create/partner/verify");
          setLoading(false);
        }
      );

      await setLoading(false);
      await hide;
    }
  };

  const listsZipcode = checkAddress("zip_codes", districtName);

  const onDistrictChange = (value: string) => {
    const listsZipcode = checkAddress("zip_codes", value);

    form.setFieldsValue({ zip_code: listsZipcode[0] });
    setDistrictName(value);
  };

  return (
    <MainLayout
      back
      selectedKeys={["1"]}
      breadcrumbs={[
        ...breadCrumbUser,
        { name: "Create Partner", link: "/create/partner" },
      ]}
    >
      <br />
      <CreateUserWrapper>
        <Steps>
          <Step
            title="Company Information"
            status={checkStatus("company-information")}
          />
          <Step
            title="User Credential"
            status={checkStatus("user-credential")}
          />
          <Step title="Verify Email" status={checkStatus("verify")} />
        </Steps>
        <br />
        <br />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={formValues}
          acceptCharset="utf-8"
        >
          <Row
            gutter={12}
            style={{
              display: progress === "company-information" ? "flex" : "none",
            }}
          >
            <Col span={12}>
              <Form.Item
                rules={[{ required: true, message: "Company name required!" }]}
                name="legal_name"
                label="Company Name"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="partner_email"
                rules={[
                  { required: true, message: "Email required!" },
                  { type: "email", message: "Format email not valid" },
                ]}
                label="Email"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                rules={[
                  { required: true, message: "Phone office required!" },
                  ({ getFieldValue }) => ({
                    validator(value) {
                      console.log(value);
                      if (
                        !value ||
                        (getFieldValue("phone_number") &&
                          getFieldValue("phone_number").phoneNumber.length >=
                            7 &&
                          getFieldValue("phone_number").phoneNumber.length < 13)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Phone number not valid!");
                    },
                  }),
                ]}
                name="phone_number"
                label="Phone Office"
              >
                <PhoneInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="country_name"
                rules={[{ required: true, message: "Country required!" }]}
                label="Country"
              >
                <Select>
                  <Option value="Indonesia">Indonesia</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="district_name" label="City">
                <Select
                  showSearch
                  onSearch={onAddressSearch}
                  onChange={onDistrictChange}
                  notFoundContent={
                    searchAddress === null ? <Spin /> : undefined
                  }
                >
                  {searchAddress?.map((data, i) => (
                    <Option value={data.district_name} key={data.district_name}>
                      {data.district_name}, {data.region_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="zip_code" label="Postal Codes">
                <Select>
                  {Array.isArray(listsZipcode) &&
                    listsZipcode.map((data) => (
                      <Option value={data} key={data}>
                        {data}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="profile_image" label="Logo Company">
                <UploadFileForm description="Format File .jpg .png .jpeg & size must be less then 5mb" />
              </Form.Item>
            </Col>
          </Row>
          {progress === "user-credential" && (
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="first_name"
                  rules={[{ required: true, message: "First name required!" }]}
                  label="First Name"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="last_name"
                  rules={[{ required: true, message: "Last name required!" }]}
                  label="Last Name"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="user_email"
                  rules={[
                    { required: true, message: "Email required!" },
                    { type: "email", message: "Format email not valid" },
                  ]}
                  label="Email"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="mobile_number"
                  rules={[
                    { required: true, message: "Mobile Number required!" },
                    ({ getFieldValue }) => ({
                      validator(value) {
                        if (
                          !value ||
                          (getFieldValue("mobile_number") &&
                            getFieldValue("mobile_number").phoneNumber.length >=
                              7 &&
                            getFieldValue("mobile_number").phoneNumber.length <
                              13)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Mobile number not valid!");
                      },
                    }),
                  ]}
                  label="Mobile Number"
                >
                  <PhoneInput />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Username required!" },
                    ({ getFieldValue }) => ({
                      validator(value) {
                        if (
                          getFieldValue("username") &&
                          getFieldValue("username").match(
                            /^[a-zA-Z0-9\\.]{6,30}$/g
                          )
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Character is not valid!!");
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Password required!" },
                    ({ getFieldValue }) => ({
                      validator(value) {
                        if (
                          getFieldValue("password") &&
                          getFieldValue("password").length >= 8
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject("must be over 8 characters");
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          )}
          {progress === "verify" && (
            <div style={{ textAlign: "center" }}>
              <Title level={3}>Create partner completed</Title>
              <Text>please tell the user to check email!</Text>
              <Empty
                image={require("../../assets/illustrations/tellUser.svg")}
                imageStyle={{ height: 300 }}
                style={{ margin: "60px 0" }}
                description=""
              />
              <Button
                type="primary"
                onClick={() => history.replace("/partner")}
              >
                Back to Partner
              </Button>
            </div>
          )}
          <Row justify="end" gutter={12}>
            {progress !== "verify" && (
              <Col>
                <Button
                  type="primary"
                  onClick={onPrevious}
                  disabled={progress === "company-information"}
                >
                  Previous
                </Button>
              </Col>
            )}
            {progress === "company-information" && (
              <Col>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Col>
            )}
            {progress === "user-credential" && (
              <Col>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </CreateUserWrapper>
    </MainLayout>
  );
};

export default CreateUser;
