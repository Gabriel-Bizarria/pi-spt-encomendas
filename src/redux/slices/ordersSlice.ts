import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Import the RootState type
import { Order } from "../../types/orders/Order";
import { OrdersState } from "../../states/orders/OrdersState";
import {
  fetchOrders,
  fetchOrdersMocked,
  updateOrder,
  updateOrderMocked,
} from "../thunks/ordersThunks";

// Define the state structure

// Initial state
const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order: Order) => order.orderNumber !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load orders";
      })
      .addCase(fetchOrdersMocked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersMocked.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersMocked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load orders";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order: Order) => order.orderNumber === action.payload.orderNumber
        );
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrderMocked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderMocked.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

// Export actions and reducer
export const { addOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
