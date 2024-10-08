package com.Mojodoo.knifeEdge.repository;

import com.Mojodoo.knifeEdge.models.Knife;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KnifeRepository extends MongoRepository<Knife, String> {
}
