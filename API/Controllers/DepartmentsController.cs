using System;
using System.Threading.Tasks;
using Application.Departments;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DepartmentsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //departments/id
        public async Task<IActionResult> GetDepartment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment(Department department)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Department = department}));
        }

        [Authorize(Policy = "IsDepartmentHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDepartment(Guid id, Department department)
        {
            department.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Department = department}));
        }

        [Authorize(Policy = "IsDepartmentHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}