import React, { useState } from "react";
import SideBarMenu from "../components/SideBarMenu";
import HeaderBar from "../components/HeaderBar";
import AccountSettingsPage from "./AccountSettingsPage";
import CalendarPage from "./CalendarPage";
import OrdersListPage from "./OrderListPage";
import MenuItems from "../types/MenuItems";

function DashboardPage() {
  const [activePage, setActivePage] = useState(MenuItems.CALENDAR);

  const renderPage = () => {
    switch (activePage) {
      case MenuItems.CALENDAR:
        return <CalendarPage />;
      case MenuItems.ORDER_HISTORY:
        return <OrdersListPage />;
      case MenuItems.ACCOUNT_SETTINGS:
        return <AccountSettingsPage />;
      default:
        return <CalendarPage />;
    }
  };

  return (
    <div className="grid h-screen grid-cols-[280px_1fr] grid-rows-[60px_1fr]">
      {/* Sidebar */}
      <div className="row-span-2 col-start-1 bg-neutral-300">
        <SideBarMenu onMenuItemClick={setActivePage} actualPage={activePage} />
      </div>
      {/* Top app bar */}
      <div className="row-start-1 col-start-2 bg-green-950">
        <HeaderBar />
      </div>
      {/* Main content */}
      <div className="row-start-2 col-start-2 bg-neutral-50">
        {renderPage()}
      </div>
    </div>
  );
}

export default DashboardPage;
