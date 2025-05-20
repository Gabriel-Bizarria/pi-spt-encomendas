enum DropdownFilterItem {
  PendingFirst = "Pendentes Primeiro",
  PendingOnly = "Somente Pendentes",
  CompletedOnly = "Somente Concluídos",
}

export default DropdownFilterItem;

export const dropdownFilterItemsList = [
  DropdownFilterItem.PendingFirst,
  DropdownFilterItem.PendingOnly,
  DropdownFilterItem.CompletedOnly,
];
