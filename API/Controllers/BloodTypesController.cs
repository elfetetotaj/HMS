using System;
using System.Threading.Tasks;
using Application.BloodTypes;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class BloodTypesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBloodTypes()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //BloodTypes/id
        public async Task<IActionResult> GetBloodType(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBloodType(BloodType bloodType)
        {
            return HandleResult(await Mediator.Send(new Create.Command {BloodType = bloodType}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBloodType(Guid id, BloodType bloodType)
        {
            bloodType.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{BloodType = bloodType}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodType(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}