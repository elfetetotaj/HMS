using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Departments.Any()) return;
            
            var departments = new List<Department>
            {
                new Department
                {
                    DepartmentName = "Otorinolaringologjia",
                },
                new Department
                {
                    DepartmentName = "Stomatologjia",
                },
            };

            await context.Departments.AddRangeAsync(departments);
            await context.SaveChangesAsync();
        }
    }
}