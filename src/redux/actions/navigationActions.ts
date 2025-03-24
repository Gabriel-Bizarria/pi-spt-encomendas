import MenuItems from "../../types/MenuItems";

export enum NavigationActionTypes {
  SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE",
}

// Define action type
interface SetActivePageAction {
  type: NavigationActionTypes.SET_ACTIVE_PAGE;
  payload: MenuItems;
}

export type NavigationActions = SetActivePageAction;

// Action creator
export const setActivePage = (page: MenuItems): SetActivePageAction => ({
  payload: page,
  type: NavigationActionTypes.SET_ACTIVE_PAGE,
});
