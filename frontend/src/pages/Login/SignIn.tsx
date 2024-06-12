import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const SignIn = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e : any) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    
            const { token } = response.data;
    
            login({ token, email });
        } catch (err) {
            setError('Erro na autenticação. Verifique suas credenciais.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F2F2F2]">
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-3 ">
                    <img src="elmenu-logo.png" className="h-[130px] mb-[2px]" />
                    <h1 className="text-7xl font-bold leading-tight tracking-tight text-[#47A789] self-end">El Menu</h1>
                </div>
                <div className="flex w-[450px] items-center justify-center px-6 py-8 bg-white rounded-xl shadow-lg border">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-between gap-8 px-4">
                        <div className="flex flex-col w-full gap-6">
                            <input 
                                type="email"  
                                className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" 
                                placeholder="Insira seu e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input 
                                type="password" 
                                className="bg-[#CED7D9] h-[44px] p-2 w-full text-xs rounded placeholder:text-[#404040] placeholder:text-sm" 
                                placeholder="Insira sua senha" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />    
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex flex-col w-full items-center gap-2">
                            <button type="submit" className="bg-[#47A789] h-[40px] w-[150px] font-semibold rounded-[10px] hover:bg-[#93D1BE] transition duration-300">Entrar</button>
                            <span className="text-[15px]">Ainda não possui uma conta? <a href="/register" className="text-[#47A789] font-bold">Cadastre-se</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
