import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  constructor() { }

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments');
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment(): void {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };

      this.appointments.push(newAppointment);

      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      localStorage.setItem('appointment', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number): void {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointment', JSON.stringify(this.appointments));
  }

}
