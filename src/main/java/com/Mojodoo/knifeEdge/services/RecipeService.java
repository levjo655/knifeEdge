package com.Mojodoo.knifeEdge.services;

import com.Mojodoo.knifeEdge.models.Recipe;
import com.Mojodoo.knifeEdge.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service

public class RecipeService {
    @Autowired
    RecipeRepository recipeRepository;

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }


     public Recipe getRecipeById(String  id) {
        try {
            return recipeRepository.findById(id).get();
        }catch (NoSuchElementException exception) {
            System.out.println("Could not find the requested recipe");
            throw exception;
        }
     }
     public Recipe updateRecipe( Recipe recipe) {
        return recipeRepository.save(recipe);
     }
}


