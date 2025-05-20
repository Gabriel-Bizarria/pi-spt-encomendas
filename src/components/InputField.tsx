import { InputFieldProps } from "../Props/InputFieldProps";

function InputField({
  labelTop,
  label,
  className = "",
  error = false,
  ...props
}: InputFieldProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.max && Number(e.target.value) > props.max) {
      return;
    }
    props.onChange?.(e);
  };
  return (
    <div className="w-full">
      {labelTop ? (
        <>
          <label className="block text-left mb-1 text-neutral-950">
            {label}
          </label>
          <input
            {...props}
            onChange={handleInput}
            className={`w-full p-3 border rounded ${
              error ? "border-red-500" : "border-gray-300"
            } ${className}`}
          />
        </>
      ) : (
        <input
          {...props}
          onChange={handleInput}
          placeholder={label}
          className={`w-full p-3 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
        />
      )}
      {error && props.errorMessage && (
        <p className="text-red-500 text-sm mt-1">{props.errorMessage}</p>
      )}
    </div>
  );
}

export default InputField;
