using System;
using System.Threading.Tasks;
using Application.EmergencyDrivers;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class EmergencyDriversController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEmergencyDrivers()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //EmergencyDrivers/id
        public async Task<IActionResult> GetEmergencyDriver(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmergencyDriver(EmergencyDriver emergencyDriver)
        {
            return HandleResult(await Mediator.Send(new Create.Command { EmergencyDriver = emergencyDriver}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmergencyDriver(Guid id, EmergencyDriver emergencyDriver)
        {
            emergencyDriver.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { EmergencyDriver = emergencyDriver}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmergencyDriver(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }//
}