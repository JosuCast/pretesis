export class Comida{

    _id?:string;
    nombre:string;
    categoria: string;
    
    __v?:number;


    constructor(nombre:string,categoria:string,__v:number){
        this.nombre = nombre;
        this.categoria = categoria;
        this.__v = __v;
    }
}