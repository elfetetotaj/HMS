using FluentValidation;
using Domain;

namespace Application.Tests
{
    public class TestValidator : AbstractValidator<Test>
    {
            public class CommandValidator : AbstractValidator<Test>
        {
            public CommandValidator()
            {
                RuleFor(x => x.emri).NotEmpty();
                RuleFor(x => x.cmimi).NotEmpty();
                RuleFor(x => x.pershkrimi).NotEmpty();
           

               
            }
        }
        
    }
}