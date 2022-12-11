import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';
import { Modal } from 'bootstrap';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  formModal: Modal;
  content: number | undefined;
  

  constructor(
    private employeeService: EmployeeService,
    private router: Router
    ) {}
    

  ngOnInit(): void {
    this.getEmployees();
    this.formModal= new Modal(document.getElementById("deleteModal"));
    
    
  }

  openModal(id: number | undefined) {
    this.content = id;
    this.formModal.show();

  }

  


  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }

  updateEmployee(id: number | undefined) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number | undefined) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    })
   

  }

  employeeDetail(id: number | undefined) {
  this.router.navigate(['employee-detail', id])
  }
}
