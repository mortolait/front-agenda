export interface Appointment{
    date:Date,
    time: any,
    professional: any,
    Client: any,
    service: any,
    status: String,
    obs: String,
    address: String,
    cep: String,
    uf: String,
    city: String,
    district: String,
    number: String,
    complement: String,
}

export type Appointments = Array<Appointment>;
