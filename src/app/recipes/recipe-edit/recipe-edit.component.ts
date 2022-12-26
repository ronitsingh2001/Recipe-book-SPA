import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: any;
  editMode = false;
  recipeForm: any;

  constructor(private activatedRoute: ActivatedRoute,private router:Router, private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  onSubmit(){
    // console.log(this.recipeForm);
    const newRecipe=new Recipe(this.recipeForm.value['name'],
    this.recipeForm.value['desc'],
    this.recipeForm.value['imgPath'],
    this.recipeForm.value['ingredients'])
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe)
    }else{
      this.recipeService.addRecipe(newRecipe )
    }

    this.router.navigate(["../"],{relativeTo:this.activatedRoute})
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(["../"]);
  }

  onAddIngr(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,Validators.pattern(/^[1-9]+[0-9]*$/)),
      })
    )
  }

  onDeleteIngr(id:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngr= new FormArray<any>([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']){
        for(let i of recipe.ingredients){
          recipeIngr.push(new FormGroup({
            'name':new FormControl(i.name,Validators.required),
            'amount':new FormControl(i.amount,Validators.pattern(/^[1-9]+[0-9]*$/))
          }))
        }
      }
      // console.log(recipeIngr)
    } 
    

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipeImgPath, Validators.required),
      'desc': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngr
    })
  }
}
