using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Cities
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
                var city = await _context.Cities.FindAsync(request.Id);

               // if(nurse==null) return null;

                _context.Remove(city);

               var result = await _context.SaveChangesAsync() > 0 ;

               if(!result) return Result<Unit>.Failure("Faild to delete city");

                return Result<Unit>.Success( Unit.Value);
            }
        }
    }
}