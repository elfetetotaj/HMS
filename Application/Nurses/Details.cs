using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Nurses
{
    public class Details
    {
        public class Query : IRequest<Result<Nurse>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Nurse>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Nurse>> Handle(Query request, CancellationToken cancellationToken)
            {
                var nurse =  await _context.Nurses.FindAsync(request.Id);
                
                return Result<Nurse>.Success(nurse);
         
            }
        }
    }
}