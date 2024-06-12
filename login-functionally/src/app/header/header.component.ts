import { Component } from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(private dataStorageService: dataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response) => console.log(response)
    );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {

  }
}
