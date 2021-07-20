using FluentValidation;
using Domain;

namespace Application.Therapies
{
    public class TherapyValidator : AbstractValidator<Therapy>
    {
            public class CommandValidator : AbstractValidator<Therapy>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Pershkrimi).NotEmpty();
                RuleFor(x => x.TherapyName).NotEmpty();
                RuleFor(x => x.Doctor).NotEmpty();
                RuleFor(x => x.Patient).NotEmpty();
               
            }
        }
        
    }
}