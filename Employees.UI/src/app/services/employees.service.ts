import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.baseApiUrl}/employees`);
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${environment.baseApiUrl}/employees`, addEmployeeRequest);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${environment.baseApiUrl}/employees/${id}`);
  }

  updateEmployee(id: string,updateEmployeeRequest: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${environment.baseApiUrl}/employees/${id}`, updateEmployeeRequest);
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.baseApiUrl}/employees/${id}`);
  }
}
