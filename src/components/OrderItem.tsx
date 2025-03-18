import OrderStatus from "../types/OrderStatus";
import OrderItemProps from "../utils/OrderItemProps";

function OrderItem(props: OrderItemProps) {
  const statusTextColor =
    props.orderStatus === OrderStatus.Pending
      ? "text-red-400"
      : "text-green-600";

  return (
    <div className="flex justify-between bg-neutral-200 pl-[24px] pr-[24px] pt-[15px] pb-[15px]">
      <p>{props.orderNumber}</p>
      <p className={`${statusTextColor}`}>{props.orderStatus}</p>
      <p>{props.customerName}</p>
      <p>{props.orderDate}</p>
    </div>
  );
}

export default OrderItem;
