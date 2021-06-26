using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Patient> PatientInfo { get; set; }
        public DbSet<Doctor> DoctorInfo { get; set; }
        public DbSet<Room> RoomInfo { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Receptionist> Receptionists { get; set; }
        public DbSet<Nurse> Nurses { get; set; }
        public DbSet<BloodType> BloodTypes { get; set; }
        public DbSet<Farmacist> Farmacists { get; set; }
    }
}