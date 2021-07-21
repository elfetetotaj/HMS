using Domain;
using FluentValidation;

namespace Application.Cities
{
    public class CityValidator : AbstractValidator<City>
    {
        public CityValidator()
        {
            RuleFor(x => x.cityName).NotEmpty();
            RuleFor(x => x.zipCode).NotEmpty();
        }
    }
} 