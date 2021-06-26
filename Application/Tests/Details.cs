using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tests
{
    public class Details
    {
        public class Query : IRequest<Result<Test>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Test>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Test>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Test =  await _context.Tests.FindAsync(request.Id);
                
                return Result<Test>.Success(Test);
         
            }
        }
    }
}