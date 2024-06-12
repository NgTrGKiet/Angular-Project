import { Injectable } from "@angular/core";
import { dataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipe.model";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: dataStorageService,
        private recipesService: RecipeService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}