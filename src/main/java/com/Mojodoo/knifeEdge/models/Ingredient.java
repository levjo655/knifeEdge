package com.Mojodoo.knifeEdge.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Ingredient")
public class Ingredient {

    @Id
    private String id;
    private String name;
    private String quantity;


    public Ingredient() {
    }

    public Ingredient(String name, String quantity) {
        this.name = name;
        this.quantity = quantity;

    }

    // Getters and Setters
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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

}
