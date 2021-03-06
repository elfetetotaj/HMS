using Domain;
using FluentValidation;

namespace Application.Departments
{
    public class DepartmentValidator : AbstractValidator<Department>
    {
        public DepartmentValidator()
        {
            RuleFor(x => x.DepartmentName).NotEmpty();
            RuleFor(x => x.DepartmentDescription).NotEmpty().MinimumLength(10); //?
        }
    }
}