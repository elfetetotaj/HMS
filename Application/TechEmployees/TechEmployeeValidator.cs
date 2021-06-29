using FluentValidation;
using Domain;

namespace Application.TechEmployees
{
    public class TechEmployeeValidator : AbstractValidator<TechEmployee>
    {
            public class CommandValidator : AbstractValidator<TechEmployee>
        {
            public CommandValidator()
            {
                
                RuleFor(x => x.emri).NotEmpty();
                RuleFor(x => x.mbiemri).NotEmpty();
                RuleFor(x => x.adresa).NotEmpty();
                RuleFor(x => x.datelindja).NotEmpty();
                RuleFor(x => x.email).NotEmpty();
                RuleFor(x => x.paga).NotEmpty();
                RuleFor(x => x.qyteti).NotEmpty();
                RuleFor(x => x.username).NotEmpty();
                RuleFor(x => x.gjinia).NotEmpty();
                RuleFor(x => x.department).NotEmpty();

               
            }
        }
        
    }
}