import { useEffect, useState } from "react";
import { Dropdown } from "../components/Dropdown";
import InputField from "../components/InputField";
import FloatingButton from "../components/FloatingButton";
import OrderFormDialog from "../components/OrderFormDialog";
import OrderSummaryDialog from "../components/OrderSummaryDialog";
import { LoadingCircle } from "../components/LoadingCircle";
import DropdownFilterItem, {
  dropdownFilterItemsList,
} from "../types/DropdownFilter";
import { RootState } from "../redux/store";
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
import { OrderStatus } from "../types/orders/OrderStatus";

function OrdersListPage() {
  const [selectedFilter, setSelectedFilter] = useState<DropdownFilterItem>(
    DropdownFilterItem.PendingFirst
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const orders = useAppSelector(selectOrders);
  const isLoading = useAppSelector((state: RootState) => state.orders.loading);
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

  const handleAddOrder = () => {
    setOrderToEdit(undefined);
    setIsOrderDialogOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setOrderToEdit(order);
    setIsOrderDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setOrderToEdit(undefined);
    setIsOrderDialogOpen(false);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsSummaryDialogOpen(true);
  };

  const handleCloseSummary = () => {
    setSelectedOrder(null);
    setIsSummaryDialogOpen(false);
  };

  // Add filteredOrders function
  const getFilteredOrders = () => {
    // First filter by status
    let filteredByStatus = orders;

    switch (selectedFilter) {
      case DropdownFilterItem.PendingOnly:
        filteredByStatus = orders.filter(
          (order) => order.status === OrderStatus.Pending
        );
        break;
      case DropdownFilterItem.CompletedOnly:
        filteredByStatus = orders.filter(
          (order) => order.status === OrderStatus.Completed
        );
        break;
      case DropdownFilterItem.PendingFirst:
      default:
        filteredByStatus = [...orders].sort((a, b) => {
          if (
            a.status === OrderStatus.Pending &&
            b.status === OrderStatus.Completed
          )
            return -1;
          if (
            a.status === OrderStatus.Completed &&
            b.status === OrderStatus.Pending
          )
            return 1;
          return 0;
        });
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      return filteredByStatus.filter((order) =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredByStatus;
  };
  return (
    <div className="h-full w-full p-8">
      <div className="flex justify-between gap-8">
        <InputField
          labelTop={false}
          label="Nome do cliente"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Dropdown
          items={dropdownFilterItemsList}
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </div>{" "}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingCircle />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-full h-full text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-500">
              Clique no botão + para adicionar um novo pedido.
            </p>
          </div>
        ) : (
          getFilteredOrders().map((order) => (
            <OrderItem
              key={order.orderNumber}
              order={order}
              onUpdate={closeOrder}
              onEdit={handleEditOrder}
              onView={handleViewOrder}
            />
          ))
        )}
      </div>
      <FloatingButton onClick={handleAddOrder} />{" "}
      <OrderFormDialog
        isOpen={isOrderDialogOpen}
        onClose={handleCloseDialog}
        orderToEdit={orderToEdit}
      />
      <OrderSummaryDialog
        isOpen={isSummaryDialogOpen}
        onClose={handleCloseSummary}
        order={selectedOrder}
      />
      <ToastContainer />
    </div>
  );
}

export default OrdersListPage;
