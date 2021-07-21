export interface EmergencyDriver {
    id: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    dateofbirth: Date | null;
    gender: string;
    street_address: string;
    city: string;
    country: string;
    postal_code: string;
    phone: string;
    department : string;
}