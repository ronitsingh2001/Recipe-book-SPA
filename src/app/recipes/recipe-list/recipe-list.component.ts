import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]=[];
  subscription:any;

  constructor(private recipeService: RecipeService, private router:Router, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription=  this.recipeService.recipeChanged.subscribe((recipe)=>{
      this.recipes=recipe;
    })
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.activatedRoute})
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
