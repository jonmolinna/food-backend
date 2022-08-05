import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/CreateUser.dto';
import { UpdateUserInput } from './dto/UpdateUser.dto';
import { User } from './entity/user.entity';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createUser(dto: CreateUserInput): Promise<User> {
    const hashPassword = encodePassword(dto.password);

    const newUser = new User();
    newUser.lastName = dto.lastName.trim().toLocaleLowerCase();
    newUser.firstName = dto.firstName.trim().toLocaleLowerCase();
    newUser.dni = dto.dni.trim().toLocaleLowerCase();
    newUser.email = dto.email;
    newUser.password = hashPassword;
    newUser.phone = dto.phone;

    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, dto: UpdateUserInput): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) throw new NotFoundException('No se encontro el usuario');

    const editUser = Object.assign(user, {
      lastName: dto.lastName.trim().toLocaleLowerCase() || user.lastName,
      firstName: dto.firstName.trim().toLocaleLowerCase() || user.firstName,
      dni: dto.dni.trim().toLocaleLowerCase() || user.dni,
      phone: dto.phone || user.phone,
    });

    return this.userRepository.save(editUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.delete(id);
    if (user.affected === 1) {
      return true;
    }
    return false;
  }
}
