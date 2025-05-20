import {
  NavigationActionTypes,
  NavigationActions,
} from "../actions/navigationActions";
import MenuItems from "../../types/MenuItems";

interface NavigationState {
  activePage: MenuItems;
}

const initialState: NavigationState = {
  activePage: MenuItems.CALENDAR,
};

export const navigationReducer = (
  state = initialState,
  action: NavigationActions
): NavigationState => {
  switch (action.type) {
    case NavigationActionTypes.SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};
