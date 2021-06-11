using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Receptionist Receptionist { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Receptionist).SetValidator(new ReceptionistValidator());
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
                var receptionist = await _context.Receptionists.FindAsync(request.Receptionist.Id);
                if(receptionist == null) return null;

                _mapper.Map(request.Receptionist, receptionist);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failture("Failed to update receptionist!");

                return Result<Unit>.Succsess(Unit.Value);
            }
        }
    }
}