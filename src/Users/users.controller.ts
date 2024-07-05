import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/Auth/AuthGuard";
import { PasswordUserDto, UpdateUserDto } from "./create-user.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./roles.enum";
import { RolesGuard } from "src/Auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController{
    constructor(private readonly userService:UserService){}
    
    @HttpCode(200)
    @ApiBearerAuth()
    @ApiQuery({ 
        name: 'page', 
        type: 'number', 
        description: 'Número de página en la lista de usuarios (default: 1)', 
        required: false 
    })
    @ApiQuery({ 
        name: 'limit', 
        type: 'number', 
        description: 'Cantidad de usuarios mostrados en una página (default: 5)', 
        required:false
})
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    getUsers(@Query('page') page?: number, @Query('limit') limit?: number){
        return this.userService.getUsers(page, limit)
    }

    
    @HttpCode(200)
    @ApiBearerAuth()
    @ApiQuery({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del usuario que se requiera', 
        required: false 
    })
    @UseGuards(AuthGuard)
    @Get('profile/:id')
    getUserbyId(@Param("id", ParseUUIDPipe) id:string){
        return this.userService.getUserById(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('test')
    getComputedStyle(){
        return 'Ruta de test para el Rol User'
    }
    

    @HttpCode(200)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiBody({ type: UpdateUserDto })
    @Put('update/:id')
    PutUser(@Body() UserDto:Partial<UpdateUserDto>, @Param("id", ParseUUIDPipe) id:string){
        return this.userService.updateUser(id, UserDto)
    }

    @HttpCode(200)
    @Put('password/:id')
    PutUserPassword(@Body()credentials:PasswordUserDto, @Param("id", ParseUUIDPipe) id:string){
        const { password, newpassword ,confirmPassword } = credentials
        return this.userService.ChangePassword(id, password, newpassword, confirmPassword)
    }
    
    @HttpCode(200)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    DelenteUser(@Param("id", ParseUUIDPipe) id:string){
        return this.userService.deleteUser(id)
    }
}