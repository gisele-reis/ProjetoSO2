import { useState } from "react";

const CadastroItem = () => {
    const categorias = [
        "Porções",
        "Refeições",
        "Sobremesas",
        "Carnes",
        "Bebidas",
        "Diversos",
    ];

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [minimumStock, setMinimumStock] = useState(0);
    const [category, setCategory] = useState('');
    const [stockName, setStockName] = useState('');
    const [informations, setInformations] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/foods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    picture: image,
                    description: description,
                    purchasePrice: purchasePrice,
                    salePrice: salePrice,
                    stock: stock,
                    minimumStock: minimumStock,
                    category: category,
                    stockName: stockName,
                    informations: informations
                })
            });

            if (!response.ok) {
                const responseData = await response.json();
                setError(responseData.message || 'Ocorreu um erro ao processar sua solicitação.');
                window.alert(error);
                return;
            }

            setName('');
            setImage('');
            setDescription('');
            setPurchasePrice(0);
            setSalePrice(0);
            setStock(0);
            setMinimumStock(0);
            setCategory('');
            setStockName('');
            setInformations('');
            setError('');

            window.alert('Item criado com sucesso!');

            
        } catch (error) {
            setError('Ocorreu um erro ao processar sua solicitação.');
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start h-screen w-screen py-6 gap-10">
            <h1 className="text-7xl lg:ml-[15rem] font-bold leading-tight text-[#47A789]">Cadastrar Item</h1>
            <form onSubmit={handleSubmit} className="flex flex-col lg:ml-[15rem] w-1/2 items-start justify-center px-6 py-10 bg-white rounded-xl shadow-lg border gap-6">
                    <div className="grid grid-cols-2 pl-8 w-full">
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Nome do Item</label>
                            <input required type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Link da Imagem</label>
                            <input required type="link" name="image" value={image} onChange={(e) => setImage(e.target.value)} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                    </div>
                    <div className="flex flex-col w-2/3 pl-8">
                        <label className="mb-2 text-xl font-medium">Descrição</label>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-[#CED7D9] h-32 resize-none rounded focus:outline-[#47A789] p-2" />
                    </div>
                    <div className="grid grid-cols-2 pl-8 w-full">
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Valor de compra</label>
                            <input required type="number" step="0.01" name="purchaseValue" min="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(parseFloat(e.target.value))} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Valor de venda</label>
                            <input required type="number" step="0.01" name="saleValue" min="0.01" value={salePrice} onChange={(e) => setSalePrice(parseFloat(e.target.value))} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 pl-8 w-full">
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Quantidade em estoque</label>
                            <input required type="number" min="0" step="1" name="stock" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Estoque mínimo</label>
                            <input required type="number" min="0" step="1" name="minimumStock" value={minimumStock} onChange={(e) => setMinimumStock(parseInt(e.target.value))} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 pl-8 w-full">
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Categoria</label>
                            <select required name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1">
                                <option></option>
                                {categorias.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col w-2/3">
                            <label className="mb-2 text-xl font-medium">Local do estoque</label>
                            <input required type="text" name="stockName" value={stockName} onChange={(e) => setStockName(e.target.value)} className="bg-[#CED7D9] rounded focus:outline-[#47A789] p-1" />
                        </div>
                    </div>
                
                    <div className="grid grid-cols-4 w-full gap-6 pr-8">
                        <div className="col-span-3 flex flex-col px-8 ">
                            <label className="mb-2 text-xl font-medium">Informações</label>
                            <textarea name="info" value={informations} onChange={(e) => setInformations(e.target.value)} className="bg-[#CED7D9] h-32 resize-none rounded focus:outline-[#47A789] p-2" />
                        </div>
                        <div className="col-span-1 place-self-end">
                            <button type="submit" className="flex justify-center bg-[#47A789] font-bold py-2 px-6 rounded-2xl hover:bg-[#93D1BE] transition ease-in-out">Cadastrar</button>
                        </div>

                    </div>
                
            </form>
        </div>
    )
}

export default CadastroItem;