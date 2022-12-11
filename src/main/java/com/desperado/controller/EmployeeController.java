package com.desperado.controller;

import com.desperado.exception.ResourceNotFoundException;
import com.desperado.model.EmployeeModel;
import com.desperado.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public List<EmployeeModel> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // create employee rest api
    @PostMapping("/employees")
    public EmployeeModel createEmployee(@RequestBody EmployeeModel employeeModel) {
        return this.employeeRepository.save(employeeModel);
    }

    // get employee by id
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeModel> getEmployeeById(@PathVariable Long id){
            EmployeeModel employeeModel = employeeRepository.findById(id).orElseThrow(() ->
                    new ResourceNotFoundException("Employee not found with id" + id));
            return ResponseEntity.ok(employeeModel);
    }

    // update employee
    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeModel> updateEmployee(@PathVariable Long id,
                                                        @RequestBody EmployeeModel employeeData) {
        EmployeeModel employeeModel = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with id" + id));
        employeeModel.setEmailId(employeeData.getEmailId());
        employeeModel.setFirstName(employeeData.getFirstName());
        employeeModel.setLastName(employeeData.getLastName());

        EmployeeModel updatedEmployee = employeeRepository.save(employeeModel);
        return ResponseEntity.ok(updatedEmployee);

    }

    // delete employee
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        EmployeeModel employeeModel = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with id:" + id));
        employeeRepository.delete(employeeModel);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
