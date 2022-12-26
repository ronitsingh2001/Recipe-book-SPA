import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, pipe, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storingRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<Recipe[]>(
            'https://recipe-book-spa-78464-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe();
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://recipe-book-spa-78464-default-rtdb.firebaseio.com/recipes.json?'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }), tap(recipes => {
                this.recipeService.setRecipes(recipes);

            }))

    }
} 