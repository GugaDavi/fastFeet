import { IAddress } from "../address/types";
import { PageUpdateRequest } from "../generalTypes";
/**
 * Data types
 */

export interface IRecipient {
  id: number;
  name: string;
  address_id: number;
  address: IAddress;
}

/**
 * Deliveryman State
 */

export interface RecipientsState {
  recipients: IRecipient[];
  page: number;
  filter: string;
}

/**
 * Action Types
 */

export enum RecipientsActions {
  GET_RECIPIENTS_REQUEST = "@recipients/GET_RECIPIENTS_REQUEST",
  GET_RECIPIENTS_SUCCESS = "@recipients/GET_RECIPIENTS_SUCCESS",
  GET_RECIPIENTS_FAILURE = "@recipients/GET_RECIPIENTS_FAILURE",
  GET_RECIPIENT_BY_FILTER = "@recipients/GET_RECIPIENT_BY_FILTER",
  CLEAR_FILTER = "@recipients/CLEAR_FILTER",
}

export interface GetRecipientsRequest {
  type: typeof RecipientsActions.GET_RECIPIENTS_REQUEST;
}

export interface GetRecipientsSuccess {
  type: typeof RecipientsActions.GET_RECIPIENTS_SUCCESS;
  payload: {
    deliverymen: IRecipient[];
    page: number;
    filter: string;
  };
}

export interface GetRecipientsFailure {
  type: typeof RecipientsActions.GET_RECIPIENTS_FAILURE;
}

export interface GetRecipientByFilter {
  type: typeof RecipientsActions.GET_RECIPIENT_BY_FILTER;
  payload: {
    filter: string;
  };
}

export interface ClearFilters {
  type: typeof RecipientsActions.CLEAR_FILTER;
}

export type RecipientsActionsTypes =
  | GetRecipientsRequest
  | GetRecipientsSuccess
  | GetRecipientsFailure
  | GetRecipientByFilter
  | ClearFilters
  | PageUpdateRequest;
