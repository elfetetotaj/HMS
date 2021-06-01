using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ThirdCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DoctorInfo",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    d_fname = table.Column<string>(type: "TEXT", nullable: true),
                    d_lname = table.Column<string>(type: "TEXT", nullable: true),
                    dob = table.Column<DateTime>(type: "TEXT", nullable: false),
                    d_gender = table.Column<char>(type: "TEXT", nullable: false),
                    d_street_address = table.Column<string>(type: "TEXT", nullable: true),
                    d_city = table.Column<string>(type: "TEXT", nullable: true),
                    d_country = table.Column<string>(type: "TEXT", nullable: true),
                    d_postal_code = table.Column<string>(type: "TEXT", nullable: true),
                    d_phone = table.Column<string>(type: "TEXT", nullable: true),
                    designation = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorInfo", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PatientInfo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    p_fname = table.Column<string>(type: "TEXT", nullable: true),
                    p_lname = table.Column<string>(type: "TEXT", nullable: true),
                    dob = table.Column<DateTime>(type: "TEXT", nullable: false),
                    p_gender = table.Column<char>(type: "TEXT", nullable: false),
                    p_street_address = table.Column<string>(type: "TEXT", nullable: true),
                    p_city = table.Column<string>(type: "TEXT", nullable: true),
                    p_country = table.Column<string>(type: "TEXT", nullable: true),
                    p_postal_code = table.Column<string>(type: "TEXT", nullable: true),
                    p_phone = table.Column<string>(type: "TEXT", nullable: true),
                    p_weight = table.Column<int>(type: "INTEGER", nullable: false),
                    other_det = table.Column<string>(type: "TEXT", nullable: true),
                    p_rdate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomInfo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    r_type = table.Column<string>(type: "TEXT", nullable: true),
                    tot_bed = table.Column<int>(type: "INTEGER", nullable: false),
                    tot_bed_occupied = table.Column<int>(type: "INTEGER", nullable: false),
                    stauts = table.Column<string>(type: "TEXT", nullable: true),
                    floor_no = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomInfo", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DoctorInfo");

            migrationBuilder.DropTable(
                name: "PatientInfo");

            migrationBuilder.DropTable(
                name: "RoomInfo");
        }
    }
}
