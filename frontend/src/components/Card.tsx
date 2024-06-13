import { useDeleteFood } from '../hooks/useFoodData';

interface CardProps {
    id: string,  // Alterado para number para corresponder ao tipo do ID
    title: string,
    image: string,
    description: string,
    price: number,
    category: string,
}

const Card = ({ title, image, description, price, category, id } : CardProps ) => {
    const { mutate: deleteFood } = useDeleteFood();

    const handleDelete = () => {
        deleteFood(id);
    }

    return (
        <div className="flex flex-col h-[25rem] items-center min-w-auto max-w-[300px] rounded-md shadow-lg border gap-5 bg-slate-200">
            <img className="rounded-t-md w-ful h-[200px]" src={image} alt={title}/>
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex flex-col self-start gap-2 px-5">
                <p><strong>Descrição: </strong>{description}</p>
                <p><strong>Valor: </strong>R${price}</p>
                <div className="flex gap-12">
                    <p><strong>Categoria: </strong>{category}</p>
                    <button onClick={handleDelete} className="bg-slate-300 hover:bg-slate-400 px-2 py-1 rounded-md">Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default Card;
