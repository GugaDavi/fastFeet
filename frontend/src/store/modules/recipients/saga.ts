import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import api from "~/services/api";

import {
  IRecipient,
  RecipientsState,
  RecipientsActions,
  GetRecipientByFilter,
} from "./types";
import { getDeliverymenSuccess } from "./actions";
import { ApplicationState } from "~/store";
import { PageAction, PageUpdateRequest } from "../generalTypes";

interface RespGetRecipients {
  recipients: IRecipient[];
}

function* requestDeliverymen(page: number, filter: string) {
  try {
    const resp: AxiosResponse<RespGetRecipients> = yield call(
      api.get,
      `/recipients?page=${page}&filter=${filter}`
    );

    const { recipients } = resp.data;

    yield put(getDeliverymenSuccess(recipients, page, filter));
  } catch (error) {
    console.log(error);
    toast.error(
      "Ops, ouve um problema na solicitação. Poderia tentar novamente?"
    );
  }
}

function* getDeliverymen() {
  const state: RecipientsState = yield select<
    (state: ApplicationState) => RecipientsState
  >((state) => state.recipients);

  const page = state.page;
  const filter = state.filter;

  yield requestDeliverymen(page, filter);
}

function* gerDeliverymanByFilter({ payload }: GetDeliverymanByFilter) {
  const state: RecipientsState = yield select<
    (state: ApplicationState) => RecipientsState
  >((state) => state.recipients);

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
  const state: RecipientsState = yield select<
    (state: ApplicationState) => RecipientsState
  >((state) => state.recipients);

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
  takeLatest(RecipientsActions.GET_RECIPIENTS_REQUEST, getDeliverymen),
  takeLatest(RecipientsActions.GET_RECIPIENT_BY_FILTER, gerDeliverymanByFilter),
  takeLatest(RecipientsActions.CLEAR_FILTER, clearFilters),
  takeLatest(PageAction.NEXT_PAGE, getDeliverymenByPage),
  takeLatest(PageAction.PREV_PAGE, getDeliverymenByPage),
]);
