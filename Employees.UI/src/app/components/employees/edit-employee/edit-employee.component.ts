import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employee = {
    id: "",
    name: "",
    email: "",
    phone: 0,
    salary: 0,
    department: ""
  };
  constructor(private route: ActivatedRoute, private employeeSvc: EmployeesService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: param => {
        const id = param.get('id');
        if (id) {
          this.employeeSvc.getEmployee(id).subscribe({
            next: employee => {
              this.employeeDetails = employee;
            }
          });
        }
      }
    });
  }

  updateEmployee() {
    this.employeeSvc.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe({
      next: employee => { 
        console.log(employee);
        this.router.navigate(['employees'])
      },
      error: resp => { console.log(resp); }
    });
  }

  deleteEmployee() {
    this.employeeSvc.deleteEmployee(this.employeeDetails.id).subscribe({
      next: employeeId => { 
        console.log(`Deleted Employee Id: ${employeeId}`);
        this.router.navigate(['employees'])
      },
      error: resp => { console.log(resp); }
    });
  }
  
}
