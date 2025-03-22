import MenuItems from "../types/MenuItems";

function SideBarMenu({
  onMenuItemClick,
  actualPage,
}: {
  onMenuItemClick: (menuItem: MenuItems) => void;
  actualPage: string;
}) {
  return (
    <ul className="pt-20 px-6 space-y-9">
      {Object.values(MenuItems).map((item, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => onMenuItemClick(item)}
            className={getButtonClass(item, actualPage)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SideBarMenu;

function getButtonClass(item: string, actualPage: string) {
  return item == actualPage
    ? "text-left text-base text-green-950 font-bold"
    : "text-left text-base text-green-950";
}
