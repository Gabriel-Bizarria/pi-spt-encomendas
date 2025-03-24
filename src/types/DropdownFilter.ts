enum DropdownFilterItem {
  PendingFirst = "Pendentes Primeiro",
  CompletedFirst = "Concluídos Primeiro",
  PendingOnly = "Somente Pendentes",
  CompletedOnly = "Somente Concluídos",
}

export default DropdownFilterItem;

export const dropdownFilterItemsList = [
  DropdownFilterItem.PendingFirst,
  DropdownFilterItem.CompletedFirst,
  DropdownFilterItem.PendingOnly,
  DropdownFilterItem.CompletedOnly,
];
