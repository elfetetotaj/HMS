using FluentValidation;
using Domain;

namespace Application.Cities
{
    public class CityValidator : AbstractValidator<City>
    {
            public class CommandValidator : AbstractValidator<City>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.CityName).NotEmpty();
                RuleFor(x => x.ZipCode).NotEmpty();

               
            }
        }
        
    }
}