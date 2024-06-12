import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Observable, map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";


@Injectable({ providedIn: 'root' })
export class dataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes(): Observable<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        return this.http.put<Recipe[]>(
            'https://making-http-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
            recipes)
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(
            'https://making-http-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                })
            )
    }
}