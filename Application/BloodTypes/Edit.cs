using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.BloodTypes
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BloodType BloodType { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BloodType).SetValidator(new BloodTypeValidator());
        

               
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
                var bloodType = await _context.BloodTypes.FindAsync(request.BloodType.id);

                if(bloodType==null) return null;

                _mapper.Map(request.BloodType, bloodType);

              var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Faild to update BloodType!");

                return Result<Unit>.Success( Unit.Value);

                
            }
        }
    }
}