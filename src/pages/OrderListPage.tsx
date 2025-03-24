import { useEffect, useState } from "react";
import { Dropdown } from "../components/Dropdown";
import InputField from "../components/InputField";
import DropdownFilterItem, {
  dropdownFilterItemsList,
} from "../types/DropdownFilter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchOrdersMocked,
  updateOrderMocked,
} from "../redux/thunks/ordersThunks";
import { ToastContainer } from "react-toastify";
import { selectOrders } from "../redux/selectors/ordersSelectors";
import { Order } from "../types/orders/Order";
import OrderItem from "../components/OrderItem";
import { AlertToast, AlertType } from "../utils/AlertToast";

function OrdersListPage() {
  const [selectedFilter, setSelectedFilter] = useState<DropdownFilterItem>(
    DropdownFilterItem.PendingFirst
  );
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  const notify = (message: string, type: AlertType) =>
    AlertToast(message, type);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrdersMocked());
    }
  }, [dispatch, orders.length]);

  const closeOrder = async (order: Order) => {
    try {
      await dispatch(updateOrderMocked(order)).unwrap();
      notify("O pedido foi fechado com sucesso!", AlertType.Success);
    } catch {
      notify(
        "Ocorreu um erro no fechamento do pedido. Tente novamente.",
        AlertType.Error
      );
    }
  };

  return (
    <div className="h-full w-full p-8">
      <div className="flex justify-between">
        <InputField
          labelTop={false}
          label="Nome do cliente ou pedido"
          type="text"
        />

        <Dropdown
          items={dropdownFilterItemsList}
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </div>
      <div>
        {orders.map((order) => (
          <OrderItem
            key={order.orderNumber}
            order={order}
            onUpdate={closeOrder}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
export default OrdersListPage;
