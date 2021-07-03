using FluentValidation;
using Domain;

namespace Application.Surgeries
{
    public class SurgeryValidator : AbstractValidator<Surgery>
    {
            public class CommandValidator : AbstractValidator<Surgery>
        {
            public CommandValidator()
            {
                RuleFor(x => x.SurgeryName).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Pagesa).NotEmpty();
                RuleFor(x => x.Terapia).NotEmpty();
            }
        }
        
    }
}