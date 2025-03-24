import { InputFieldProps } from "../Props/InputFieldProps";

function InputField(props: InputFieldProps) {
  return (
    <div className="w-[550px] mb-4">
      {props.labelTop ? (
        <>
          <label className="block text-left mb-1 text-neutral-950">
            {props.label}
          </label>
          <input
            type={props.type}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </>
      ) : (
        <input
          type={props.type}
          placeholder={props.label}
          className="w-full p-3 border border-gray-300 rounded"
        />
      )}
    </div>
  );
}

export default InputField;
