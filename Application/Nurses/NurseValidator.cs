using FluentValidation;
using Domain;

namespace Application.Nurses
{
    public class NurseValidator : AbstractValidator<Nurse>
    {
            public class CommandValidator : AbstractValidator<Nurse>
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