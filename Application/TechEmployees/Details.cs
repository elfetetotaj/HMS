using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.TechEmployees
{
    public class Details
    {
        public class Query : IRequest<Result<TechEmployee>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TechEmployee>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<TechEmployee>> Handle(Query request, CancellationToken cancellationToken)
            {
                var TechEmployee =  await _context.TechEmployees.FindAsync(request.Id);
                
                return Result<TechEmployee>.Success(TechEmployee);
         
            }
        }
    }
}