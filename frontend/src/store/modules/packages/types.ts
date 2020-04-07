import { IDeliveryman } from "../deliverymans/types";
import { IRecipient } from "../recipients/types";
import { PageUpdateRequest } from "../generalTypes";

/**
 * Data Types
 */

export interface IPackage {
  id: number;
  product: string;
  canceled_at: string | null;
  start_date: string | null;
  end_date: string | null;
  recipient: IRecipient;
  deliveryman: IDeliveryman;
  signature: {
    path: string;
    url: string;
  };
}

/**
 * State Types
 */

export interface PackageState {
  packages: IPackage[] | null;
  loading: boolean;
  page: number;
  filter: string;
}

/**
 * Actions Types
 */

export enum PackageActions {
  GET_PACKAGES_REQUEST = "@packages/GET_PACKAGES_REQUEST",
  GET_PACKAGES_SUCCESS = "@packages/GET_PACKAGES_SUCCESS",
  GET_PACKAGES_FAILURE = "@packages/GET_PACKAGES_FAILURE",
  GET_PACKAGES_BY_FILTERS = "@packages/GET_PACKAGES_BY_FILTERS",
  CLEAR_FILTER = "@packages/CLEAR_FILTER",
}

export interface GetPackagesRequest {
  type: typeof PackageActions.GET_PACKAGES_REQUEST;
}

export interface GetPackagesSuccess {
  type: typeof PackageActions.GET_PACKAGES_SUCCESS;
  payload: {
    packages: IPackage[];
    page: number;
    filter: string;
  };
}

export interface GetPackagesFailure {
  type: typeof PackageActions.GET_PACKAGES_FAILURE;
}

export interface GetPackagesByFilters {
  type: typeof PackageActions.GET_PACKAGES_BY_FILTERS;
  payload: {
    filter: string;
  };
}

export interface ClearFilters {
  type: typeof PackageActions.CLEAR_FILTER;
}

export type PackageActionsTypes =
  | GetPackagesRequest
  | GetPackagesSuccess
  | GetPackagesFailure
  | PageUpdateRequest
  | GetPackagesByFilters
  | ClearFilters;
