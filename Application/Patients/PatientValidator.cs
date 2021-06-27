using Domain;
using FluentValidation;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<Patient>
    {
        public PatientValidator()
        {
            RuleFor(x => x.name).NotEmpty();
            RuleFor(x => x.surname).NotEmpty();
            RuleFor(x => x.dateofbirth).NotEmpty();
            RuleFor(x => x.gender).NotEmpty();
            RuleFor(x => x.street_address).NotEmpty();
            RuleFor(x => x.city).NotEmpty();
            RuleFor(x => x.country).NotEmpty();
            RuleFor(x => x.postal_code).NotEmpty();
            RuleFor(x => x.phone).NotEmpty();
            RuleFor(x => x.weight).NotEmpty();
            RuleFor(x => x.other_det).NotEmpty();
            RuleFor(x => x.register_date).NotEmpty();
           
        }
    }
}