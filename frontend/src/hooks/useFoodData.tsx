import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://54.85.240.162:3000';

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const response = await axios.get(API_URL + '/foods');
    return response;
}

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2,
    });
    return {
        ...query,
        data: query.data?.data
    };
}

async function deleteFood(id: string): AxiosPromise<void> {
    const response = await axios.delete(`${API_URL}/foods/${id}`);
    return response;
}

export function useDeleteFood() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteFood,
        onSuccess: () => {
            // Invalida e refaz a consulta para garantir que os dados estejam atualizados
            queryClient.invalidateQueries({ queryKey: ['food-data'] }); // Usando um objeto com queryKey
        },
    });

    return mutation;
}