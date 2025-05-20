import { OrderStatus } from "./OrderStatus";

export interface Order {
  orderNumber: string;
  customerName: string;
  description: string;
  orderValue: number;
  entryValue: number;
  remainingValue: number;
  dueDate: string;
  status: OrderStatus;
  orderDate: string;
  orderTypes: string[];
}
