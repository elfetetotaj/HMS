using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TechEmployees
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public TechEmployee TechEmployee { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.TechEmployee).SetValidator(new TechEmployeeValidator());
        

               
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
                var techEmployee = await _context.TechEmployees.FindAsync(request.TechEmployee.id);

                if(techEmployee==null) return null;

                _mapper.Map(request.TechEmployee, techEmployee);

              var result = await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Faild to update TechEmployee!");

                return Result<Unit>.Success( Unit.Value);

                
            }
        }
    }
}