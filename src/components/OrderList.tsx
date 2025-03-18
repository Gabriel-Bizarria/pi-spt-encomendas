import OrderItemProps from "../utils/OrderItemProps";
import OrderItem from "./OrderItem";
function OrderList(props: { orders: OrderItemProps[] }) {
  return (
    <>
      {props.orders.map((order) => (
        <div style={{ marginBottom: "8px" }} key={order.orderNumber}>
          <OrderItem
            orderNumber={order.orderNumber}
            customerName={order.customerName}
            orderStatus={order.orderStatus}
            orderDate={order.orderDate}
          />
        </div>
      ))}
    </>
  );
}

export default OrderList;
