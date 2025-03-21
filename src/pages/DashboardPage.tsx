import React, { useState } from "react";
import SideBarMenu from "../components/SideBarMenu";
import HeaderBar from "../components/HeaderBar";
import AccountSettingsPage from "./AccountSettingsPage";
import CalendarPage from "./CalendarPage";
import OrdersListPage from "./OrderListPage";

function DashboardPage() {
  const [activePage, setActivePage] = useState("Calendário");

  const renderPage = () => {
    switch (activePage) {
      case "Calendário":
        return <CalendarPage />;
      case "Histórico de encomendas":
        return <OrdersListPage />;
      case "Configurações de conta":
        return <AccountSettingsPage />;
      default:
        return <CalendarPage />;
    }
  };

  return (
    <div className="grid h-screen grid-cols-[280px_1fr] grid-rows-[60px_1fr]">
      {/* Sidebar */}
      <div className="row-span-2 col-start-1 bg-neutral-300">
        <SideBarMenu onMenuItemClick={setActivePage} />
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
