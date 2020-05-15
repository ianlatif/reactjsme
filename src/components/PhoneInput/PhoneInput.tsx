import React, { useState } from "react";
import { Input, Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { PhoneNumberProps, PhoneNumbersValue } from "./types";

const { Option } = Select;

const PhoneInput: React.FC<PhoneNumberProps> = ({
  defaultValue = {},
  value = {},
  onChange,
}) => {
  const [countryCode, setCountryCode] = useState(
    value.countryCode || defaultValue.countryCode || "+62"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    value.phoneNumber || defaultValue.phoneNumber || ""
  );

  const triggerChange = (value: PhoneNumbersValue) => {
    if (onChange) {
      onChange({ countryCode, phoneNumber, ...value });
    }
  };

  const onCountryCodeChange = (value: SelectValue) => {
    setCountryCode(value.toString());
    triggerChange({ countryCode: value.toString() });
  };

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setPhoneNumber(value);
    triggerChange({ phoneNumber: value });
  };

  return (
    <Input.Group compact>
      <Select onChange={onCountryCodeChange} value={countryCode}>
        <Option value="+62">+62</Option>
        <Option value="+12">+12</Option>
      </Select>
      <Input
        onChange={onPhoneNumberChange}
        value={phoneNumber}
        style={{ width: "50%" }}
        type="number"
      />
    </Input.Group>
  );
};

export default PhoneInput;
