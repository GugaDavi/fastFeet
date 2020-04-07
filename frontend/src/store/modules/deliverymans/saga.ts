import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import api from "~/services/api";

import {
  IDeliveryman,
  DeliverymanState,
  DeliverymanActions,
  GetDeliverymanByFilter,
} from "./types";
import { getDeliverymenSuccess } from "./actions";
import { ApplicationState } from "~/store";
import { PageAction, PageUpdateRequest } from "../generalTypes";

interface RespGetDeliverymen {
  deliverymans: IDeliveryman[];
}

function* requestDeliverymen(page: number, filter: string) {
  try {
    const resp: AxiosResponse<RespGetDeliverymen> = yield call(
      api.get,
      `/deliverymans?page=${page}&filter=${filter}`
    );

    const { deliverymans } = resp.data;

    yield put(getDeliverymenSuccess(deliverymans, page, filter));
  } catch (error) {
    console.log(error);
    toast.error(
      "Ops, ouve um problema na solicitação. Poderia tentar novamente?"
    );
  }
}

function* getDeliverymen() {
  const state: DeliverymanState = yield select<
    (state: ApplicationState) => DeliverymanState
  >((state) => state.deliveryman);

  const page = state.page;
  const filter = state.filter;

  yield requestDeliverymen(page, filter);
}

function* gerDeliverymanByFilter({ payload }: GetDeliverymanByFilter) {
  const state: DeliverymanState = yield select<
    (state: ApplicationState) => DeliverymanState
  >((state) => state.deliveryman);

  const page = state.page;
  let filter = state.filter;

  const { filter: value } = payload;
  filter = value;

  yield requestDeliverymen(page, filter);
}

function* clearFilters() {
  const page = 1;
  const filter = "";

  yield requestDeliverymen(page, filter);
}

function* getDeliverymenByPage({ type }: PageUpdateRequest) {
  const state: DeliverymanState = yield select<
    (state: ApplicationState) => DeliverymanState
  >((state) => state.deliveryman);

  let page = state.page;
  const filter = state.filter;

  if (type === PageAction.NEXT_PAGE) {
    page += 1;
  } else {
    if (page > 1) page -= 1;
  }

  yield requestDeliverymen(page, filter);
}

export default all([
  takeLatest(DeliverymanActions.GET_DELIVERYMEN_REQUEST, getDeliverymen),
  takeLatest(
    DeliverymanActions.GET_DELIVERYMAN_BY_FILTER,
    gerDeliverymanByFilter
  ),
  takeLatest(DeliverymanActions.CLEAR_FILTER, clearFilters),
  takeLatest(PageAction.NEXT_PAGE, getDeliverymenByPage),
  takeLatest(PageAction.PREV_PAGE, getDeliverymenByPage),
]);
