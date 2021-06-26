using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Farmacists
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Farmacist Farmacist { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Farmacist).SetValidator(new FarmacistValidator());
        

               
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var farmacist = await _context.Farmacists.FindAsync(request.Farmacist.Id);

                if(farmacist==null) return null;

                _mapper.Map(request.Farmacist, farmacist);

              var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Faild to update Farmacist!");

                return Result<Unit>.Success( Unit.Value);

                
            }
        }
    }
}