import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import api from "~/services/api";

import {
  PackageActions,
  IPackage,
  PackageState,
  GetPackagesByFilters,
} from "./types";
import { getPackagesSuccess } from "./actions";
import { ApplicationState } from "~/store";
import { PageAction, PageUpdateRequest } from "../generalTypes";

interface RespGetPackages {
  packages: IPackage[];
}

function* requestPackages(page: number, filter: string) {
  try {
    const resp: AxiosResponse<RespGetPackages> = yield call(
      api.get,
      `/packages?page=${page}&filter=${filter}`
    );

    const { packages } = resp.data;

    yield put(getPackagesSuccess(packages, page, filter));
  } catch (error) {
    console.log(error);
    toast.error(
      "Ops, ouve um problema na solicitação. Poderia tentar novamente?"
    );
  }
}

function* getPackages() {
  const state: PackageState = yield select<
    (state: ApplicationState) => PackageState
  >((state) => state.packages);

  const page = state.page;
  const filter = state.filter;

  yield requestPackages(page, filter);
}

function* getPackagesByPages({ type }: PageUpdateRequest) {
  const state: PackageState = yield select<
    (state: ApplicationState) => PackageState
  >((state) => state.packages);

  let page = state.page;
  const filter = state.filter;

  if (type === PageAction.NEXT_PAGE) {
    page += 1;
  } else {
    if (page > 1) page -= 1;
  }

  yield requestPackages(page, filter);
}

function* getPackagesByFilter({ payload }: GetPackagesByFilters) {
  const state: PackageState = yield select<
    (state: ApplicationState) => PackageState
  >((state) => state.packages);

  const page = state.page;
  let filter = state.filter;

  const { filter: value } = payload;
  filter = value;

  yield requestPackages(page, filter);
}

function* clearFilters() {
  const page = 1;
  const filter = "";

  yield requestPackages(page, filter);
}

export default all([
  takeLatest(PackageActions.GET_PACKAGES_REQUEST, getPackages),
  takeLatest(PageAction.NEXT_PAGE, getPackagesByPages),
  takeLatest(PageAction.PREV_PAGE, getPackagesByPages),
  takeLatest(PackageActions.GET_PACKAGES_BY_FILTERS, getPackagesByFilter),
  takeLatest(PackageActions.CLEAR_FILTER, clearFilters),
]);
