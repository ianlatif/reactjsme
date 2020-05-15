import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../../layouts/Main";
import {
  List,
  Card,
  Avatar,
  Typography,
  Button,
  Dropdown,
  Menu,
  Row,
  Col,
  Modal,
  Input,
  message,
} from "antd";
import { useHistory, Link } from "react-router-dom";
import FloatingAction from "../../components/FloatingAction/FloatingAction";
import queryString from "query-string";
import {
  MoreOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  CheckCircleTwoTone,
  VideoCameraTwoTone,
  ExclamationCircleOutlined,
  VideoCameraOutlined,
  InfoCircleTwoTone,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPartner } from "./action";
import { PartnerState } from "./type";
import { SelectorType } from "../../reducer/type";
import Get from "../../action/get";
import copy from "copy-text-to-clipboard";

const { Text } = Typography;

export const breadCrumbUser = [
  {
    name: "Partner",
    link: "/partner",
  },
];

function Partner() {
  const dispatch = useDispatch();
  const query = queryString.parse(window.location.search);
  const history = useHistory();
  const timer = useRef<any>(null);
  const firstRender = useRef(true);
  const partners: PartnerState[] = useSelector(
    (state: SelectorType) => state.partnerList
  );

  const [employeeQuery, setEmployeeQuery] = useState({
    q: query.q || "",
    page: typeof query.page === "string" ? parseInt(query.page) : 1,
    limit: typeof query.limit === "string" ? parseInt(query.limit) : 12,
  });

  useEffect(() => {
    const query = queryString.stringify(employeeQuery);
    clearTimeout(timer.current);

    if (firstRender.current) {
      dispatch(getPartner(query));
      firstRender.current = false;
      return;
    }

    timer.current = setTimeout(() => {
      const query = queryString.stringify(employeeQuery);
      history.replace(`/partner?${query}`);
      dispatch(getPartner(query));
    }, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [dispatch, employeeQuery, history]);

  const menu = (id: number, isActive?: boolean) => {
    return (
      <Menu>
        <Menu.Item>
          <Link to={`/employee/${id}/edit`}>
            <PlusOutlined /> Add Device
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/employee/${id}/edit`}>
            <DeleteOutlined /> Delete
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/employee/${id}/edit`}>
            <EditOutlined /> Edit Partner
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/partner/${id}/devices`}>
            <VideoCameraOutlined /> Devices
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/partner/${id}/users`}>
            <UserOutlined /> Users
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  const checkUnsavePartner = () => {
    const companyInformation = localStorage.getItem("companyInformation");
    const userCredential = localStorage.getItem("userCredential");

    if (companyInformation || userCredential) {
      Modal.confirm({
        title: "Previous partner not finished",
        okText: "Create New",
        cancelText: "Use Existing",
        icon: <ExclamationCircleOutlined />,
        content: <Text>Use existing or create new partner</Text>,
        onOk() {
          localStorage.removeItem("companyInformation");
          localStorage.removeItem("userCredential");
          history.push(`/create/partner/company-information`);
        },
        onCancel() {
          history.push(`/create/partner/company-information`);
        },
      });
      return;
    }

    history.push(`/create/partner/company-information`);
  };

  const onCreatePartner = () => {
    Modal.confirm({
      title: "Create partner",
      content: "Choose your method for create partner",
      okText: "Create Manual",
      onOk: checkUnsavePartner,
      onCancel: () => {
        Get(
          {
            url: `/user/register/generate-access`,
          },
          (payload) => {
            Modal.info({
              title: "Please copy & Save the link",
              okText: "Copy to clipboard",
              onOk: () => {
                copy(payload.data);
                message.info("Link copied");
              },
              content: (
                <>
                  <Input value={payload.data} />
                </>
              ),
            });
          }
        );
      },
      icon: <InfoCircleTwoTone />,
      cancelText: "Generate Link",
    });
    return;
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmployeeQuery((prevState) => ({
      ...prevState,
      q: value,
    }));
  };

  const onAddUser = () => {
    Modal.confirm({
      title: "Add Partner",
      content: "Generate url for client to self-service register new partner ?",
      icon: <UsergroupAddOutlined />,
      okText: "Yes",
      onOk: () => {
        const hide = message.loading("Generating link.");
        Get(
          {
            url: `/user/register/generate-access`,
          },
          (payload) => {
            setTimeout(hide, 1);
            Modal.info({
              title: "Please copy & Save the link",
              okText: "Copy to clipboard",
              onOk: () => {
                copy(payload.data);
                message.info("Link copied");
              },
              content: (
                <>
                  <Input value={payload.data} />
                </>
              ),
            });
          }
        );
        setTimeout(hide, 1);
      },
    });
  };

  return (
    <MainLayout selectedKeys={["1"]} breadcrumbs={breadCrumbUser}>
      <Row>
        <Col span={8}>
          <Input.Search onChange={onSearch} value={employeeQuery.q} />
        </Col>
      </Row>
      <br />
      <List
        grid={{ gutter: 16, sm: 1, md: 4 }}
        itemLayout="horizontal"
        dataSource={partners}
        pagination={{
          pageSize: employeeQuery.limit,
          hideOnSinglePage: true,
        }}
        renderItem={(item) => (
          <List.Item className="employee-list">
            <Card
              title={
                <div className="employee-avatar">
                  <Avatar src={item.profile_image} size={100}>
                    {item.partner_name}
                  </Avatar>
                  <div
                    style={{
                      position: "absolute",
                      right: 4,
                      bottom: 1,
                      fontSize: 21,
                    }}
                  >
                    <CheckCircleTwoTone twoToneColor="#1da7d6" />
                  </div>
                </div>
              }
            >
              <div className="employee-action">
                <Dropdown
                  overlay={() => menu(item.partner_id, item.is_valid)}
                  placement="bottomRight"
                >
                  <Button icon={<MoreOutlined />} shape="circle" />
                </Dropdown>
              </div>
              <div className="employee-title">
                <Text style={{ fontSize: 18 }} strong>
                  {item.partner_name}
                </Text>
                <div
                  style={{ marginTop: 32, textAlign: "right", lineHeight: 1 }}
                >
                  <Row justify="space-between" align="bottom">
                    <Col>
                      <Text style={{ lineHeight: 1.8 }}>
                        <VideoCameraTwoTone style={{ fontSize: 20 }} />
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ fontSize: 12 }} type="secondary">
                        Total Device
                      </Text>
                      <div>
                        <Text style={{ fontSize: 32 }} strong>
                          {item.total_devices}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <FloatingAction onClick={onAddUser} />
    </MainLayout>
  );
}

export default Partner;
