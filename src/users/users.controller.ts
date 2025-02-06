import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Affiche tous les utilisateurs inscrits' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
