import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schitzel',
      'This is a test desc.',
      'https://assets.bonappetit.com/photos/62bf35ae872a6cfbb260f286/2:3/w_1600,h_2400,c_limit/0701-tj-recipe-potato-v2.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'This is a test desc.',
      'https://assets.bonappetit.com/photos/62bf35ae872a6cfbb260f286/2:3/w_1600,h_2400,c_limit/0701-tj-recipe-potato-v2.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
