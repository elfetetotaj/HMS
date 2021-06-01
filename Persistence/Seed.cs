using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataReceptionists(DataContext context){


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
              
            };

            await context.Receptionists.AddRangeAsync(receptionists);
            await context.SaveChangesAsync();
        }
    
        public static async Task SeedData(DataContext context)
        {
            

        

             if (context.DoctorInfo.Any()) return;
            
            var doctorinfo = new List<Doctor>
            {
                new Doctor
                {
                    d_fname = "Erza",
                    d_lname = "Shatri",
                    dob = DateTime.Now.AddMonths(-1),
                    d_gender = 'F',
                    d_street_address = "C6 Thorne Street",
                    d_city = "London",
                    d_country = "UK",
                    d_postal_code = "SE2",
                    d_phone = "9876345612",
                    designation="Sr"
                },
                new Doctor
                {
                    d_fname = "Hamza",
                    d_lname = "Pejton",
                    dob = DateTime.Now.AddMonths(-1),
                    d_gender = 'M',
                    d_street_address = "C6 Thorne Street",
                    d_city = "London",
                    d_country = "UK",
                    d_postal_code = "SE2",
                    d_phone = "9876345612",
                    designation="Surgeon"
                },
                new Doctor
                {
                    d_fname = "Don",
                    d_lname = "Joe",
                    dob = DateTime.Now.AddMonths(-1),
                    d_gender = 'M',
                    d_street_address = "C6 Thorne Street",
                    d_city = "London",
                    d_country = "UK",
                    d_postal_code = "SE2",
                    d_phone = "9876345612",
                    designation="Assistant"
                },
                new Doctor
                {
                    d_fname = "Leslie",
                    d_lname = "Johnson",
                    dob = DateTime.Now.AddMonths(-1),
                    d_gender = 'F',
                    d_street_address = "C6 Thorne Street",
                    d_city = "NY",
                    d_country = "US",
                    d_postal_code = "900387",
                    d_phone = "9876345612",
                    designation="Specialist"
                }

        };
             await context.DoctorInfo.AddRangeAsync(doctorinfo);
             await context.SaveChangesAsync();

              if (context.RoomInfo.Any()) return;
            
            var roominfo = new List<Room>
            {
                new Room
                {
                    
                    r_type = "Single",
                    tot_bed = 1,
                    tot_bed_occupied = 1,
                    stauts = "vacant",
                    floor_no = 4,
                },
                new Room
                {
                    
                    r_type = "Duplex",
                    tot_bed = 2,
                    tot_bed_occupied = 1,
                    stauts = "vacant",
                    floor_no = 2,
                },
                new Room
                {
                    
                    r_type = "Triplex",
                    tot_bed = 3,
                    tot_bed_occupied = 1,
                    stauts = "vacant",
                    floor_no = 6,
                },
                new Room
                {
                   
                    r_type = "Common",
                    tot_bed = 5,
                    tot_bed_occupied = 5,
                    stauts = "occupied",
                    floor_no = 4,
                },
        };
          await context.RoomInfo.AddRangeAsync(roominfo);
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
                new City
                {
                    CityName="Mitrovic",
                    ZipCode=40000,
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