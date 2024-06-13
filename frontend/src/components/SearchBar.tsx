const SearchBar = ({ value, onChange } : any) => {
    return (
        <input 
            type="text" 
            value={value} 
            onChange={onChange} 
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Buscar itens..."
        />
    );
};

export default SearchBar;