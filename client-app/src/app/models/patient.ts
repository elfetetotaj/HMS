export interface Patient {
    id: string;
    name: string;
    surname: string;
    dateofbirth: Date | null ;
    gender: string;
    street_address: string;
    city: string;
    country: string;
    postal_code: string;
    phone: string;
    weight: string;
    other_det: string;
    register_date: Date | null;
    

}