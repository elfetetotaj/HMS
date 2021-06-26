using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Departments.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var departments = new List<Department>
                {
                    new Department
                    {
                        DepartmentName = "Otorinolaringologjia",
                        DepartmentDescription = "Otorinolaringologjia kujdeset për të gjithë ata pacientë që vuajnë nga problemet me veshin, hundën, kokën dhe qafën",
                        DepartmentAttendees = new List<DepartmentAttendee>
                        {
                            new DepartmentAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new DepartmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Department
                    {
                        DepartmentName = "Stomatologjia",
                        DepartmentDescription = "Stomatologjia kujdeset per probemet me dhembet dhe gojen",
                        DepartmentAttendees = new List<DepartmentAttendee>
                        {
                            new DepartmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new DepartmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                };

                await context.Departments.AddRangeAsync(departments);
                await context.SaveChangesAsync();
            }
        }
        public static async Task SeedDataBlood(DataContext context)
        {
            if (context.BloodTypes.Any()) return;

            var types = new List<BloodType>
            {
                new BloodType
                {
                    type = "A",
                },
                new BloodType
                {
                    type = "A",
                },
                new BloodType
                {
                    type = "AB",
                },
                new BloodType
                {
                    type = "0",
                },
                  new BloodType
                {
                    type = "A-",
                },
                  new BloodType
                {
                    type = "B-",
                },  new BloodType
                {
                    type = "AB-",
                },  new BloodType
                {
                    type = "0-",
                },
            };

            await context.BloodTypes.AddRangeAsync(types);
            await context.SaveChangesAsync();
        }
        public static async Task SeedDataNurse(DataContext context)
        {
            if (context.Nurses.Any()) return;
            var nurses = new List<Nurse>{

                new Nurse{
                    emri = "Zoja",
                    mbiemri = "Gjeraj",
                    username = "Zogi",
                    datelindja = "2000-04-01",
                    adresa ="Te kullat",
                    qyteti = "Prizren",
                    email="zoja@gmail.com",
                    gjinia =  'F',
                    paga = 200
                },
            };

            await context.Nurses.AddRangeAsync(nurses);
            await context.SaveChangesAsync();

        }

        public static async Task SeedDataReceptionist(DataContext context)
        {
            if (context.Receptionists.Any()) return;

            var receptionists = new List<Receptionist>
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
                    phone="0443699603",
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
                    phone="044369963",
                    Department="Stomatologji",
                },
            };

            await context.Receptionists.AddRangeAsync(receptionists);
            await context.SaveChangesAsync();
        }

        public static async Task SeedDataDoctorInfo(DataContext context)
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
        }

        public static async Task SeedDataPatientInfo(DataContext context)
        {
            if (context.PatientInfo.Any()) return;

            var patientinfo = new List<Patient>
            {
                new Patient
                {
                    p_fname = "Erza",
                    p_lname = "Shatri",
                    dob = DateTime.Now.AddMonths(-1),
                    p_gender = 'F',
                    p_street_address = "C6 Thorne Street",
                    p_city = "London",
                    p_country = "UK",
                    p_postal_code = "SE2",
                    p_phone = "9876345612",
                    p_weight = 50,
                    other_det = "Cancer",
                    p_rdate = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    p_fname = "Elfete",
                    p_lname = "Totaj",
                    dob = DateTime.Now.AddMonths(-3),
                    p_gender = 'F',
                    p_street_address = "C6 Thorne Street",
                    p_city = "Prizren",
                    p_country = "Kosovo",
                    p_postal_code = "90000",
                    p_phone = "9876345612",
                    p_weight = 50,
                    other_det = "Suffer from cold",
                    p_rdate = DateTime.Now.AddMonths(-1),
                },
                new Patient
                {
                    p_fname = "Ibadete",
                    p_lname = "Gashi",
                    dob = DateTime.Now.AddMonths(-1),
                    p_gender = 'F',
                    p_street_address = "C6 Thorne Street",
                    p_city = "London",
                    p_country = "UK",
                    p_postal_code = "SE2",
                    p_phone = "98768795612",
                    p_weight = 50,
                    other_det = "High Blook Pressure",
                    p_rdate = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    p_fname = "Xhastin",
                    p_lname = "Bojaxhiu",
                    dob = DateTime.Now.AddMonths(-1),
                    p_gender = 'M',
                    p_street_address = "C6 Thorne Street",
                    p_city = "London",
                    p_country = "UK",
                    p_postal_code = "SE2",
                    p_phone = "9876345345",
                    p_weight = 73,
                    other_det = "Head ache",
                    p_rdate = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    p_fname = "Sam",
                    p_lname = "Fisher",
                    dob = DateTime.Now.AddMonths(-1),
                    p_gender = 'M',
                    p_street_address = "C6 Thorne Street",
                    p_city = "London",
                    p_country = "UK",
                    p_postal_code = "SE2",
                    p_phone = "9876345612",
                    p_weight = 95,
                    other_det = "Stroke",
                    p_rdate = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    p_fname = "Damiano",
                    p_lname = "David",
                    dob = DateTime.Now.AddMonths(-1),
                    p_gender = 'M',
                    p_street_address = "C6 Thorne Street",
                    p_city = "London",
                    p_country = "UK",
                    p_postal_code = "SE2",
                    p_phone = "9876345612",
                    p_weight = 70,
                    other_det = "Heart ache",
                    p_rdate = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    p_fname = "Emma",
                    p_lname = "Fisher",
                    dob = DateTime.Now.AddMonths(-1),
                    p_gender = 'F',
                    p_street_address = "C6 Thorne Street",
                    p_city = "London",
                    p_country = "UK",
                    p_postal_code = "SE2",
                    p_phone = "9876345612",
                    p_weight = 40,
                    other_det = "High Blook Pressure",
                    p_rdate = DateTime.Now.AddMonths(-3),
                },

            };

            await context.PatientInfo.AddRangeAsync(patientinfo);
            await context.SaveChangesAsync();
        }

        public static async Task SeedDataCity(DataContext context)
        {
            if (context.Cities.Any()) return;

            var cities = new List<City>
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
        }
        public static async Task SeedDataRoom(DataContext context)
        {
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
        }
        
        public static async Task SeedDataTest(DataContext context){
            
            if(context.Tests.Any())return;
            var tests = new List<Test>{
                new Test{
                    emri="Sars-Cov2",                    
                    cmimi=35,
                    pershkrimi="Merret mostra e gjakut"
                }
            };
            await context.Tests.AddRangeAsync(tests);
            await context.SaveChangesAsync();
        }

        public static async Task SeedDataFarmacist(DataContext context){
            
            if(context.Farmacists.Any())return;
            var farmacists = new List<Farmacist>{
                new Farmacist{
                    emri="Ibadete",
                    mbiemri="Gashi",
                    email="dete@gmail.com",
                    dateOfJoining=DateTime.Parse("2005-09-01"),
                    tel=044871508,
                    degree="DPharm"
                }
            };
            await context.Farmacists.AddRangeAsync(farmacists);
            await context.SaveChangesAsync();
        }
    }
}