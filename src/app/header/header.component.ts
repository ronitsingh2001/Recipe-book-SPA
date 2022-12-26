import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: any;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(){
    this.authService.logout()
  }

  onSaveData() {
    this.dataStorageService.storingRecipe()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }
}
