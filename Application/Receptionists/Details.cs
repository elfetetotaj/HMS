using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Details
    {
        public class Query : IRequest<Result<Receptionist>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Receptionist>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Receptionist>> Handle(Query request, CancellationToken cancellationToken)
            {
                var receptionist = await _context.Receptionists.FindAsync(request.Id);

                return Result<Receptionist>.Succsess(receptionist);
            }
        }
    }
}