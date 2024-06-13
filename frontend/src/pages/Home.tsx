import {  useState } from 'react';
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { useFoodData } from "../hooks/useFoodData";

const Home = () => {
    const { data } = useFoodData();
    const [search, setSearch] = useState('');

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };

    const filteredData = data?.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (    
        <div className="flex flex-col lg:ml-[15rem] h-screen">
            <div className="flex h-auto w-auto">
                <div className="flex w-full items-center mt-5 ml-20">
                    <h1 className="text-7xl font-bold tracking-widest text-[#47A789]">EL MENU</h1>
                </div>
                <div className="flex justify-end self-center mt-10 pr-14">
                    <SearchBar value={search} onChange={handleSearchChange}/>
                </div>
            </div>
            <div className="flex-grow overflow-y-scroll mt-20 px-8 scrollbar">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center place-content-center gap-y-10">
                    {filteredData?.map((item) => 
                        <Card 
                            key={item.id} 
                            image={item.picture} 
                            title={item.name} 
                            description={item.description} 
                            price={item.salePrice} 
                            category={item.category}
                            id={item.id}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;
