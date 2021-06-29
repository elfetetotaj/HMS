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
               
            }
        }
        
    }
}