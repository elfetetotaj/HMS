using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Surgeries
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Surgery Surgery { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Surgery).SetValidator(new SurgeryValidator());
        

               
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
                var Surgery = await _context.Surgeries.FindAsync(request.Surgery.Id);

              //  if(Surgery==null) return null;

                _mapper.Map(request.Surgery, Surgery);

              var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Faild to update Surgery!");

                return Result<Unit>.Success( Unit.Value);

                
            }
        }
    }
}