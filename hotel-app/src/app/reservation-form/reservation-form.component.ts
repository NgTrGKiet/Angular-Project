import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ReservationService } from '../reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { Reservation } from '../model/reservations';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, HomeComponent],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      dateRegister: new FormGroup({
        checkInDate: new FormControl(null, Validators.required),
        checkOutDate: new FormControl(null, Validators.required)
      }),
      userInfo: new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [
          Validators.required,
          Validators.email
        ])
      }),
      roomNum: new FormControl(null, Validators.required)
    })

    const id = this.route.snapshot.params['id'];
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation)
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      // this.reservationService.addReservation(reservation);
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.reservationService.updateReservation(id, reservation);
      } else {
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list'])
    }
  }

}
