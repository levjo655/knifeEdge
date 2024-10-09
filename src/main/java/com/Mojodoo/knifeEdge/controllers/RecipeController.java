package com.Mojodoo.knifeEdge.controllers;

import com.Mojodoo.knifeEdge.models.Recipe;
import com.Mojodoo.knifeEdge.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/recipe")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @GetMapping("/all")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }


    @GetMapping("{id}")
    public Recipe getRecipeById(@PathVariable String id) {
        try {
            return recipeService.getRecipeById(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found");
        }
    }


    @PutMapping("/{id}")
    public Recipe updateRecipe(@RequestBody Recipe recipe) {
        return recipeService.updateRecipe(recipe);
    }
}
