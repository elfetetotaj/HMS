using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Permiresime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nation",
                table: "Countries",
                newName: "TimeZone");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Countries",
                newName: "LatLong");

            migrationBuilder.RenameColumn(
                name: "Goverment",
                table: "Countries",
                newName: "Currency");

            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Cities",
                newName: "zipCode");

            migrationBuilder.RenameColumn(
                name: "CityName",
                table: "Cities",
                newName: "cityName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Cities",
                newName: "id");

            migrationBuilder.AddColumn<string>(
                name: "Area",
                table: "Countries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CallingCode",
                table: "Countries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Capital",
                table: "Countries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Continent",
                table: "Countries",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Area",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "CallingCode",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "Capital",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "Continent",
                table: "Countries");

            migrationBuilder.RenameColumn(
                name: "TimeZone",
                table: "Countries",
                newName: "Nation");

            migrationBuilder.RenameColumn(
                name: "LatLong",
                table: "Countries",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "Currency",
                table: "Countries",
                newName: "Goverment");

            migrationBuilder.RenameColumn(
                name: "zipCode",
                table: "Cities",
                newName: "ZipCode");

            migrationBuilder.RenameColumn(
                name: "cityName",
                table: "Cities",
                newName: "CityName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Cities",
                newName: "Id");
        }
    }
}
