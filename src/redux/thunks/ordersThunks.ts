import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { Order } from "../../types/orders/Order";
import { OrderStatus } from "../../types/orders/OrderStatus";

// TODO: check if this will be the implementations for calls
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("/api/orders"); // Replace with your actual API
  if (!response.ok) throw new Error("Failed to fetch orders");
  return (await response.json()) as Order[];
});

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (order: Order) => {
    const response = await fetch(`/api/orders/${order.orderNumber}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.orderNumber }),
    });
    if (!response.ok) throw new Error("Failed to update order");
    return (await response.json()) as Order;
  }
);

// Mocked thunks
export const fetchOrdersMocked = createAsyncThunk(
  "orders/fetchOrdersMocked",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        orderNumber: "10000",
        customerName: "André José",
        status: OrderStatus.Pending,
        orderDate: "21/05/2025",
      },
      {
        orderNumber: "10002",
        customerName: "André José",
        status: OrderStatus.Completed,
        orderDate: "21/05/2025",
      },
    ] as Order[];
  }
);

export const updateOrderMocked = createAsyncThunk(
  "orders/updateOrderMocked",
  async (order: Order) => {
    await new Promise((resolve) => setTimeout(resolve, 1000000));
    console.log(`${order} should be updated now.`);
    return { success: true };
  }
);
