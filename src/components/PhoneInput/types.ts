
export interface PhoneNumbersValue {
  countryCode?: string;
  phoneNumber?: string;
}

export interface PhoneNumberProps {
  value?: PhoneNumbersValue;
  defaultValue?: PhoneNumbersValue;
  onChange?: (value: PhoneNumbersValue) => void;
}