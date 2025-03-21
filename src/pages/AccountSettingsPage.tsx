import InputField from "../components/InputField";

function AccountSettingsPage() {
  return (
    <div className="flex justify-center p-16">
      <ul>
        <li>
          <h1 className="text-left text-xl text-neutral-950">
            Trocar senha de admnistrador
          </h1>
        </li>

        <li className="mt-3">
          <InputField label="Senha atual" type="password" />
        </li>

        <li className="mt-3">
          <InputField label="Nova senha" type="password" />
        </li>
        <li className="mt-3">
          <InputField label="Confirmar nova senha" type="password" />
        </li>
        <li className="mt-3">
          <div className="flex bg-neutral-300 rounded-lg px-3 py-6">
            <ul>
              <ul className="list-disc list-inside ps-2">
                <li className="text-left text-neutral-950">
                  A senha deve conter mais de 8 dígitos.
                </li>
                <li className="text-left text-neutral-950">
                  A senha deve conter pelo menos um número.
                </li>
                <li className="text-left text-neutral-950">
                  A senha deve conter pelo menos uma letra maiúscula.
                </li>
                <li className="text-left text-neutral-950">
                  A senha deve conter pelo menos um caractere especial.
                </li>
              </ul>
            </ul>
          </div>
        </li>

        <li className="mt-6">
          <button className="w-[550px] h-[80px] p-3 bg-green-900 text-white rounded-lg hover:bg-green-800">
            Confirmar troca de senha
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AccountSettingsPage;
