import { Component } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test desc.', 'https://assets.bonappetit.com/photos/62bf35ae872a6cfbb260f286/2:3/w_1600,h_2400,c_limit/0701-tj-recipe-potato-v2.jpg' )
  ];

  constructor () {
    
  }
}
