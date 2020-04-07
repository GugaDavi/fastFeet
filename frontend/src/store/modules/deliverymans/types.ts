import { PageUpdateRequest } from "../generalTypes";

/**
 * Data Types
 */

export interface IDeliveryman {
  id: number;
  name: string;
  email: string;
  avatar_id: number;
  avatar: {
    url: string;
    path: string;
  };
}

/**
 * Deliveryman State
 */

export interface DeliverymanState {
  deliverymen: IDeliveryman[];
  page: number;
  filter: string;
}

/**
 * Action Types
 */

export enum DeliverymanActions {
  GET_DELIVERYMEN_REQUEST = "@deliverymen/GET_DELIVERYMEN_REQUEST",
  GET_DELIVERYMEN_SUCCESS = "@deliverymen/GET_DELIVERYMEN_SUCCESS",
  GET_DELIVERYMEN_FAILURE = "@deliverymen/GET_DELIVERYMEN_FAILURE",
  GET_DELIVERYMAN_BY_FILTER = "@deliverymen/GET_DELIVERYMAN_BY_FILTER",
  CLEAR_FILTER = "@deliverymen/CLEAR_FILTER",
}

export interface GetDeliverymenRequest {
  type: typeof DeliverymanActions.GET_DELIVERYMEN_REQUEST;
}

export interface GetDeliverymenSuccess {
  type: typeof DeliverymanActions.GET_DELIVERYMEN_SUCCESS;
  payload: {
    deliverymen: IDeliveryman[];
    page: number;
    filter: string;
  };
}

export interface GetDeliverymenFailure {
  type: typeof DeliverymanActions.GET_DELIVERYMEN_FAILURE;
}

export interface GetDeliverymanByFilter {
  type: typeof DeliverymanActions.GET_DELIVERYMAN_BY_FILTER;
  payload: {
    filter: string;
  };
}

export interface ClearFilters {
  type: typeof DeliverymanActions.CLEAR_FILTER;
}

export type DeliverymanActionsTypes =
  | GetDeliverymenRequest
  | GetDeliverymenSuccess
  | GetDeliverymenFailure
  | GetDeliverymanByFilter
  | ClearFilters
  | PageUpdateRequest;
