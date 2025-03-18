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

function Login() {
  return (
    <div className="bg-neutral-50 w-screen h-screen flex items-center justify-center">
      <div className="bg-neutral-300 rounded-lg flex flex-col items-center p-12 px-36 py-16">
        <img
          src="https://placehold.co/485x215"
          alt="Logo"
          className="w-[485px] h-[215px] mb-6"
        />
        <InputField label="Username" type="text" />
        <InputField label="Password" type="password" />
        <button className="w-[550px] h-[80px] p-3 bg-green-900 text-white rounded hover:bg-green-800 mt-16">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
