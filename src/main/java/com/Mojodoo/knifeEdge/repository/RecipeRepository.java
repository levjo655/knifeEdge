package com.Mojodoo.knifeEdge.repository;

import com.Mojodoo.knifeEdge.models.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
}
