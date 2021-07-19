using Domain;
using FluentValidation;

namespace Application.Medicines
{
    public class MedicineValidator : AbstractValidator<Medicine>
    {
        public MedicineValidator()
        {
            RuleFor(x => x.MedicineName).NotEmpty();
            RuleFor(x => x.MedicineDescription).NotEmpty();
            RuleFor(x => x.MedicineDepartment).NotEmpty();
            RuleFor(x => x.MedicinePrice).NotEmpty();
        }
    }
}