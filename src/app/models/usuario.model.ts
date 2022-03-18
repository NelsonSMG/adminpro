
export class Usuario {

    constructor(
        public nombre: string | null,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public _id?: string
    ) { }

}