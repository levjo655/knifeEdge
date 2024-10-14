package com.Mojodoo.knifeEdge.controllers;

import com.Mojodoo.knifeEdge.models.Knife;
import com.Mojodoo.knifeEdge.services.KnifeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/api/knife")
public class KnifeController {

    private final KnifeService knifeService;

    @Autowired
    public KnifeController(KnifeService knifeService) {
        this.knifeService = knifeService;
    }

    @PostMapping
    public Knife createKnifeModel(@RequestBody Knife knife) {
        return knifeService.createKnife(knife);
    }

    @GetMapping("/all")
    public List<Knife> getAllKnives() {
        return knifeService.getAllKnives();
    }

    @GetMapping("/{id}")
    public Knife getKnifeById(@PathVariable String id) {
        try {
            return knifeService.getKnifeById(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Knife not found with ID: " + id);
        }
    }

    @PutMapping("/{id}")
    public Knife updateKnife(@PathVariable String id, @RequestBody Knife knife) {
        try {
            // Ensure the knife exists first before updating
            knifeService.getKnifeById(id);
            return knifeService.updateKnife(knife);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Knife not found with ID: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteKnife(@PathVariable String id) {
        try {
            return knifeService.deleteKnife(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Knife not found with ID: " + id);
        }
    }
}
