import { Injectable } from "@angular/core";
import { Reservation } from "./model/reservations";
import { Observable } from "rxjs";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ReservationService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {
    }

    private reservations: Reservation[] = [];

    getReservations(): Observable<Reservation[]> {
        // return this.reservations
        return this.http.get<Reservation[]>(this.apiUrl + '/reservations');

    }

    getReservation(id: string): Observable<Reservation> {
        // return this.reservations.find((ele) => ele.id === id);
        return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id)
    }

    addReservation(reservation: Reservation): Observable<Reservation> {
        console.log(reservation)
        // reservation.id = Date.now().toString();
        // this.reservations.push(reservation);
        // console.log(this.reservations)
        return this.http.post<Reservation>(this.apiUrl + '/reservation', reservation)
    }

    deleteReservation(id: string): Observable<void> {
        // let index = this.reservations.findIndex((res) => res.id === id);
        // this.reservations.splice(index, 1);
        return this.http.delete<void>(this.apiUrl + '/reservation/' + id)

    }

    updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
        console.log(updatedReservation)
        // let index = this.reservations.findIndex(
        //     (res) => res.id === id
        // );
        // this.reservations[index] = updatedReservation;
        return this.http.put<void>(this.apiUrl + '/reservation/' + id, updatedReservation)
    }
}