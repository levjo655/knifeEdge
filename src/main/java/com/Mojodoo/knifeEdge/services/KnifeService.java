package com.Mojodoo.knifeEdge.services;

import com.Mojodoo.knifeEdge.models.Knife;
import com.Mojodoo.knifeEdge.repository.KnifeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class KnifeService {
    private final KnifeRepository knifeRepository;

    @Autowired
    public KnifeService(KnifeRepository knifeRepository) {
        this.knifeRepository = knifeRepository;
    }

    public Knife createKnife(Knife knife) {
        return knifeRepository.save(knife);
    }

    public List<Knife> getAllKnives() {
        return knifeRepository.findAll();
    }

    public Knife getKnifeById(String id) {
        return knifeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Knife not found with ID: " + id));
    }

    public Knife updateKnife(Knife knife) {
        return knifeRepository.save(knife);
    }

    public String deleteKnife(String id) {
        if (!knifeRepository.existsById(id)) {
            throw new NoSuchElementException("Knife not found with ID: " + id);
        }
        knifeRepository.deleteById(id);
        return "Knife with ID " + id + " was deleted";
    }
}
