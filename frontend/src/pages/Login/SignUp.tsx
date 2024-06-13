import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');
  const [isAccountCreated, setIsAccountCreated] = useState(false); // Estado para controlar se a conta foi criada com sucesso

  const handleEmailChange = (e:any) => {
    const inputValue = e.target.value;
    // Máscara para o campo de e-mail
    const maskedEmail = inputValue.replace(/\s/g, "").toLowerCase();
    setEmail(maskedEmail);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Validar os campos
    if (!name || !lastName || !email || !password || !verifyPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== verifyPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Validar a senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      setError('A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    // Validar o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setError('O email inserido é inválido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: name,
          lastName: lastName,
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || 'Ocorreu um erro ao processar sua solicitação.');
        return;
      }

      // Resetar os campos e erros em caso de sucesso
      setName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setVerifyPassword('');
      setError('');
      
      // Definir o estado de conta criada como true
      setIsAccountCreated(true);
    } catch (error) {
      setError('Ocorreu um erro ao processar sua solicitação.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2F2F2]">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3 ">
          <img src="elmenu-logo.png" className="h-[130px] mb-[2px]" alt="El Menu Logo" />
          <h1 className="text-7xl font-bold leading-tight tracking-normal text-[#47A789] self-end uppercase">El Menu</h1>
        </div>
        <div className="flex w-[450px] items-center justify-center px-6 py-8 bg-white rounded-xl shadow-lg border">
          <form onSubmit={handleSubmit} className="flex flex-col w-full items-center gap-8 px-4">
            <div className="flex flex-col w-full gap-6">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" placeholder="Nome" required />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" placeholder="Sobrenome" required/>
              <input type="email" value={email} onChange={handleEmailChange} className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" placeholder="Insira um e-mail" required/>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" placeholder="Insira uma senha" required/>
              <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" placeholder="Confirme a senha" required/>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {isAccountCreated && <p className="text-green-500 font-semibold">Conta criada com sucesso!</p>}
            <div className="flex flex-col w-full items-center gap-2">
              <button type="submit" className="bg-[#47A789] h-[40px] w-[150px] font-semibold rounded-[10px] hover:bg-[#93D1BE] transition duration-300">Cadastrar</button>
              <span className="text-[15px]">Já possui uma conta? <a href="/login" className="text-[#47A789] font-bold">Entrar</a></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
