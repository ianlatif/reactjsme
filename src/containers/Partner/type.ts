import { PhoneNumbersValue } from "../../components/PhoneInput/types";
import { Action } from "redux";

export interface DevicesProps {
  status: boolean;
  small?: boolean;
  shadow?: boolean;
}

export interface CompanyInformationType {
  legal_name?: string;
  phone_number?: PhoneNumbersValue;
  country_id?: string;
}

export interface PartnerPayload extends Action {
  payload: any;
}

export interface PartnerState {
  partner_id: number;
  partner_name?: string;
  profile_image?: string;
  total_devices?: number;
  email_address?: string;
  address?: string;
  is_valid?: boolean;
  registered_at?: string;
}

export interface PartnerUserState {
  client_id: number;
  partner_id?: string;
  partner_name?: string;
  first_name?: string;
  last_name?: string;
  mobile_number: string;
  email_address: string;
  username: string;
  is_default: boolean;
  is_active: boolean;
  is_verified: boolean;
  total_devices: number;
}

export interface DeviceWrapperProps {
  shadow?: boolean;
}

export interface AddresSearch {
  country_name: string;
  region_name: string;
  district_name: string;
  zip_codes: number[];
}
