using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Nurses
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Nurse Nurse { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Nurse).SetValidator(new NurseValidator());
        

               
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
                var nurse = await _context.Nurses.FindAsync(request.Nurse.id);

                if(nurse==null) return null;

                _mapper.Map(request.Nurse, nurse);

              var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Faild to update nurse!");

                return Result<Unit>.Success( Unit.Value);

                
            }
        }
    }
}