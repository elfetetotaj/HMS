using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class DataCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReceptionistId",
                table: "Receptionists",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "CityId",
                table: "Cities",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "phone",
                table: "Receptionists",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "datelindja",
                table: "Nurses",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Receptionists",
                newName: "ReceptionistId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Cities",
                newName: "CityId");

            migrationBuilder.AlterColumn<int>(
                name: "phone",
                table: "Receptionists",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "datelindja",
                table: "Nurses",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
