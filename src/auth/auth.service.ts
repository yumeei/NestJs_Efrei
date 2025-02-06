import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../../dto/register.dto';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async register(userData: RegisterDto) {
    const userExists = await this.userRepository.findOne({ where: { email: userData.email } });
    if (userExists) {
      throw new BadRequestException('Email déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create({ ...userData, password: hashedPassword });
    await this.userRepository.save(newUser);

    return { message: 'Utilisateur inscrit avec succès', user: newUser, id: newUser.id };
  }

  async login(loginData: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginData.email } });
    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new BadRequestException('Identifiants incorrects.');
    }

    const payload = { email: user.email, username: user.username, userId: user.id };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Connexion réussie',
      userId: user.id,
      token,
    };
  }
}
