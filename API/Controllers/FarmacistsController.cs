using System;
using System.Threading.Tasks;
using Application.Farmacists;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class FarmacistsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetFarmacists()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //Farmacists/id
        public async Task<IActionResult> GetFarmacist(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFarmacist(Farmacist farmacist)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Farmacist = farmacist}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditFarmacist(Guid id, Farmacist farmacist)
        {
            farmacist.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Farmacist = farmacist}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFarmacist(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}