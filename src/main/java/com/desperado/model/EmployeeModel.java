package com.desperado.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employees")
@Data
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="email_id")
    private String emailId;

    public EmployeeModel() {

    }

    public EmployeeModel(String firstName, String lastName, String emailId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
    }
}
