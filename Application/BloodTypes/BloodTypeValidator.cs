using FluentValidation;
using Domain;

namespace Application.BloodTypes
{
    public class BloodTypeValidator : AbstractValidator<BloodType>
    {
            public class CommandValidator : AbstractValidator<BloodType>
        {
            public CommandValidator()
            {
                RuleFor(x => x.type).NotEmpty();
              

               
            }
        }
        
    }
}