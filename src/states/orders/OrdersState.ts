import { Order } from "../../types/orders/Order";

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}
