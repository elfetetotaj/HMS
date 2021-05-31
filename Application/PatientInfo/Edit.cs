using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.PatientInfo
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Patient Patinet { get; set; }
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
                var patient = await _context.PatientInfo.FindAsync(request.Patinet.Id);

                _mapper.Map(request.Patinet, patient);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}