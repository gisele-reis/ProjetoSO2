import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersEntity } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ) { }

    async findAll() {
        return await this.usersRepository.find({ 
            select: ['id', 'firstName', 'lastName', 'email'],
        });
    }

    async findOneOrFail(options: FindOneOptions<UsersEntity>) {
        try {
            return await this.usersRepository.findOneOrFail(options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateUserDto) {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneOrFail({ where: { id } });
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }

    async destroy(id: string) {
        await this.usersRepository.findOneOrFail({ where: { id } });
        return await this.usersRepository.softDelete(id);
    }
}
