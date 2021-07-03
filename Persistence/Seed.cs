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
                        DepartmentName = "Alergologjia",
                        DepartmentDescription = "Alergologjia merret me parandalimin, diagnostikimin dhe trajtimin e sëmundjeve alergjike",
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
                    new Department
                    {
                        DepartmentName = "Anatomopatologjia",
                        DepartmentDescription = "Anatomia patologjike (Anatomopatologjia) studion sëmundjet përmes ekzaminimit makroskopik të organeve apo mikroskopik të indeve dhe qelizave",
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
                    new Department
                    {
                        DepartmentName = "Anesteziologjia",
                        DepartmentDescription = "Anesteziologjia merret me monitorimin dhe shërbime anesteziologjike për pacientet para dhe pas operacionit",
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
                    new Department
                    {
                        DepartmentName = "Dermatologjia",
                        DepartmentDescription = "Dermatologjia bën diagnostikimin dhe trajtimin e sëmundjeve që prekin lëkurën",
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
                    new Department
                    {
                        DepartmentName = "Endokrinologjia",
                        DepartmentDescription = "Endokrinologjia merret me diagnostikimin dhe trajtimin e sëmundjeve që lidhen me hormonet",
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
                    new Department
                    {
                        DepartmentName = "Gastroenterologjia",
                        DepartmentDescription = "Gastroenterologjia merret me sëmundjet e ezofagut, stomakut, zorrëve të holla, zorrës së trashë dhe rektumit, pankreasit, fshikëzës së tëmthit, kanaleve biliare dhe mëlçisë",
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
                    new Department
                    {
                        DepartmentName = "Gjinekologjia",
                        DepartmentDescription = "Gjinekologjia merret me monitorimin e shtatzënisë dhe trajtim të fertilitetit",
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
                    new Department
                    {
                        DepartmentName = "Hematologjia",
                        DepartmentDescription = "Hematologjia trajton sëmundjet e gjakut dhe organeve që përbëjnë sistemin hematopoietik",
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
                    new Department
                    {
                        DepartmentName = "Kardiokirurgjia",
                        DepartmentDescription = "Kardiokirurgjia merret me sëmundjet e zemrës dhe me çrregullimet e sistemit të çarkullimit të gjakut",
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
                    new Department
                    {
                        DepartmentName = "Neurologjia",
                        DepartmentDescription = "Neurologjia kujdeset për anatominë dhe sistemin nervor të njeriut duke diagnostifikuar dhe trajtuar sëmundjet e sistemit nervor qëndror dhe periferik.",
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
                    new Department
                    {
                        DepartmentName = "Onkologjia",
                        DepartmentDescription = "Onkologjia kujdeset për diagnostikimin dhe përpilimin e planit të trajtimit të pacientëve që vuajnë nga sëmundja e kancerit",
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
                    new Department
                    {
                        DepartmentName = "Ortopedia",
                        DepartmentDescription = "Ortopedia bën diagnostikimin dhe trajtimin e problemeve si: vizitë ortopedike, infiltrim brenda artikulacioneve të gjurit, shpatullës, artocentesi dhe trajtim paravertebral",
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
                    new Department
                    {
                        DepartmentName = "Otorinolaringologjia",
                        DepartmentDescription = "Otorinolaringologjia kujdeset për të gjithë ata pacientë që vuajnë nga problemet me veshin, hundën, kokën dhe qafën",
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
                    new Department
                    {
                        DepartmentName = "Pediatria",
                        DepartmentDescription = "Pediatria merret me zhvillimin, kujdesin dhe sëmundjet e foshnjeve dhe fëmijëve deri në 15 vjeç",
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
                    new Department
                    {
                        DepartmentName = "Pneumologjia",
                        DepartmentDescription = "Pneumologjia trajton sëmundje të ndryshme të rrugëve të frymëmarrjes si: astma, sëmundje pulmonare obstruktike kronike si edhe sëmundje të ndryshme parenkimale dhe vaskulare të mushkërive",
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
                    new Department
                    {
                        DepartmentName = "Reumatologjia",
                        DepartmentDescription = "Reumatologjia bën diagnostifikimin e terpisë për sëmundjet reumatike duke përfshirë rastet e thjeshta deri tek ato më të komplikuarat",
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
                    new Department
                    {
                        DepartmentName = "Stomatologjia",
                        DepartmentDescription = "Stomatologjia kujdeset për çdo problem lidhur me dhëmbët, nofullat dhe gojën në përgjithësi",
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
                    new Department
                    {
                        DepartmentName = "Urologjia",
                        DepartmentDescription = "Urologjia merret me funksionimin dhe problemet e sistemit urinar tek femrat dhe meshkujt dhe me organet reproduktive te meshkujt",
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

        public static async Task SeedDataTermin(DataContext context)
        {
            if (context.Termins.Any()) return;

            var types = new List<Termin>
            {
                new Termin
                {
                    TerminTime = DateTime.Now.AddMonths(1),
                    TerminDescription = "Kontrollë tek dentisti",
                    TerminDepartment = "Stomatologjia",
                    TerminDoctor = "Bob"
                },
            };

            await context.Termins.AddRangeAsync(types);
            await context.SaveChangesAsync();
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
                    datelindja =DateTime.Parse( "2000-04-01"),
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

        public static async Task SeedDataDoctor(DataContext context)
        {

            if (context.Doctors.Any()) return;

            var doctors = new List<Doctor>
            {
                new Doctor
                {
                    name = "Erza",
                    surname = "Shatri",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'F',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    designation="Sr"
                },
                new Doctor
                {
                    name = "Hamza",
                    surname = "Pejton",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'M',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    designation="Surgeon"
                },
                new Doctor
                {
                    name = "Don",
                    surname = "Joe",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'M',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    designation="Assistant"
                },
                new Doctor
                {
                    name = "Leslie",
                    surname = "Johnson",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'F',
                    street_address = "C6 Thorne Street",
                    city = "NY",
                    country = "US",
                    postal_code = "900387",
                    phone = "9876345612",
                    designation="Specialist"
                }

        };
            await context.Doctors.AddRangeAsync(doctors);
            await context.SaveChangesAsync();

        }

        public static async Task SeedDataPatient(DataContext context)
        {
            if (context.Patients.Any()) return;

            var patients = new List<Patient>
            {
                new Patient
                {
                    name = "Erza",
                    surname = "Shatri",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'F',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    weight = 50,
                    other_det = "Cancer",
                    register_date = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    name = "Elfete",
                    surname = "Totaj",
                    dateofbirth = DateTime.Now.AddMonths(-3),
                    gender = 'F',
                    street_address = "C6 Thorne Street",
                    city = "Prizren",
                    country = "Kosovo",
                    postal_code = "90000",
                    phone = "9876345612",
                    weight = 50,
                    other_det = "Suffer from cold",
                    register_date = DateTime.Now.AddMonths(-1),
                },
                new Patient
                {
                    name = "Ibadete",
                    surname = "Gashi",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'F',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "98768795612",
                    weight = 50,
                    other_det = "High Blook Pressure",
                    register_date = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    name = "Xhastin",
                    surname = "Bojagji",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'M',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345345",
                    weight = 73,
                    other_det = "Head ache",
                    register_date = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    name = "Sam",
                    surname = "Fisher",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'M',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    weight = 95,
                    other_det = "Stroke",
                    register_date = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    name = "Damiano",
                    surname = "David",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'M',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    weight = 70,
                    other_det = "Heart ache",
                    register_date = DateTime.Now.AddMonths(-3),
                },
                new Patient
                {
                    name = "Emma",
                    surname = "Fisher",
                    dateofbirth = DateTime.Now.AddMonths(-1),
                    gender = 'F',
                    street_address = "C6 Thorne Street",
                    city = "London",
                    country = "UK",
                    postal_code = "SE2",
                    phone = "9876345612",
                    weight = 40,
                    other_det = "High Blook Pressure",
                    register_date = DateTime.Now.AddMonths(-3),
                },

            };

            await context.Patients.AddRangeAsync(patients);
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
            if (context.Rooms.Any()) return;

            var rooms = new List<Room>
            {
                new Room
                {

                    type = "Single",
                    total_bed = 1,
                    total_bed_occupied = 1,
                    stauts = "vacant",
                    floor_no = 4,
                },
                new Room
                {

                    type = "Duplex",
                    total_bed = 2,
                    total_bed_occupied = 1,
                    stauts = "vacant",
                    floor_no = 2,
                },
                new Room
                {

                    type = "Triplex",
                    total_bed = 3,
                    total_bed_occupied = 1,
                    stauts = "vacant",
                    floor_no = 6,
                },
                new Room
                {

                    type = "Common",
                    total_bed = 5,
                    total_bed_occupied = 5,
                    stauts = "occupied",
                    floor_no = 4,
                },
        };
            await context.Rooms.AddRangeAsync(rooms);
            await context.SaveChangesAsync();
        }

        public static async Task SeedDataTest(DataContext context)
        {

            if (context.Tests.Any()) return;
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

        public static async Task SeedDataFarmacist(DataContext context)
        {

            if (context.Farmacists.Any()) return;
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

        public static async Task SeedDataTherapy(DataContext context)
        {

            if (context.Therapies.Any()) return;
            var therapies = new List<Therapy>{
                new Therapy{
                    Pershkrimi="Paracetamol"
                },
                new Therapy{
                    Pershkrimi="Daleron"
                }

            };
            await context.Therapies.AddRangeAsync(therapies);
            await context.SaveChangesAsync();
        }

        public static async Task SeedDataSurgery(DataContext context)
        {

            if (context.Surgeries.Any()) return;
            var surgeries = new List<Surgery>{
                new Surgery{
                    SurgeryName="Operacion zemre",
                    Date = DateTime.Now.AddMonths(-3),
                    Description="Nderhyrje te lehte ne zemer per qarkullim me te lehte te gjakut.",
                    Pagesa= 100.00,
                    Terapia= "Paracet 2x1 dite pas buke"

                }

            };
            await context.Surgeries.AddRangeAsync(surgeries);
            await context.SaveChangesAsync();
        }

        public static async Task SeedDataTech(DataContext context)
        {

            if (context.TechEmployees.Any()) return;
            var t = new List<TechEmployee>{
                new TechEmployee{
                    emri = "Zoja",
                    mbiemri = "Gjeraj",
                    username = "Zogi",
                    datelindja =DateTime.Parse( "2000-04-01"),
                    adresa ="Te kullat",
                    qyteti = "Prizren",
                    email="zoja@gmail.com",
                    gjinia =  'F',
                    paga = 200,
                    department="dep"


                }

            };
            await context.TechEmployees.AddRangeAsync(t);
            await context.SaveChangesAsync();
        }

         public static async Task SeedDataCountry(DataContext context)
        {

            if (context.Countries.Any()) return;
            var countries = new List<Country>{
                new Country{
                    CountryName="Kosova",
                    Population=1256234,
                }

            };
            await context.Countries.AddRangeAsync(countries);
            await context.SaveChangesAsync();
        }

    }
}