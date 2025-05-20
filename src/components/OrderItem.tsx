import { Order } from "../types/orders/Order";
import { OrderStatus } from "../types/orders/OrderStatus";

interface OrderItemProps {
  order: Order;
  onUpdate: (order: Order) => void;
  onEdit: (order: Order) => void;
  onView: (order: Order) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  onUpdate,
  onEdit,
  onView,
}) => {
  const handleItemClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      onView(order);
    }
  };
  const isDisabled = order.status === OrderStatus.Completed;

  return (
    <div
      className="flex justify-between rounded-lg bg-neutral-200 pl-[24px] pr-[24px] pt-[15px] pb-[15px] my-2 cursor-pointer hover:bg-neutral-300"
      onClick={handleItemClick}
    >
      {" "}
      <p className="flex flex-1 text-center items-center justify-center font-semibold">
        {order.orderNumber}
      </p>
      <p className="flex flex-[2] text-center items-center justify-center">
        {order.customerName}
      </p>
      <div className="flex flex-1 items-center justify-center">
        <span className={getStatusCircleColor(order.status)}></span>
        <p className="text-neutral-950">{order.status}</p>
      </div>
      <p className="flex flex-1 justify-center text-center items-center">
        {order.orderDate}
      </p>{" "}
      <button
        className={`flex-1 items-center rounded-lg text-neutral-50 p-0 mx-6 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-950 hover:bg-green-900"
        }`}
        onClick={() => onEdit(order)}
        disabled={isDisabled}
      >
        <p>Editar pedido</p>
      </button>
      <button
        type="button"
        onClick={() => {
          const userConfirmed = window.confirm(
            "Tem certeza que quer marcar como entregue?"
          );

          if (userConfirmed) onUpdate(order);
        }}
        className={`bg-red-600 text-neutral-50 p-3 mx-6 rounded-lg ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDisabled}
      >
        Entregar pedido
      </button>
    </div>
  );
};

function getStatusCircleColor(orderStatus: OrderStatus): string {
  let style = "w-[12px] h-[12px] rounded-full mr-2";
  style +=
    orderStatus === OrderStatus.Pending ? " bg-orange-600" : " bg-green-600";
  return style;
}

export default OrderItem;
