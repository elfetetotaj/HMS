using System.Collections.Generic;
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
    public class List
    {
        public class Query : IRequest<Result<List<Termin>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Termin>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<Termin>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var termins = await _context.Termins
                .ProjectTo<Termin>(this.mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<Termin>>.Success(termins);
            }
        }
    }
}