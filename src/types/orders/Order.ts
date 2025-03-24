import { OrderStatus } from "./OrderStatus";

export interface Order {
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  orderDate: string;
}
