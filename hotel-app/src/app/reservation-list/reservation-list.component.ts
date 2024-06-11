import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../model/reservations';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HomeComponent],
  providers: [
    HttpClientModule
  ],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservation) => {
      this.reservations = reservation;
    })
  }

  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id).subscribe((reservation) => {
      console.log('Delete request got processed')
    })
    this.router.navigate(['/list'], { relativeTo: this.route })
  }

}
