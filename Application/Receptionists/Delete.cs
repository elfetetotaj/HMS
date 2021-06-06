using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var receptionist = await _context.Receptionists.FindAsync(request.Id);

                _context.Remove(receptionist);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}