using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Receptionists;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReceptionistsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Receptionist>>> GetReceptionists()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //receptionists/id
        public async Task<ActionResult<Receptionist>> GetReceptionists(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateReceptionist(Receptionist receptionist)
        {
            return Ok(await Mediator.Send(new Create.Command {Receptionist = receptionist}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditReceptionist(Guid id, Receptionist receptionist)
        {
            receptionist.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Receptionist = receptionist}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceptionist(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}