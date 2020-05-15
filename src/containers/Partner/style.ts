import styled from "styled-components";
import {DeviceWrapperProps} from './type'


export const UserDetailWrapper = styled.div`
  /* background-color: #fff; */
  /* padding: 20px;
  border-radius: 10px; */
`;

export const DevicesWrapper = styled.div`
  padding: 34px 0;
`;

export const DeviceWrapper = styled.div<DeviceWrapperProps>`
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: ${props => props.shadow? '1px 1px 3px rgba(0,0,0,0.1)': 'unset'};
`;

export const CreateUserWrapper = styled.div`
  background-color: #fff;
  max-width: 900px;
  padding: 40px;
  border-radius: 10px;
  margin: 0 auto 120px;
  /* .ant-steps-item-title::after {
    background-color: #fff;
  }
  .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after,
  .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after {
    background-color: #fff;
  } */
`

