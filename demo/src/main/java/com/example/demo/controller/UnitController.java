package com.example.demo.controller;

import com.example.demo.model.Unit;
import com.example.demo.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unit")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @GetMapping("/all")
    public List<Unit> getAllUnits() {
        return unitService.getAllUnits();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Unit> getUniyById(@PathVariable Integer id) {
        Unit unit = unitService.getUnitById(id);
        if (unit != null) {
            return ResponseEntity.ok(unit);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Unit> createUnit(@RequestBody Unit unit) {
        Unit createdUnit = unitService.createUnit(unit);
        return ResponseEntity.ok(createdUnit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Unit> updateUnit(@PathVariable Integer id, @RequestBody Unit unitDetails) {
        Unit updatedUnit = unitService.updateUnit(id, unitDetails);
        if (updatedUnit != null) {
            return ResponseEntity.ok(updatedUnit);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Integer id) {
        unitService.deleteUnit(id);
        return ResponseEntity.noContent().build();
    }
    // Other endpoints for CRUD operations if needed
}
