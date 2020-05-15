import {PartnerPayload, PartnerState} from './type'

export const partnerList = (
  state: PartnerState[] = [],
  action: PartnerPayload,
) => {
  switch (action.type) {
    case "GET_PARTNER":
      return action.payload;
    default:
      return state;
  }
};

export const partnerDetailList = <T>(
  state: T[] = [],
  action: PartnerPayload,
) => {
  switch (action.type) {
    case "GET_PARTNER_DETAIL":
      return action.payload;
    default:
      return state;
  }
};

