using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Therapies
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Therapy Therapy { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Therapy).SetValidator(new TherapyValidator());
        

               
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
                var Therapy = await _context.Therapies.FindAsync(request.Therapy.id);

                if(Therapy==null) return null;

                _mapper.Map(request.Therapy, Therapy);

              var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Faild to update Therapy!");

                return Result<Unit>.Success( Unit.Value);

                
            }
        }
    }
}