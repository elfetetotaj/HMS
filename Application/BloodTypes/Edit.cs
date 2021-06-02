using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.BloodTypes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public BloodType BloodType { get; set; }
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
                var type = await _context.Cities.FindAsync(request.BloodType.id);

                _mapper.Map(request.BloodType, type);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}