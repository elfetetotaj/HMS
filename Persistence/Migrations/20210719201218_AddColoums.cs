using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddColoums : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Doctor",
                table: "Surgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Patient",
                table: "Surgeries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "patient",
                table: "Receptionists",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Doctor",
                table: "Surgeries");

            migrationBuilder.DropColumn(
                name: "Patient",
                table: "Surgeries");

            migrationBuilder.DropColumn(
                name: "patient",
                table: "Receptionists");
        }
    }
}
