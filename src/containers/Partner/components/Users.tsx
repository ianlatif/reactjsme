import React from "react";
import { DeviceWrapper } from "../style";
import {
  Row,
  Col,
  Typography,
  Avatar,
  Button,
  Dropdown,
  Menu,
  Tooltip,
  Modal,
  message,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  EllipsisOutlined,
  CheckCircleTwoTone,
  VideoCameraAddOutlined,
  QuestionCircleTwoTone,
  UnlockTwoTone,
  LockTwoTone,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { PartnerUserState } from "../type";
import Devices from "./Devices";
import Put from "../../../action/put";
import { useDispatch } from "react-redux";
import { getPartnerDetail } from "../action";
import queryString from "query-string";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../../Users/action";
import Get from "../../../action/get";

const { Text } = Typography;

const Users = (props: PartnerUserState) => {
  const is_active = props.is_active ? "Deactivate" : "Activate";
  const query = queryString.parse(window.location.search);
  const { id } = useParams();
  const checkDispatch = props.partner_name;

  const dispatch = useDispatch();

  const onActivate = async () => {
    const loading = message.loading(`${is_active} in progress`);
    await Put(
      {
        url: `/user/${props.client_id}/${is_active.toLowerCase()}`,
      },
      (data) => {
        message.success(data.msg);
        checkDispatch
          ? dispatch(getUser())
          : dispatch(
              getPartnerDetail(
                `/partner/${id}/user/list`,
                queryString.stringify(query)
              )
            );
      }
    );
    await loading;
  };

  const onResendAcitivity = async () => {
    const loading = message.loading(`Resending link in progress`);
    await Get(
      {
        url: `/user/${props.client_id}/resend-verify`,
      },
      (data) => {
        message.success(data.msg);
      }
    );
    await loading;
  };

  const menu = () => {
    return (
      <Menu>
        <Menu.Item onClick={() => menuClick("active")}>
          <LockOutlined /> {is_active}
        </Menu.Item>
        <Menu.Item onClick={() => menuClick("resend-link")}>
          <CheckCircleOutlined /> Resend Link Verify
        </Menu.Item>
        <Menu.Item onClick={() => menuClick("add-device")}>
          <VideoCameraAddOutlined /> Add Devices
        </Menu.Item>
        <Menu.Item onClick={() => menuClick("remove-device")}>
          <VideoCameraOutlined /> Remove Devices
        </Menu.Item>
      </Menu>
    );
  };

  const menuClick = (action: string) => {
    switch (action) {
      case "active":
        Modal.confirm({
          title: `${is_active} user`,
          content: `Are you sure to ${is_active} ${props.username}?`,
          okText: is_active,
          onOk: onActivate,
          icon: (
            <QuestionCircleTwoTone
              twoToneColor={props.is_active ? "#ff9300" : "#1da7d6"}
            />
          ),
        });
        return;
      case "resend-link":
        Modal.confirm({
          title: `Resend link verify`,
          content: `Are you sure resend link to ${props.email_address}?`,
          okText: "Resend",
          onOk: onResendAcitivity,
          icon: <QuestionCircleTwoTone />,
        });
        return;
      case "add-device":
        Modal.confirm({
          title: "Add Devices",
          content: (
            <>
              <Text>Add device for user {props.username}</Text>
              <br />
              <br />
              <Devices status={true} small={true} shadow={true} />
              <Devices status={false} small={true} shadow={true} />
            </>
          ),
          okText: "Confirm",
        });
        return;
      case "remove-device":
        Modal.confirm({
          title: "Remove Devices",
          content: (
            <>
              <Text>Remove device for user {props.username}</Text>
              <br />
              <br />
              <Devices status={true} small={true} shadow={true} />
              <Devices status={false} small={true} shadow={true} />
            </>
          ),
          okText: "Confirm",
        });
        return;
    }
  };
  return (
    <DeviceWrapper>
      <Row align="middle" justify="space-between" style={{ lineHeight: 1.3 }}>
        <Col span={5}>
          <div className="flex-center">
            <span>
              <Avatar>{props.username.toUpperCase()[0]}</Avatar>
            </span>
            <span>
              <div>
                <Text strong>
                  {props.first_name} {props.last_name}
                </Text>
              </div>
              <Text type="secondary">{props.username} </Text>
            </span>
          </div>
        </Col>
        {props.partner_name && (
          <Col span={5}>
            <Link to={`/partner/${props.partner_id}/devices`}>
              <div className="flex-center">
                <span>
                  <Avatar>{props.username.toUpperCase()[0]}</Avatar>
                </span>
                <span>
                  <Text strong>{props.partner_name}</Text>
                </span>
              </div>
            </Link>
          </Col>
        )}
        <Col span={2}>
          {props.is_active ? (
            <Tooltip title="User Active">
              <UnlockTwoTone style={{ fontSize: 20, marginRight: 8 }} />
            </Tooltip>
          ) : (
            <Tooltip title="User not Active">
              <LockTwoTone
                style={{ fontSize: 20, marginRight: 8 }}
                twoToneColor="#ddd"
              />
            </Tooltip>
          )}

          {props.is_verified ? (
            <Tooltip title="User verified">
              <CheckCircleTwoTone style={{ fontSize: 20 }} />
            </Tooltip>
          ) : (
            <Tooltip title="User not verified">
              <CheckCircleTwoTone
                style={{ fontSize: 20 }}
                twoToneColor="#ddd"
              />
            </Tooltip>
          )}
        </Col>
        <Col span={6}>
          <div className="flex-top">
            <Text>
              <MailOutlined />
            </Text>
            <Text>
              <Text>{props.email_address}</Text>
            </Text>
          </div>
          <PhoneOutlined /> {props.mobile_number}
        </Col>
        <Col span={4}>
          <VideoCameraOutlined /> {props.total_devices} Devices
        </Col>
        <Col>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button shape="circle">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </DeviceWrapper>
  );
};

export default Users;
