import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/Main";
import { breadCrumbUser } from "./Partner";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tabs,
  List,
  Button,
  Modal,
  Input,
  message,
} from "antd";
import { UserDetailWrapper, DevicesWrapper } from "./style";
import Devices from "./components/Devices";
import { useHistory, useParams } from "react-router-dom";
import Users from "./components/Users";
import { useSelector, useDispatch } from "react-redux";
import { getPartnerDetail } from "./action";
import { PartnerUserState, PartnerState } from "./type";
import Get from "../../action/get";
import moment from "moment";
import { SelectorType } from "../../reducer/type";
import { PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import copy from "copy-text-to-clipboard";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function UserDetail() {
  const history = useHistory();
  const { id, menu } = useParams();
  const [partner, setPartner] = useState<PartnerState>({ partner_id: 0 });
  const dispatch = useDispatch();
  const lists = useSelector((state: SelectorType) => state.partnerDetailList);

  useEffect(() => {
    Get({ url: `/partner/${id}/details` }, (payload) => {
      setPartner(payload.data);
    });

    switch (menu) {
      case "users":
        dispatch(getPartnerDetail(`/partner/${id}/user/list`));
        return;
    }
    return () => {
      dispatch({
        type: "GET_PARTNER",
        payload: [],
      });
    };
  }, [dispatch, id, menu]);

  const onTabClick = (activekey: string) => {
    console.log(activekey);
    history.replace(`/partner/${id}/${activekey}`);
  };

  const onAddUser = () => {
    Modal.confirm({
      title: "Add User",
      content: "Generate url for client to self-service register new user ?",
      icon: <UsergroupAddOutlined />,
      okText: "Yes",
      onOk: () => {
        const hide = message.loading("Generating link.");
        Get(
          {
            url: `/user/register/generate-access`,
            query: `partner_id=${id}`,
          },
          async (payload) => {
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
    <MainLayout
      back
      selectedKeys={["1"]}
      breadcrumbs={[
        ...breadCrumbUser,
        {
          name: partner.partner_name || "loading..",
          link: `/partner/${id}/devices`,
        },
      ]}
    >
      <UserDetailWrapper>
        <Row gutter={16} align="middle">
          <Col>
            <Avatar size={100} src={partner.profile_image} />
          </Col>
          <Col>
            <div>
              <Row gutter={8} align="bottom">
                <Col>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {partner.partner_name}
                  </Title>
                </Col>
                <Col>
                  <Text type="secondary" style={{ lineHeight: 1.7 }}>
                    {moment(partner.registered_at).format("DD MMMM YYYY")}
                  </Text>
                </Col>
              </Row>
              <Text type="secondary">Coorporate</Text>
            </div>
            <Text>{partner.email_address}</Text>
            <br />
            <Text>{partner.address}</Text>
            <br />
            <Button type="primary" onClick={onAddUser}>
              <PlusOutlined /> User
            </Button>
          </Col>
        </Row>
      </UserDetailWrapper>
      <DevicesWrapper>
        <Tabs onChange={onTabClick} activeKey={menu}>
          <TabPane tab="Devices" key="devices">
            {/* <Typography>
              <Text strong>Devices Overview</Text>
            </Typography>
            <br /> */}
            <Devices status={true} />
            <Devices status={false} />
          </TabPane>
          <TabPane tab="Users" key="users">
            {/* <Typography>
              <Text strong>Users Overview</Text>
            </Typography>
            <br /> */}
            <List
              dataSource={lists}
              renderItem={(item: PartnerUserState) => <Users {...item} />}
            />
          </TabPane>
        </Tabs>
      </DevicesWrapper>
    </MainLayout>
  );
}

export default UserDetail;
