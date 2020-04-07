export enum PageAction {
  NEXT_PAGE = "@packages/NEXT_PAGE",
  PREV_PAGE = "@packages/PREV_PAGE",
}

export interface PageUpdateRequest {
  type: typeof PageAction.NEXT_PAGE | PageAction.PREV_PAGE;
}
