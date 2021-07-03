using System;
using System.Threading.Tasks;
using Application.Medicines;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MedicinesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetMedicines()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //medicines/id
        public async Task<IActionResult> GetMedicine(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMedicine(Medicine medicine)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Medicine = medicine}));
        }

        // [Authorize(Policy = "IsTerminHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditMedicine(Guid id, Medicine medicine)
        {
            medicine.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Medicine = medicine}));
        }

        // [Authorize(Policy = "IsTerminHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicine(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}