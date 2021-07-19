using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Medicines
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Medicine Medicine { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Medicine).SetValidator(new MedicineValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var medicine = await _context.Medicines.FindAsync(request.Medicine.Id);

                if (medicine == null) return null;

                _mapper.Map(request.Medicine, medicine);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update medicine");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}