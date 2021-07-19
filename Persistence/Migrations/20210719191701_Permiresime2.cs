using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Permiresime2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Doctor",
                table: "Therapies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Patient",
                table: "Therapies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TherapyName",
                table: "Therapies",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Doctor",
                table: "Therapies");

            migrationBuilder.DropColumn(
                name: "Patient",
                table: "Therapies");

            migrationBuilder.DropColumn(
                name: "TherapyName",
                table: "Therapies");
        }
    }
}
