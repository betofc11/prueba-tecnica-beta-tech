/*
    #   Se exporta la interfaz User para poder utilizarlo como tipo de dato para algunos
        datos, para que se verifique que los datos sean del tipo correcto
*/

export interface User {
    id: number;
    name: string;
    lastName: string;
    age: number;
    email: string;
    phoneNumber: string;
}