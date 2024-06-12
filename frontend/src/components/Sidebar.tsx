import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import IconeCadastro from '../assets/cadastro-item.svg';
import HomeIcone from '../assets/home-icone.svg';
import LogoutIcone from '../assets/logout-icone.svg';
import SearchBar from './SearchBar';

export default function Sidebar() {
    const { logout } = useAuth();

    const links = [
        {
          name: "Início",
          icon: HomeIcone,
          link: "/home",
        },
        {
          name: "Cadastro",
          icon: IconeCadastro,
          link: "/cadastro",
        },
    ];

    const handleLogout = () => {
      if (window.confirm("Tem certeza que deseja sair?")){
        logout();
      }
      else return null;
    };

    return (
        <div className="flex lg:flex-col h-16 w-screen lg:h-screen lg:min-w-[15rem] lg:max-w-[15rem] top-0 bg-[#47A789] justify-between items-center lg:py-6">   
          <div className="flex items-center justify-center px-5 lg:px-0">
            <img src="elmenu-logo.png" className="w-[70px] lg:w-[150px] " />
          </div>
          <div className='lg:basis-1/2 flex lg:flex-col lg:justify-start items-center lg:my-16 lg:w-full lg:px-8 gap-4 lg:gap-8 '>
              {links.map((link) => {
                const isActive = location.pathname === link.link;
                return (
                    <Link to={link.link} key={link.name} className={`flex lg:w-full justify-center lg:justify-start items-center lg:py-2 transition ease-in-out gap-3 px-3 ${isActive ? 'bg-[#93D1BE] ' : 'hover:bg-[#93D1BE]'} rounded-lg relative`}>
                      <div className='lg:flex items-center gap-4 hidden'>
                        <img src={link.icon} className="w-[29px]" />
                      </div>
                        <p className="text-lg self-end">{link.name}</p>
                    </Link>   
                );
              })}     
          </div>
          <div className='lg:hidden'>
            <SearchBar />
          </div>
          <div className='flex items-center justify-end lg:justify-center'>
            <button onClick={handleLogout} className="flex py-2 px-2 mx-5 lg:m-0 lg:px-5 items-center justify-center gap-4 hover:bg-[#93D1BE] transition ease-in-out rounded-lg">
                <div className="flex">
                  <img src={LogoutIcone} className="h-[20px] lg:h-[25px]" />
                </div>
                <p className="text-lg self-end lg:flex items-center gap-4 hidden">Sair da conta</p>
            </button>
          </div>
        </div>
    );
}
