interface CardProps {
    title: string,
    image: string,
    description: string,
    price: number,
    category: string,
}

const Card = ({ title, image, description, price, category } : CardProps ) => {
    return (
        <div className="flex flex-col h-[25rem] items-center min-w-auto max-w-[300px] rounded-md shadow-lg border gap-5 bg-slate-200">
            <img className="rounded-t-md w-ful h-[200px]" src={image}/>
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex flex-col self-start gap-2 px-5">
                <p><strong>Descrição: </strong>{description}</p>
                <p><strong>Valor: </strong>R${price}</p>
                <p><strong>Categoria: </strong>{category}</p>
            </div>
        </div>
    )
}

export default Card;