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

            if (context.Cities.Any()) return;
            
            var cities= new List<City>
            {
                new City
                {
                    CityName="Prizren",
                    ZipCode=20000,
                },
                new City
                {
                    CityName="Prishtine",
                    ZipCode=50000,
                },
                new City
                {
                    CityName="Gjakove",
                    ZipCode=80000,
                },
            };

            await context.Cities.AddRangeAsync(cities);
            await context.SaveChangesAsync();

             if (context.Receptionists.Any()) return;
            
            var receptionists= new List<Receptionist>
            {
                new Receptionist
                {
                    Name = "Elfete",
                    lastName = "Totaj",
                    username = "elfetet",
                    password = "",
                    email = "et@gmail.com",
                    dob = DateTime.Now.AddMonths(-1),
                    gender='F',
                    street_address="Mrika",
                    city="Prizren",
                    country="Kosove",
                    postal_code="SE1",
                    phone=044369963,
                    Department="Stomatologji",
                },
                new Receptionist
                {
                    Name = "Erza",
                    lastName = "Shatri",
                    username = "erzash",
                    password = "",
                    email = "es@gmail.com",
                    dob = DateTime.Now.AddMonths(-1),
                    gender='F',
                    street_address="Sami Frasheri",
                    city="Prizren",
                    country="Kosove",
                    postal_code="SE1",
                    phone=044369963,
                    Department="Stomatologji",
                },
            };

            await context.Receptionists.AddRangeAsync(receptionists);
            await context.SaveChangesAsync();
        }
    }
}