import FullCalendar from "@fullcalendar/react";
import timegridPlugin from "@fullcalendar/timegrid";
import daygridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../index.css";
import "../styles/calendar.css";
import colors from "tailwindcss/colors";
import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import OrderSummaryDialog from "../components/OrderSummaryDialog";
import { AlertToast, AlertType } from "../utils/AlertToast";
import { useAppDispatch } from "../redux/hooks";
import { updateOrderMocked } from "../redux/thunks/ordersThunks";
import { useState } from "react";
import FloatingButton from "../components/FloatingButton";
import OrderFormDialog from "../components/OrderFormDialog";
import { useAppSelector } from "../redux/hooks";
import { Order } from "../types/orders/Order";
import { OrderStatus } from "../types/orders/OrderStatus";

function CalendarPage() {
  const [todayText, setTodayText] = useState("Data atual");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();

  // Get orders from Redux store
  const orders = useAppSelector((state) => state.orders.orders);

  const handleDatesSet = (arg: { view: { type: string } }) => {
    switch (arg.view.type) {
      case "timeGridDay":
        setTodayText("Hoje");
        break;
      case "timeGridWeek":
        setTodayText("Semana atual");
        break;
      case "dayGridMonth":
        setTodayText("Mês atual");
        break;
      default:
        setTodayText("Hoje");
    }
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    const target = clickInfo.jsEvent.target as HTMLElement;
    const order = orders.find(
      (order) => order.orderNumber === clickInfo.event.id
    );

    if (!order) return;

    // Find the closest button element to handle clicks on SVG and path elements
    const buttonElement = target.closest("button");
    if (buttonElement) {
      // If clicked on edit button
      if (buttonElement.classList.contains("edit-button")) {
        setSelectedOrder(order);
        setIsDialogOpen(true);
        return;
      }

      // If clicked on deliver button
      if (buttonElement.classList.contains("deliver-button")) {
        const userConfirmed = window.confirm(
          "Tem certeza que quer marcar como entregue?"
        );
        if (userConfirmed) {
          dispatch(updateOrderMocked(order))
            .unwrap()
            .then(() => {
              AlertToast(
                "Pedido marcado como entregue com sucesso!",
                AlertType.Success
              );
            })
            .catch(() => {
              AlertToast(
                "Ocorreu um erro ao marcar o pedido como entregue.",
                AlertType.Error
              );
            });
        }
        return;
      }
    }

    // If clicked anywhere else on the event
    setSelectedOrder(order);
    setIsSummaryDialogOpen(true);
  };
  const handleAddOrder = () => {
    setSelectedOrder(undefined);
    setIsDialogOpen(true);
  };

  const handleCloseSummary = () => {
    setSelectedOrder(undefined);
    setIsSummaryDialogOpen(false);
  };
  const renderEventContent = (eventInfo: EventContentArg) => {
    const order = orders.find((o) => o.orderNumber === eventInfo.event.id);
    if (!order) return null;

    const truncatedDescription =
      order.description.substring(0, 30) +
      (order.description.length > 30 ? "..." : "");

    return (
      <>
        <div className="event-title">
          {order.customerName} - {truncatedDescription}
        </div>
        {order.status === OrderStatus.Pending && (
          <div className="event-buttons">
            <button className="edit-button" title="Editar pedido">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button className="deliver-button" title="Marcar como entregue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  };

  // Convert orders to calendar events
  const calendarEvents = orders.map((order) => ({
    id: order.orderNumber,
    start: order.dueDate,
    backgroundColor:
      order.status === OrderStatus.Pending
        ? colors.orange[500]
        : colors.green[500],
    borderColor:
      order.status === OrderStatus.Pending
        ? colors.orange[500]
        : colors.green[500],
  }));

  return (
    <div className="h-full w-full p-9">
      <FullCalendar
        plugins={[timegridPlugin, daygridPlugin]}
        initialView="timeGridDay"
        height="100%"
        locale={ptBrLocale}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="23:59:00"
        nowIndicator={true}
        datesSet={handleDatesSet}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        buttonText={{
          today: todayText,
        }}
        displayEventTime={true}
        eventDisplay="block"
        dayHeaderContent={(args) => {
          const customDayNames = [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
          ];
          const dayName = customDayNames[args.date.getDay()];
          const dayNumber = args.date.getDate();
          return `${dayName}, ${dayNumber}`;
        }}
        events={calendarEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      <FloatingButton onClick={handleAddOrder} />{" "}
      <OrderFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedOrder(undefined);
        }}
        orderToEdit={selectedOrder}
      />
      <OrderSummaryDialog
        isOpen={isSummaryDialogOpen}
        onClose={handleCloseSummary}
        order={selectedOrder || null}
      />
    </div>
  );
}

export default CalendarPage;
