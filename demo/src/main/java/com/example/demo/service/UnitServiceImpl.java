package com.example.demo.service;

import com.example.demo.model.Unit;
import com.example.demo.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UnitServiceImpl implements UnitService {
    @Autowired
    private UnitRepository unitRepository;

    @Override
    public List<Unit> getAllUnits() {
        return (List<Unit>) unitRepository.findAll();
    }

    @Override
    public Unit getUnitById(int id) {
        Optional<Unit> optionalUnit = unitRepository.findById(id);
        return optionalUnit.orElse(null);
    }

    @Override
    public Unit createUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    // @Override
    // public Unit updateUnit(int id, Unit unitDetails) {
    // Optional<Unit> optionalUnit = unitRepository.findById(id);
    // if (optionalUnit.isPresent()) {
    // Unit existingUnit = optionalUnit.get();

    // // if (unitDetails.isIs_available()) {
    // // existingUnit.setIs_available(unitDetails.isIs_available());
    // // }
    // existingUnit.setBed(unitDetails.getBed());
    // existingUnit.setBath(unitDetails.getBath());
    // existingUnit.setRent(unitDetails.getRent());
    // existingUnit.setSize(unitDetails.getSize());
    // existingUnit.setIs_available(unitDetails.isIs_available());
    // return unitRepository.save(existingUnit);
    // }
    // return null;
    // }

    @Override
    public Unit updateUnit(int id, Unit unitDetails) {
        Optional<Unit> optionalUnit = unitRepository.findById(id);
        if (optionalUnit.isPresent()) {
            Unit existingUnit = optionalUnit.get();

<<<<<<< Updated upstream
            // Update only the properties that are present in unitDetails
            if (unitDetails.getBed() != 0) {
                existingUnit.setBed(unitDetails.getBed());
            }

            if (unitDetails.getBath() != 0) {
                existingUnit.setBath(unitDetails.getBath());
            }

            if (unitDetails.getRent() != 0) {
                existingUnit.setRent(unitDetails.getRent());
            }

            if (unitDetails.getSize() != 0) {
                existingUnit.setSize(unitDetails.getSize());
            }

            existingUnit.setIs_available(unitDetails.isIs_available());

=======
            // if (unitDetails.isIs_available()) {
            // existingUnit.setIs_available(unitDetails.isIs_available());
            // }
            existingUnit.setBed(unitDetails.getBed());
            existingUnit.setBath(unitDetails.getBath());
            existingUnit.setRent(unitDetails.getRent());
            existingUnit.setSize(unitDetails.getSize());
            existingUnit.setIs_available(unitDetails.isIs_available());
>>>>>>> Stashed changes
            return unitRepository.save(existingUnit);
        }
        return null;
    }

    @Override
    public void deleteUnit(int id) {
        unitRepository.deleteById(id);
    }
}
