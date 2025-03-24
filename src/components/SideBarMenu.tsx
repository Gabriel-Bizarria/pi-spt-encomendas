import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { setActivePage } from "../redux/actions/navigationActions";
import MenuItems from "../types/MenuItems";

const SideBarMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const activePage = useSelector(
    (state: RootState) => state.navigation.activePage
  );

  return (
    <ul className="pt-20 px-6 space-y-9">
      {Object.values(MenuItems).map((item, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => dispatch(setActivePage(item))}
            className={getButtonClass(item, activePage)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SideBarMenu;

// Function to determine the button style
function getButtonClass(item: string, actualPage: string) {
  return item === actualPage
    ? "text-left text-base text-green-950 font-bold"
    : "text-left text-base text-green-950";
}
