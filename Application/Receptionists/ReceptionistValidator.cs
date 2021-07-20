using Domain;
using FluentValidation;

namespace Application.Receptionists
{
    public class ReceptionistValidator : AbstractValidator<Receptionist>
    {
        public ReceptionistValidator(){
            RuleFor(x => x.Name).NotEmpty().MinimumLength(3);
            RuleFor(x => x.lastName).NotEmpty().MinimumLength(3);
            RuleFor(x => x.username).NotEmpty().MinimumLength(3);
            RuleFor(x => x.password).NotEmpty().MaximumLength(8);
            RuleFor(x => x.Department).NotEmpty();
            RuleFor(x => x.dob).NotEmpty();
            RuleFor(x => x.email).NotEmpty();
            RuleFor(x => x.gender).NotEmpty();
            RuleFor(x => x.phone).NotEmpty();
            RuleFor(x => x.street_address).NotEmpty();
            RuleFor(x => x.postal_code).NotEmpty();
            RuleFor(x => x.patient).NotEmpty();
        }
    }
}