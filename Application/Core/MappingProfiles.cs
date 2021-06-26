using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Department, Department>();
            CreateMap<Receptionist, Receptionist>();
            CreateMap<Patient, Patient>();
            CreateMap<City, City>();
            CreateMap<BloodType, BloodType>(); 
            CreateMap<Nurse, Nurse>(); 
            CreateMap<Farmacist, Farmacist>(); 



        }
    }
}