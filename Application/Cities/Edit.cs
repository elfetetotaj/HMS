using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public City City { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var city = await _context.Cities.FindAsync(request.City.CityId);

                _mapper.Map(request.City, city);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}