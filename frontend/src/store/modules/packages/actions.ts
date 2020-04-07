import { PackageActionsTypes, PackageActions, IPackage } from "./types";
import { PageAction } from "../generalTypes";

export function getPackagesRequest(): PackageActionsTypes {
  return {
    type: PackageActions.GET_PACKAGES_REQUEST,
  };
}

export function getPackagesSuccess(
  packages: IPackage[],
  page: number,
  filter: string
): PackageActionsTypes {
  return {
    type: PackageActions.GET_PACKAGES_SUCCESS,
    payload: { packages, page, filter },
  };
}

export function getPackagesFailure(): PackageActionsTypes {
  return {
    type: PackageActions.GET_PACKAGES_FAILURE,
  };
}

export function updatePageRequest(
  action: PageAction.NEXT_PAGE | PageAction.PREV_PAGE
): PackageActionsTypes {
  return {
    type: action,
  };
}

export function getPackagesByFilters(filter: string): PackageActionsTypes {
  return {
    type: PackageActions.GET_PACKAGES_BY_FILTERS,
    payload: {
      filter,
    },
  };
}

export function clearFilters(): PackageActionsTypes {
  return {
    type: PackageActions.CLEAR_FILTER,
  };
}
