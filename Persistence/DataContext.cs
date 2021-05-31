using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Department> Departments { get; set; }
         public DbSet<Patient> PatientInfo { get; set; }
         public DbSet<Doctor> DoctorInfo { get; set; }
         public DbSet<Room> RoomInfo { get; set; }
    }
}