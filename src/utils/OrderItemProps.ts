import OrderStatus from "../types/OrderStatus";

interface OrderItemProps {
  orderNumber: string;
  customerName: string;
  orderStatus: OrderStatus;
  orderDate: string;
}

export default OrderItemProps;
