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
        public DbSet<City> Cities { get; set; }
        public DbSet<Receptionist> Receptionists { get; set; }

        
    }
}