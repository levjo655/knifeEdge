package com.Mojodoo.knifeEdge.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Recipe")
public class Recipe {

    @Id
    private String id;
    private String name;
    private String description;
    private List<Ingredient> ingredients;
    private List<String> instructions;
    private int cookingTime;
    private List<String> recommendedKnifeIds;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    public int getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(int cookingTime) {
        this.cookingTime = cookingTime;
    }

    public List<String> getRecommendedKnifeIds() {
        return recommendedKnifeIds;
    }

    public void setRecommendedKnifeIds(List<String> recommendedKnifeIds) {
        this.recommendedKnifeIds = recommendedKnifeIds;
    }
}
