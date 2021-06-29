using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Tech1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TechEmployees",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    emri = table.Column<string>(type: "TEXT", nullable: true),
                    mbiemri = table.Column<string>(type: "TEXT", nullable: true),
                    username = table.Column<string>(type: "TEXT", nullable: true),
                    datelindja = table.Column<DateTime>(type: "TEXT", nullable: false),
                    adresa = table.Column<string>(type: "TEXT", nullable: true),
                    qyteti = table.Column<string>(type: "TEXT", nullable: true),
                    email = table.Column<string>(type: "TEXT", nullable: true),
                    gjinia = table.Column<char>(type: "TEXT", nullable: false),
                    paga = table.Column<int>(type: "INTEGER", nullable: false),
                    department = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechEmployees", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TechEmployees");
        }
    }
}
