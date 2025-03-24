import FullCalendar from "@fullcalendar/react";
import timegridPlugin from "@fullcalendar/timegrid";
import daygridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../index.css";
import colors from "tailwindcss/colors";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useState } from "react";

function CalendarPage() {
  const [todayText, setTodayText] = useState("Data atual");

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
    alert(`Event: ${clickInfo.event.title}\nStart: ${clickInfo.event.start}`);
    // You can add more logic here, such as navigating to a detailed page or opening a modal
  };

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
        events={[
          {
            title: "Pedido - André",
            start: "2025-03-21T20:00:00",
            backgroundColor: colors.green[600],
            borderColor: colors.green[600],
          },
          {
            title: "Pedido - Maria",
            start: "2025-03-21T22:30:00",
            backgroundColor: colors.blue[600],
            borderColor: colors.blue[600],
          },
        ]}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default CalendarPage;
