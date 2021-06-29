using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Tests
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command , Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var test = await _context.Receptionists.FindAsync(request.Id);

               // if(nurse==null) return null;

                _context.Remove(test);

               var result = await _context.SaveChangesAsync() > 0 ;

               if(!result) return Result<Unit>.Failure("Faild to delete the test");

                return Result<Unit>.Success( Unit.Value);
            }
        }
    }
}