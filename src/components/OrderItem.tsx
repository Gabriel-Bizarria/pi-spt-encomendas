import OrderStatus from "../types/OrderStatus";
import OrderItemProps from "../utils/OrderItemProps";

function OrderItem(props: OrderItemProps) {
  return (
    <div className="flex justify-between bg-neutral-200 pl-[24px] pr-[24px] pt-[15px] pb-[15px]">
      <p className="text-center">{props.orderNumber}</p>
      <p
        className={`${getStatusTextColor(
          props.orderStatus
        )} flex-1 text-center`}
      >
        {props.orderStatus}
      </p>
      <p className="flex-1 text-center">{props.customerName}</p>
      <p className="text-center">{props.orderDate}</p>
    </div>
  );
}

function getStatusTextColor(orderStatus: OrderStatus): string {
  return orderStatus === OrderStatus.Pending
    ? "text-red-400"
    : "text-green-600";
}

export default OrderItem;
