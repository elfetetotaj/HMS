using System;
using System.Threading.Tasks;
using Application.Nurses;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class NursesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetNurses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //Nurses/id
        public async Task<IActionResult> GetNurse(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateNurse(Nurse nurse)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Nurse = nurse}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNurse(Guid id, Nurse nurse)
        {
            nurse.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Nurse = nurse}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNurse(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}