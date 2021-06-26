using FluentValidation;
using Domain;

namespace Application.Farmacists
{
    public class FarmacistValidator : AbstractValidator<Farmacist>
    {
            public class CommandValidator : AbstractValidator<Farmacist>
        {
            public CommandValidator()
            {
                RuleFor(x => x.emri).NotEmpty();
                RuleFor(x => x.mbiemri).NotEmpty();
                RuleFor(x => x.email).NotEmpty();
                RuleFor(x => x.tel).NotEmpty();
                RuleFor(x => x.dateOfJoining).NotEmpty();
                RuleFor(x => x.degree).NotEmpty();
     

               
            }
        }
        
    }
}