import { Module } from "module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@new Module({
    imports: [],
    controllers: [AuthController],
    exports: [AuthService],
    providers: [AuthService]
})

export class AppModule {}
