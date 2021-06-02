using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Receptionist Receptionist { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var receptionist = await _context.Receptionists.FindAsync(request.Receptionist.Id);

                _mapper.Map(request.Receptionist, receptionist);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}