import { Order } from "../types/orders/Order";
import { OrderStatus } from "../types/orders/OrderStatus";

interface OrderItemProps {
  order: Order;
  onUpdate: (order: Order) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onUpdate }) => {
  const isDisabled = order.status === OrderStatus.Completed;

  return (
    <div className="flex justify-between rounded-lg bg-neutral-200 pl-[24px] pr-[24px] pt-[15px] pb-[15px] my-2">
      <p className="flex flex-1 text-center items-center justify-center font-semibold">
        {order.orderNumber}
      </p>

      <div className="flex flex-1 items-center justify-center">
        <span className={getStatusCircleColor(order.status)}></span>
        <p className="text-neutral-950">{order.status}</p>
      </div>

      <p className="flex flex-1 text-center items-center justify-center">
        {order.status}
      </p>

      <p className="flex flex-1 justify-center text-center items-center">
        {order.orderDate}
      </p>

      <button className="flex-1 items-center rounded-lg bg-green-950 text-neutral-50 p-0 mx-6">
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
