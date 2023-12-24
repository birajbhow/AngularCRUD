using Employees.API.Data;
using Employees.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesDbContext _dbContext;
        public EmployeesController(EmployeesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _dbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeRequest employeeRequest)
        {
            var newEmployee = new Employee
            {
                Id = new Guid(),
                Name = employeeRequest.Name,
                Email = employeeRequest.Email,
                Phone = employeeRequest.Phone,
                Salary = employeeRequest.Salary,
                Department = employeeRequest.Department
            };
            await _dbContext.Employees.AddAsync(newEmployee);
            await _dbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeById([FromRoute] Guid id)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<IEnumerable<Employee>>> UpdateEmployee([FromRoute] Guid id,
            EmployeeRequest employeeRequest)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = employeeRequest.Name;
            employee.Email = employeeRequest.Email;
            employee.Phone = employeeRequest.Phone;
            employee.Salary = employeeRequest.Salary;
            employee.Department = employeeRequest.Department;

            _dbContext.Employees.Update(employee);
            await _dbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
