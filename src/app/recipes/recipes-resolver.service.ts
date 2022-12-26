import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<any>{
    constructor(private recipeService:RecipeService,private dataStorageService:DataStorageService){}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
       const recipes = this.recipeService.getRecipes()

       if(recipes.length === 0){
           return this.dataStorageService.fetchRecipes()
       }else{
        return recipes
       }
       
    }
}