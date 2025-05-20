import BaseDialog from "./BaseDialog";
import { Order } from "../types/orders/Order";

interface OrderSummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderSummaryDialog({
  isOpen,
  onClose,
  order,
}: OrderSummaryDialogProps) {
  if (!order) return null;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <BaseDialog isOpen={isOpen} className="w-[500px]">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detalhes do Pedido</h1>
          <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">
            {order.status}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Número do Pedido
            </h2>
            <p className="text-lg">{order.orderNumber}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">Cliente</h2>
            <p className="text-lg">{order.customerName}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Data do Pedido
            </h2>
            <p className="text-lg">{order.orderDate}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Data de Entrega
            </h2>
            <p className="text-lg">
              {new Date(order.dueDate).toLocaleString("pt-BR")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">
              Tipos de Produto
            </h2>
            <div className="flex gap-2 mt-1">
              {order.orderTypes.map((type) => (
                <span
                  key={type}
                  className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {type === "cake"
                    ? "Bolo"
                    : type === "snack"
                    ? "Salgado"
                    : "Outro"}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">Descrição</h2>
            <p className="text-lg">{order.description}</p>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-500">
                  Valor Total
                </h2>
                <p className="text-lg text-green-700">
                  {formatCurrency(order.orderValue)}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Entrada</h2>
                <p className="text-lg">{formatCurrency(order.entryValue)}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">
                  Restante
                </h2>
                <p className="text-lg">
                  {formatCurrency(order.remainingValue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </BaseDialog>
  );
}
