import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
  }

}
