package com.Mojodoo.knifeEdge.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Knife")
public class Knife {

    @Id
    private String id;
    private String type;
    private String length;

    // Default constructor
    public Knife() {
    }

    // Constructor with parameters
    public Knife(String type, String length) {
        this.type = type;
        this.length = length;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }
}
