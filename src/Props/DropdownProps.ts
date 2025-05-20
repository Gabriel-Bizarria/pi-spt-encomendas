import DropdownFilterItem from "../types/DropdownFilter";

export default interface DropdownProps {
  items: DropdownFilterItem[];
  selected: DropdownFilterItem;
  onSelect: (item: DropdownFilterItem) => void;
}
