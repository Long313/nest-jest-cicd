import bcrypt from 'bcrypt';

export function generateHash(password: string) {
    return bcrypt.hashSync(password,12);
}