using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Termins
{
    public class Details
    {
        public class Query : IRequest<Result<Termin>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Termin>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Termin>> Handle(Query request, CancellationToken cancellationToken)
            {
                var termin = await _context.Termins.FindAsync(request.Id);

                return Result<Termin>.Success(termin);
            }
        }
    }
}