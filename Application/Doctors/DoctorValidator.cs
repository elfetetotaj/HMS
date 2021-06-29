using Domain;
using FluentValidation;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<Doctor>
    {
        public DoctorValidator()
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
            RuleFor(x => x.designation).NotEmpty();
           
        }
    }
}