package com.Mojodoo.knifeEdge.services;

import com.Mojodoo.knifeEdge.models.Recipe;
import com.Mojodoo.knifeEdge.repository.KnifeRepository;
import com.Mojodoo.knifeEdge.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service

public class RecipeService {
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    private KnifeRepository knifeRepository;

    public Recipe createRecipe(Recipe recipe) {
        List<String> knifeIds= recipe.getRecommendedKnifeIds();
        if(knifeIds != null && !knifeIds.isEmpty()){
            for (String knifeId : knifeIds) {
                if(!knifeRepository.existsById(knifeId)){
                    throw new NoSuchElementException("Knife with ID " + knifeId + " does not exist");
                }
            }
        } return recipeRepository.save(recipe);

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
    public String deleteRecipe(String id) {
        recipeRepository.deleteById(id);
        return "Recipe deleted";
    }
    public List<Recipe> suggestRecipesBasedOnIngredients(List<String> userIngredients) {
        List<Recipe> allRecipes = recipeRepository.findAll();

        return allRecipes.stream()
                .filter(recipe ->hasMatchingIngredients(recipe, userIngredients))
                .sorted((r1, r2) -> countMatchingIngredients(r2, userIngredients) - countMatchingIngredients(r1, userIngredients))
                .collect(Collectors.toList());
    }
    private Boolean hasMatchingIngredients(Recipe recipe, List<String> userIngredients) {
        return recipe.getIngredients().stream()
                .anyMatch(ingredient -> userIngredients.contains(ingredient.getName()));
    }
    private Integer countMatchingIngredients(Recipe recipe, List<String> userIngredients) {
        return (int) recipe.getIngredients().stream()
                .filter(ingredient -> userIngredients.contains(ingredient.getName()))
                .count();
    }


     }



