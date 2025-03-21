import InputField from "../components/InputField";

function LoginPage() {
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

export default LoginPage;
