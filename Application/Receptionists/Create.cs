using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Create
    {
        public class Command : IRequest
        {
            public Receptionist Receptionist { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Receptionists.Add(request.Receptionist);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}