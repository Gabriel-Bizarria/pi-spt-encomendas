import OrderItem from "./components/OrderItem";
import OrderStatus from "./types/OrderStatus";

function App() {
  return (
    <OrderItem
      orderNumber="00111"
      customerName="Fulano de Tal"
      orderStatus={OrderStatus.Completed}
      orderDate="20/10/2025"
    />
  );
}

export default App;
