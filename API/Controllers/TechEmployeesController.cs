using System;
using System.Threading.Tasks;
using Application.TechEmployees;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TechEmployeesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTechEmployees()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //TechEmployees/id
        public async Task<IActionResult> GetTechEmployee(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTechEmployee(TechEmployee TechEmployee)
        {
            return HandleResult(await Mediator.Send(new Create.Command {TechEmployee = TechEmployee}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTechEmployee(Guid id, TechEmployee TechEmployee)
        {
            TechEmployee.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{TechEmployee = TechEmployee}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTechEmployee(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}