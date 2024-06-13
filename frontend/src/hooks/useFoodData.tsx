import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:3000';

const  fetchData = async (): AxiosPromise<FoodData[]> => {
    const response = await axios.get(API_URL + '/foods');
    return response;
}

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2,
    })
    return {
        ...query,
        data: query.data?.data
    };
}