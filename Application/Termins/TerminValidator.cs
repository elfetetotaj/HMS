using Domain;
using FluentValidation;

namespace Application.Termins
{
    public class TerminValidator : AbstractValidator<Termin>
    {
        public TerminValidator()
        {
            RuleFor(x => x.TerminTime).NotEmpty();
            RuleFor(x => x.TerminDescription).NotEmpty();
            RuleFor(x => x.TerminDepartment).NotEmpty();
            RuleFor(x => x.TerminDoctor).NotEmpty();
        }
    }
}