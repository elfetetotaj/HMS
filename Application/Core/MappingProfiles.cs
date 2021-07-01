using System.Linq;
using Application.Comments;
using Application.Departments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Department, Department>();
            CreateMap<Department, DepartmentDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.DepartmentAttendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<DepartmentAttendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName));
            CreateMap<Receptionist, Receptionist>();
            CreateMap<Patient, Patient>();
            CreateMap<Doctor, Doctor>();
            CreateMap<City, City>();
            CreateMap<BloodType, BloodType>(); 
            CreateMap<Nurse, Nurse>(); 
            CreateMap<Farmacist, Farmacist>(); 
            CreateMap<Test, Test>(); 
            CreateMap<Therapy, Therapy>(); 
            CreateMap<Surgery, Surgery>(); 
            CreateMap<TechEmployee, TechEmployee>(); 



        }
    }
}