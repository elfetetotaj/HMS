using System;
using System.Threading.Tasks;
using Application.Doctors;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class DoctorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //Doctors/id
        public async Task<IActionResult> GetDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor(Doctor doctor)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Doctor = doctor}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDoctor(Guid id, Doctor doctor)
        {
            doctor.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Doctor = doctor}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }//
}