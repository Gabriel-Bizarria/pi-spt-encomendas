import DropdownProps from "../Props/DropdownProps";

export function Dropdown(props: DropdownProps) {
  return (
    <select className="border border-neutral-200 rounded-lg h-7 ">
      {props.items.map((item) => (
        <option key={item} selected={item === props.selected}>
          {item}
        </option>
      ))}
    </select>
  );
}
