import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  idChangedSub: any;

  constructor(private slService: ShoppingListService) { }

  
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.idChangedSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
      );
    }

    onEditItem(id:number){
      this.slService.startedEditing.next(id)
    }
    
  ngOnDestroy(): void {
    this.idChangedSub.unsubscribe()
  }
}
