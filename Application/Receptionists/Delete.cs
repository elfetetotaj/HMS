using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var receptionist = await _context.Receptionists.FindAsync(request.Id);

                // if(receptionist == null) return null;

                _context.Remove(receptionist);

               var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failture("Failed to delete the receptionist");
            

                return Result<Unit>.Succsess(Unit.Value);
            }
        }
    }
}