import { NotFoundException } from "@nestjs/common";
import { Not } from "typeorm";

export class UserNotFoundException extends NotFoundException {
    constructor(error?: string) {
       super('error.userNotFound', error); 
    }
}