import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm:any;

  subscription:any;
  editMode = false;
  edittedItemIndex:any;
  edittedItem:any;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription=  this.slService.startedEditing
    .subscribe((id:number)=>{
      this.edittedItemIndex=id;
      this.editMode=true;
      this.edittedItem=this.slService.getIngredient(id);
      this.slForm.setValue({
        name:this.edittedItem.name,
        amount:this.edittedItem.amount
      })
    })
  }

  onAddItem(form:NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.edittedItemIndex,newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.slForm.reset()
    this.editMode=false
  }
  onDelete(){
    this.slService.deleteIngr(this.edittedItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe() 
  }

}
