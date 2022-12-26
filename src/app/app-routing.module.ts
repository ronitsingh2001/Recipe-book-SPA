import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes:Routes =[
    { path: '', redirectTo: '/recipes', pathMatch: "full" },
    {path:'recipes',component:RecipesComponent,children:[
        {path:'new',component:RecipeEditComponent},
        {path:'',component:RecipeStartComponent},
        {path:':id',component:RecipeDetailComponent, resolve:{RecipeResolverService}},
        {path:':id/edit',component:RecipeEditComponent, resolve:{RecipeResolverService}},
    ]},
    {path:'shopping-list',component:ShoppingListComponent},
    {path:'auth',component:AuthComponent},
    {path:'**',redirectTo:'/recipes'}
  ]

  @NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
  })

  export class AppRoutingModule{
    
  }