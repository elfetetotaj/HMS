using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Department, Department>();
            CreateMap<Patient, Patient>();
            CreateMap<City, City>();
            CreateMap<BloodType, BloodType>();

        }
    }
}