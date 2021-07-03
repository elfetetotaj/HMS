using Domain;
using FluentValidation;

namespace Application.EmergencyDrivers
{
    public class EmergencyDriverValidator : AbstractValidator<EmergencyDriver>
    {
        public EmergencyDriverValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Surname).NotEmpty();
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.Dateofbirth).NotEmpty();
            RuleFor(x => x.Gender).NotEmpty();
            RuleFor(x => x.Street_address).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.Postal_code).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty();
            RuleFor(x => x.Department).NotEmpty();
           
        }
    }
}