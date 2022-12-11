import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL = 'http://localhost:8080/api/v1/employees';
  constructor(private http: HttpClient) {}

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseURL}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number | undefined): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number | undefined, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number | undefined): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseURL}/${id}`);
  }
}
