import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertToast, AlertType } from "../utils/AlertToast";
import BaseDialog from "./BaseDialog";
import InputField from "./InputField";
import { useAppDispatch } from "../redux/hooks";
import { addOrder } from "../redux/slices/ordersSlice";
import { OrderStatus } from "../types/orders/OrderStatus";
import { Order } from "../types/orders/Order";
import { updateOrderMocked } from "../redux/thunks/ordersThunks";

interface OrderFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderToEdit?: Order;
}

export default function OrderFormDialog({
  isOpen,
  onClose,
  orderToEdit,
}: OrderFormDialogProps) {
  const dispatch = useAppDispatch();
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [orderValue, setOrderValue] = useState(0);
  const [entryValue, setEntryValue] = useState(0);
  const [remainingValue, setRemainingValue] = useState(0);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [dueTime, setDueTime] = useState<Date>(() => {
    const date = new Date();
    date.setHours(7, 0, 0, 0);
    return date;
  });
  const [selectedType, setSelectedType] = useState<string[]>(["cake"]);

  // Error states
  const [clientNameError, setClientNameError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);
  const [dueTimeError, setDueTimeError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [orderValueError, setOrderValueError] = useState(false);

  // Time validation constants
  const EARLIEST_HOUR = 7; // 7 AM
  const LATEST_HOUR = 22; // 10 PM

  // Update form state when dialog is opened with order data
  useEffect(() => {
    if (isOpen && orderToEdit) {
      setClientName(orderToEdit.customerName);
      setDescription(orderToEdit.description);
      setOrderValue(orderToEdit.orderValue);
      setEntryValue(orderToEdit.entryValue);
      setRemainingValue(orderToEdit.remainingValue);
      const dueDateObj = new Date(orderToEdit.dueDate);
      setDueDate(dueDateObj);
      // Set time from the stored date
      const timeDate = new Date();
      timeDate.setHours(dueDateObj.getHours(), dueDateObj.getMinutes(), 0, 0);
      setDueTime(timeDate);
      setSelectedType(orderToEdit.orderTypes);
    } else if (!isOpen) {
      // Reset form state when dialog is closed
      setClientName("");
      setDescription("");
      setOrderValue(0);
      setEntryValue(0);
      setRemainingValue(0);
      setDueDate(new Date());
      const defaultTime = new Date();
      defaultTime.setHours(7, 0, 0, 0);
      setDueTime(defaultTime);
      setSelectedType(["cake"]);
    }
  }, [isOpen, orderToEdit]);

  // Text for error messages
  const ERROR_MESSAGES = {
    clientName: "Nome do cliente é obrigatório",
    dueDate: "A data de entrega deve ser pelo menos um dia após a data atual",
    dueTime: "O horário deve estar entre 07:00 e 22:00",
    type: "Selecione pelo menos um tipo de produto",
    description: "A descrição deve ter pelo menos 20 caracteres",
    orderValue: "O valor do pedido deve ser maior que zero",
    maxValue: "O valor máximo permitido é R$ 9.999,00",
    remainingValue:
      "O valor de entrada não pode ser maior que o valor do pedido",
  };

  const MAX_VALUE = 9999;

  const handleClientNameChange = (
    text: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientNameError(false);
    setClientName(text.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionError(false);
    setDescription(e.target.value.slice(0, 400));
  };

  const handleOrderValueChange = (e: {
    target: { value: number | string };
  }) => {
    setOrderValueError(false);
    const newValue = Number(e.target.value);
    if (newValue > MAX_VALUE) {
      AlertToast(ERROR_MESSAGES.maxValue, AlertType.Error);
      return;
    }
    setOrderValue(newValue);
  };

  const handleEntryValueChange = (e: {
    target: { value: number | string };
  }) => {
    const newValue = Number(e.target.value);
    if (newValue > MAX_VALUE) {
      AlertToast(ERROR_MESSAGES.maxValue, AlertType.Error);
      return;
    }
    setEntryValue(newValue);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDueDateError(false);
      setDueDate(date);
    }
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      const hours = time.getHours();
      if (hours < EARLIEST_HOUR || hours > LATEST_HOUR) {
        setDueTimeError(true);
        AlertToast(ERROR_MESSAGES.dueTime, AlertType.Error);
        return;
      }
      setDueTimeError(false);
      setDueTime(time);
    }
  };

  const toggleItem = (item: string) => {
    setTypeError(false);
    if (selectedType.includes(item)) {
      setSelectedType(selectedType.filter((type) => type !== item));
    } else {
      setSelectedType([...selectedType, item]);
    }
  };

  useEffect(() => {
    const remainingValue = orderValue - entryValue;
    setRemainingValue(remainingValue);
  }, [orderValue, entryValue]);

  const charactersLeft = 400 - description.length;

  const handleSave = () => {
    // Reset all error states
    setClientNameError(false);
    setDueDateError(false);
    setDueTimeError(false);
    setTypeError(false);
    setDescriptionError(false);
    setOrderValueError(false);

    let hasError = false;

    // Client name validation
    if (!clientName.trim()) {
      setClientNameError(true);
      hasError = true;
    }

    // Due date validation - must be at least one day ahead
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    if (dueDate < tomorrow) {
      setDueDateError(true);
      hasError = true;
    }

    // Due time validation
    const hours = dueTime.getHours();
    if (hours < EARLIEST_HOUR || hours > LATEST_HOUR) {
      setDueTimeError(true);
      hasError = true;
    }

    // Order type validation
    if (selectedType.length === 0) {
      setTypeError(true);
      hasError = true;
    }

    // Description validation
    if (description.trim().length < 20) {
      setDescriptionError(true);
      hasError = true;
    }

    // Order value validation
    if (orderValue <= 0) {
      setOrderValueError(true);
      hasError = true;
    }

    // Remaining value validation
    if (remainingValue < 0) {
      AlertToast(ERROR_MESSAGES.remainingValue, AlertType.Error);
      return;
    }

    if (hasError) {
      AlertToast(
        "Por favor, corrija os campos destacados em vermelho",
        AlertType.Error
      );
      return;
    }

    // Create a combined date time
    const combinedDueDate = new Date(dueDate);
    combinedDueDate.setHours(dueTime.getHours(), dueTime.getMinutes(), 0, 0);

    const orderData = {
      orderNumber:
        orderToEdit?.orderNumber ||
        Math.floor(10000 + Math.random() * 90000).toString(),
      customerName: clientName,
      description: description,
      orderValue: orderValue,
      entryValue: entryValue,
      remainingValue: remainingValue,
      dueDate: combinedDueDate.toISOString(),
      status: orderToEdit?.status || OrderStatus.Pending,
      orderDate:
        orderToEdit?.orderDate || new Date().toLocaleDateString("pt-BR"),
      orderTypes: selectedType,
    };

    if (orderToEdit) {
      dispatch(updateOrderMocked(orderData));
      AlertToast("Pedido atualizado com sucesso!", AlertType.Success);
    } else {
      dispatch(addOrder(orderData));
      AlertToast("Pedido criado com sucesso!", AlertType.Success);
    }
    onClose();
  };

  // Create date objects for min/max time
  const minTime = new Date();
  minTime.setHours(EARLIEST_HOUR, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(LATEST_HOUR, 0, 0, 0);

  return (
    <BaseDialog isOpen={isOpen} className="w-full">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-6">
          {orderToEdit ? "Editar Pedido" : "Novo Pedido"}
        </h1>

        <div className="space-y-6 flex-grow">
          <div className="flex gap-4 w-full">
            <div className="flex-[4]">
              <label className="block text-sm font-medium mb-1">
                Nome do cliente*
              </label>
              <InputField
                type="text"
                value={clientName}
                onChange={handleClientNameChange}
                className="w-full p-3"
                placeholder="Nome completo"
                label="Nome do cliente"
                labelTop={false}
                error={clientNameError}
                errorMessage={
                  clientNameError ? ERROR_MESSAGES.clientName : undefined
                }
              />
            </div>

            <div className="flex-[2]">
              <label className="block text-sm font-medium mb-1">
                Data da entrega*
              </label>
              <div className="flex flex-col">
                <DatePicker
                  selected={dueDate}
                  onChange={handleDateChange}
                  className={`w-full p-3 border rounded ${
                    dueDateError ? "border-red-500" : "border-gray-300"
                  }`}
                  dateFormat="dd/MM/yyyy"
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                  }
                />
                {dueDateError && (
                  <p className="text-red-500 text-sm mt-1">
                    {ERROR_MESSAGES.dueDate}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-[2]">
              <label className="block text-sm font-medium mb-1">
                Horário da entrega*
              </label>
              <div className="flex flex-col">
                <DatePicker
                  selected={dueTime}
                  onChange={handleTimeChange}
                  className={`w-full p-3 border rounded ${
                    dueTimeError ? "border-red-500" : "border-gray-300"
                  }`}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Horário"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  minTime={minTime}
                  maxTime={maxTime}
                />
                {dueTimeError && (
                  <p className="text-red-500 text-sm mt-1">
                    {ERROR_MESSAGES.dueTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={`flex space-x-4 ${
                typeError ? "border border-red-500 p-2 rounded" : ""
              }`}
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedType.includes("cake")}
                  onChange={() => toggleItem("cake")}
                  className={`${
                    typeError ? "border-red-500" : ""
                  } text-green-900`}
                />
                <span>Bolo(s)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedType.includes("snack")}
                  onChange={() => toggleItem("snack")}
                  className={`${
                    typeError ? "border-red-500" : ""
                  } text-green-900`}
                />
                <span>Salgados</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedType.includes("other")}
                  onChange={() => toggleItem("other")}
                  className={`${
                    typeError ? "border-red-500" : ""
                  } text-green-900`}
                />
                <span>Outros</span>
              </label>
            </div>
            {typeError && (
              <p className="text-red-500 text-sm mt-1">{ERROR_MESSAGES.type}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Descrição do(s) bolo(s)*
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className={`w-full p-3 border rounded h-32 resize-none ${
                descriptionError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
              {charactersLeft} caracteres restantes
            </span>
            {descriptionError && (
              <p className="text-red-500 text-sm mt-1">
                {ERROR_MESSAGES.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor do pedido*
              </label>
              <InputField
                value={orderValue}
                label="Valor do pedido"
                labelTop={false}
                onChange={handleOrderValueChange}
                placeholder="0"
                type="number"
                max={MAX_VALUE}
                error={orderValueError}
                errorMessage={
                  orderValueError ? ERROR_MESSAGES.orderValue : undefined
                }
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor de entrada
              </label>
              <InputField
                value={entryValue}
                label="Valor de entrada"
                labelTop={false}
                type="number"
                onChange={handleEntryValueChange}
                placeholder="0"
                max={MAX_VALUE}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor restante
              </label>
              <InputField
                value={remainingValue}
                label="Valor restante"
                labelTop={false}
                disabled
                error={remainingValue < 0}
                errorMessage={
                  remainingValue < 0 ? ERROR_MESSAGES.remainingValue : undefined
                }
                type="number"
                placeholder="0"
                max={MAX_VALUE}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            Salvar pedido
          </button>
        </div>
      </div>
    </BaseDialog>
  );
}
