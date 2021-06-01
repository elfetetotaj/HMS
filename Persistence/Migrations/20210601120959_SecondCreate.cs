using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SecondCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Receptionists",
                columns: table => new
                {
                    ReceptionistId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    lastName = table.Column<string>(type: "TEXT", nullable: true),
                    username = table.Column<string>(type: "TEXT", nullable: true),
                    password = table.Column<string>(type: "TEXT", nullable: true),
                    email = table.Column<string>(type: "TEXT", nullable: true),
                    dob = table.Column<DateTime>(type: "TEXT", nullable: false),
                    gender = table.Column<char>(type: "TEXT", nullable: false),
                    street_address = table.Column<string>(type: "TEXT", nullable: true),
                    city = table.Column<string>(type: "TEXT", nullable: true),
                    country = table.Column<string>(type: "TEXT", nullable: true),
                    postal_code = table.Column<string>(type: "TEXT", nullable: true),
                    phone = table.Column<int>(type: "INTEGER", nullable: false),
                    Department = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receptionists", x => x.ReceptionistId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Receptionists");
        }
    }
}
