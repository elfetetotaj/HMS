using Domain;
using FluentValidation;

namespace Application.Countries
{
    public class CountryValidator : AbstractValidator<Country>
    {
        public CountryValidator()
        {
            RuleFor(x => x.CountryName).NotEmpty();
            RuleFor(x => x.LatLong).NotEmpty();
            RuleFor(x => x.Population).NotEmpty();
            RuleFor(x => x.Area).NotEmpty();
            RuleFor(x => x.TimeZone).NotEmpty();
            RuleFor(x => x.CallingCode).NotEmpty();
            RuleFor(x => x.Capital).NotEmpty();
            RuleFor(x => x.Continent).NotEmpty();
            RuleFor(x => x.Currency).NotEmpty();
           
        }
    }
}