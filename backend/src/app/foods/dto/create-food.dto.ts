import { IsDecimal, IsInt, IsNumber, IsString } from "class-validator";

export class CreateFoodDto {

    @IsString()
    name: string;

    @IsString()
    picture: string;

    @IsString()
    description: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    purchasePrice: number;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    salePrice: number;

    @IsInt()
    stock: number;

    @IsInt()
    minimumStock: number;

    @IsString()
    category: string;

    @IsString()
    stockName: string;

    @IsString()
    informations: string;
}
