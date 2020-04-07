import {
  DeliverymanActions,
  DeliverymanActionsTypes,
  IDeliveryman,
} from "./types";
import { PageAction } from "../generalTypes";

export function getDeliverymenRequest(): DeliverymanActionsTypes {
  return {
    type: DeliverymanActions.GET_DELIVERYMEN_REQUEST,
  };
}
export function getDeliverymenSuccess(
  deliverymen: IDeliveryman[],
  page: number,
  filter: string
): DeliverymanActionsTypes {
  return {
    type: DeliverymanActions.GET_DELIVERYMEN_SUCCESS,
    payload: { deliverymen, page, filter },
  };
}
export function getDeliverymenFailure(): DeliverymanActionsTypes {
  return {
    type: DeliverymanActions.GET_DELIVERYMEN_FAILURE,
  };
}

export function updatePageRequest(
  action: PageAction.NEXT_PAGE | PageAction.PREV_PAGE
): DeliverymanActionsTypes {
  return {
    type: action,
  };
}

export function getDeliverymanByFilter(
  filter: string
): DeliverymanActionsTypes {
  return {
    type: DeliverymanActions.GET_DELIVERYMAN_BY_FILTER,
    payload: {
      filter,
    },
  };
}

export function clearFilters(): DeliverymanActionsTypes {
  return {
    type: DeliverymanActions.CLEAR_FILTER,
  };
}
