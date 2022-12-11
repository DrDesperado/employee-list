import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      this.employeeService.addEmployee(formData).subscribe(
        (data) => {
          console.log('Employee', data);
          this.employees.push(data);
          this.router.navigate(['/employees']);
        },
        (error) => console.log(error)
      );
    }
  }
}
