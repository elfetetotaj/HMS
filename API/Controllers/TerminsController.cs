using System;
using System.Threading.Tasks;
using Application.Termins;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TerminsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTermins()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //termins/id
        public async Task<IActionResult> GetTermin(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTermin(Termin termin)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Termin = termin}));
        }

        // [Authorize(Policy = "IsTerminHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTermin(Guid id, Termin termin)
        {
            termin.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Termin = termin}));
        }

        // [Authorize(Policy = "IsTerminHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTermin(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}