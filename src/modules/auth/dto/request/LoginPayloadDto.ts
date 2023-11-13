import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/modules/user/dto/user.dto";
import { TokenPayloadDto } from "../TokenPayloadDto";
import { RefreshTokenPayloadDto } from "../RefreshTokenPayload";

export class LoginPayloadDto {
    @ApiProperty({type: UserDto})
    user: UserDto;

    @ApiProperty({type: TokenPayloadDto})
    token: TokenPayloadDto;

    @ApiProperty({type: RefreshTokenPayloadDto})
    refreshToken: RefreshTokenPayloadDto

    constructor(
        user: UserDto,
        token: TokenPayloadDto,
        refreshToken: RefreshTokenPayloadDto
    ) {
        this.user = user;
        this.token = token;
        this.refreshToken = refreshToken;
    }
}