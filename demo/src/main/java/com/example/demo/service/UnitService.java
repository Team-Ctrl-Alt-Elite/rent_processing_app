package com.example.demo.service;

import com.example.demo.model.Unit;

import java.util.List;

public interface UnitService {
    public List<Unit> getAllUnits();
    Unit getUnitById(int id);
    Unit createUnit(Unit unit);
    Unit updateUnit(int id, Unit unitDetails);
    void deleteUnit(int id);
}
