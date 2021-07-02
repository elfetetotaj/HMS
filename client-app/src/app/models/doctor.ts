export interface Doctor {
    id: string;
    name: string;
    surname: string;
    dateofbirth: Date | null;
    gender: string;
    street_address: string;
    city: string;
    country: string;
    postal_code: string;
    phone: string;
    designation : string;
}