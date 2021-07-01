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

namespace Application.Countries
{
    public class List
    {
        public class Query : IRequest<Result<List<Country>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Country>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<Country>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var countries = await _context.Countries
                .ProjectTo<Country>(this.mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<Country>>.Success(countries);
            }
        }
    }
}