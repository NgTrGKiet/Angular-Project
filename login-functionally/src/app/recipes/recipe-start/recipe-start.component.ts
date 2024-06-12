import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-start',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './recipe-start.component.html',
  styleUrl: './recipe-start.component.css'
})
export class RecipeStartComponent {
  constructor() { }

  ngOnInit() {
  }
}
