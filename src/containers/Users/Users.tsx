import React, { useEffect } from "react";
import MainLayout from "../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./action";
import { List } from "antd";
import Users from "../Partner/components/Users";
import { PartnerUserState } from "../Partner/type";
import { SelectorType } from "../../reducer/type";

export const breadcrumbsUser = [{ link: "/users", name: "Users" }];

const User = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: SelectorType) => state.userList);

  useEffect(() => {
    dispatch(getUser());
    return () => {};
  }, [dispatch]);

  return (
    <MainLayout breadcrumbs={breadcrumbsUser} selectedKeys={["3"]}>
      <List
        dataSource={lists}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        renderItem={(item: PartnerUserState) => <Users {...item} />}
      />
    </MainLayout>
  );
};

export default User;
