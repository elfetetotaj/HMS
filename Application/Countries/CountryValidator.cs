using Domain;
using FluentValidation;

namespace Application.Countries
{
    public class CountryValidator : AbstractValidator<Country>
    {
        public CountryValidator()
        {
            RuleFor(x => x.CountryName).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Population).NotEmpty();
            RuleFor(x => x.Nation).NotEmpty();
            RuleFor(x => x.Goverment).NotEmpty();
           
        }
    }
}