import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
  form: FormGroup;
  id: number;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.email, Validators.required]),
    });
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
    

      this.form.setControl(
        'firstName',
        this.formBuilder.control(data.firstName, [Validators.required])
      );
      this.form.setControl(
        'lastName',
        this.formBuilder.control(data.lastName, [Validators.required])
      );
      this.form.setControl(
        'emailId',
        this.formBuilder.control(data.emailId, [
          Validators.required,
          Validators.email,
        ])
      );
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      this.employeeService.updateEmployee(this.id, formData).subscribe(
        (data) => {
          console.log('Updated employee', data);
          this.router.navigate(['/employees']);
        },
        (error) => console.log(error)
      );
    }
  }

  goToBack() {
    this.router.navigate(['employees'])
  }
}
