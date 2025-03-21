function InputField({ label, type }: { label: string; type: string }) {
  return (
    <div className="w-[550px] mb-4">
      <label className="block text-left mb-1 text-neutral-950">{label}</label>
      <input
        type={type}
        className="w-full p-3 border border-gray-300 rounded"
      />
    </div>
  );
}

export default InputField;
