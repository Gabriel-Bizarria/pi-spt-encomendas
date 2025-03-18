import OrderList from "./components/OrderList";
import OrderStatus from "./types/OrderStatus";

function App() {
  return OrderList({
    orders: [
      {
        orderNumber: "1233290",
        customerName: "Jéssica da Silva",
        orderStatus: OrderStatus.Pending,
        orderDate: "20/01/2022",
      },
      {
        orderNumber: "4563232",
        customerName: "João da Silva",
        orderStatus: OrderStatus.Completed,
        orderDate: "20/01/2022",
      },
    ],
  });
}

export default App;
