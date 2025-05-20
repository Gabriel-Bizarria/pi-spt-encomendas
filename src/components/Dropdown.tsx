import DropdownProps from "../Props/DropdownProps";
import DropdownFilterItem from "../types/DropdownFilter";

export function Dropdown(props: DropdownProps) {
  return (
    <select
      value={props.selected}
      onChange={(e) => props.onSelect(e.target.value as DropdownFilterItem)}
      className="border border-neutral-200 rounded-lg px-4 h-[46px] min-w-[200px]"
    >
      {props.items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
