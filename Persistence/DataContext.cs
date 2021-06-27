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
        public DbSet<DepartmentAttendee> DepartmentAttendees { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DepartmentAttendee>(x => x.HasKey(aa => new {aa.AppUserId, aa.DepartmentId}));

            builder.Entity<DepartmentAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Departments)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<DepartmentAttendee>()
                .HasOne(u => u.Department)
                .WithMany(a => a.DepartmentAttendees)
                .HasForeignKey(aa => aa.DepartmentId);
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Receptionist> Receptionists { get; set; }
        public DbSet<Nurse> Nurses { get; set; }
        public DbSet<BloodType> BloodTypes { get; set; }
        public DbSet<Farmacist> Farmacists { get; set; }
        public DbSet<Test> Tests { get; set; }

    }
}