import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/Auth/AuthGuard";
import { PasswordUserDto, UpdateUserDto } from "./create-user.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./roles.enum";
import { RolesGuard } from "src/Auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

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
    @ApiOperation({ summary: 'Obtener lista de usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' })
    @ApiResponse({ status: 401, description: 'Esta ruta solo es accesible por administradores.' })
    @ApiResponse({ status: 404, description: 'No se encontró ningún usuario.' })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    getUsers(@Query('page') page?: number, @Query('limit') limit?: number){
        return this.userService.getUsers(page, limit)
    }

    
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @ApiOperation({ summary: 'Obtener usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Get('profile/:id')
    getUserbyId(@Param("id", ParseUUIDPipe) id:string){
        return this.userService.getUserById(id)
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @ApiBody({ type: UpdateUserDto })
    @ApiOperation({ summary: 'Actualizar usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Put('update/:id')
    PutUser(@Body() UserDto:UpdateUserDto, @Param("id", ParseUUIDPipe) id:string){
        console.log(id)
        return this.userService.updateUser(id, UserDto)
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @Put('password/:id')
    @ApiOperation({ summary: 'Cambiar contraseña de usuario' })
    @ApiResponse({ status: 200, description: 'Contraseña actualizada exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos de solicitud incorrectos.' })
    PutUserPassword(@Body()credentials:PasswordUserDto, @Param("id", ParseUUIDPipe) id:string){
        const { password, newpassword ,confirmPassword } = credentials
        return this.userService.ChangePassword(id, password, newpassword, confirmPassword)
    }
    
    @HttpCode(200)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @ApiOperation({ summary: 'Eliminar usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Delete('delete/:id')
    DelenteUser(@Param("id", ParseUUIDPipe) id:string){
        return this.userService.deleteUser(id)
    }
}