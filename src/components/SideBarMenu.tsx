function SideBarMenu({
  onMenuItemClick,
}: {
  onMenuItemClick: (menuItem: string) => void;
}) {
  const menuItems = [
    "Calendário",
    "Histórico de encomendas",
    "Configurações de conta",
  ];

  return (
    <ul className="pt-20 px-6 space-y-9">
      {menuItems.map((item, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => onMenuItemClick(item)}
            className="text-left text-base text-green-950"
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SideBarMenu;
