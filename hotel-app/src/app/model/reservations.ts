export interface Reservation {
    id: string;
    dateRegister: {
        checkInDate: Date;
        checkOutDate: Date;
    },
    userInfo: {
        name: string;
        email: string;
    }
    roomNum: number;
}