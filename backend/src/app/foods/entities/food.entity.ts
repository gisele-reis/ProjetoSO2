import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('foods')
export class Food {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    picture: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    purchasePrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    salePrice: number;

    @Column()
    stock: number;

    @Column()
    minimumStock: number;

    @Column()
    category: string;

    @Column()
    stockName: string;

    @Column()
    informations: string;
}
