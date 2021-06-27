using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Patient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomInfo",
                table: "RoomInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PatientInfo",
                table: "PatientInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorInfo",
                table: "DoctorInfo");

            migrationBuilder.RenameTable(
                name: "RoomInfo",
                newName: "Rooms");

            migrationBuilder.RenameTable(
                name: "PatientInfo",
                newName: "Patients");

            migrationBuilder.RenameTable(
                name: "DoctorInfo",
                newName: "Doctors");

            migrationBuilder.RenameColumn(
                name: "tot_bed_occupied",
                table: "Rooms",
                newName: "total_bed_occupied");

            migrationBuilder.RenameColumn(
                name: "tot_bed",
                table: "Rooms",
                newName: "total_bed");

            migrationBuilder.RenameColumn(
                name: "r_type",
                table: "Rooms",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "p_weight",
                table: "Patients",
                newName: "weight");

            migrationBuilder.RenameColumn(
                name: "p_street_address",
                table: "Patients",
                newName: "surname");

            migrationBuilder.RenameColumn(
                name: "p_rdate",
                table: "Patients",
                newName: "register_date");

            migrationBuilder.RenameColumn(
                name: "p_postal_code",
                table: "Patients",
                newName: "street_address");

            migrationBuilder.RenameColumn(
                name: "p_phone",
                table: "Patients",
                newName: "postal_code");

            migrationBuilder.RenameColumn(
                name: "p_lname",
                table: "Patients",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "p_gender",
                table: "Patients",
                newName: "gender");

            migrationBuilder.RenameColumn(
                name: "p_fname",
                table: "Patients",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "p_country",
                table: "Patients",
                newName: "country");

            migrationBuilder.RenameColumn(
                name: "p_city",
                table: "Patients",
                newName: "city");

            migrationBuilder.RenameColumn(
                name: "dob",
                table: "Patients",
                newName: "dateofbirth");

            migrationBuilder.RenameColumn(
                name: "dob",
                table: "Doctors",
                newName: "gender");

            migrationBuilder.RenameColumn(
                name: "d_street_address",
                table: "Doctors",
                newName: "surname");

            migrationBuilder.RenameColumn(
                name: "d_postal_code",
                table: "Doctors",
                newName: "street_address");

            migrationBuilder.RenameColumn(
                name: "d_phone",
                table: "Doctors",
                newName: "postal_code");

            migrationBuilder.RenameColumn(
                name: "d_lname",
                table: "Doctors",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "d_gender",
                table: "Doctors",
                newName: "dateofbirth");

            migrationBuilder.RenameColumn(
                name: "d_fname",
                table: "Doctors",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "d_country",
                table: "Doctors",
                newName: "country");

            migrationBuilder.RenameColumn(
                name: "d_city",
                table: "Doctors",
                newName: "city");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rooms",
                table: "Rooms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patients",
                table: "Patients",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Doctors",
                table: "Doctors",
                column: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Rooms",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Patients",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Doctors",
                table: "Doctors");

            migrationBuilder.RenameTable(
                name: "Rooms",
                newName: "RoomInfo");

            migrationBuilder.RenameTable(
                name: "Patients",
                newName: "PatientInfo");

            migrationBuilder.RenameTable(
                name: "Doctors",
                newName: "DoctorInfo");

            migrationBuilder.RenameColumn(
                name: "type",
                table: "RoomInfo",
                newName: "r_type");

            migrationBuilder.RenameColumn(
                name: "total_bed_occupied",
                table: "RoomInfo",
                newName: "tot_bed_occupied");

            migrationBuilder.RenameColumn(
                name: "total_bed",
                table: "RoomInfo",
                newName: "tot_bed");

            migrationBuilder.RenameColumn(
                name: "weight",
                table: "PatientInfo",
                newName: "p_weight");

            migrationBuilder.RenameColumn(
                name: "surname",
                table: "PatientInfo",
                newName: "p_street_address");

            migrationBuilder.RenameColumn(
                name: "street_address",
                table: "PatientInfo",
                newName: "p_postal_code");

            migrationBuilder.RenameColumn(
                name: "register_date",
                table: "PatientInfo",
                newName: "p_rdate");

            migrationBuilder.RenameColumn(
                name: "postal_code",
                table: "PatientInfo",
                newName: "p_phone");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "PatientInfo",
                newName: "p_lname");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "PatientInfo",
                newName: "p_fname");

            migrationBuilder.RenameColumn(
                name: "gender",
                table: "PatientInfo",
                newName: "p_gender");

            migrationBuilder.RenameColumn(
                name: "dateofbirth",
                table: "PatientInfo",
                newName: "dob");

            migrationBuilder.RenameColumn(
                name: "country",
                table: "PatientInfo",
                newName: "p_country");

            migrationBuilder.RenameColumn(
                name: "city",
                table: "PatientInfo",
                newName: "p_city");

            migrationBuilder.RenameColumn(
                name: "surname",
                table: "DoctorInfo",
                newName: "d_street_address");

            migrationBuilder.RenameColumn(
                name: "street_address",
                table: "DoctorInfo",
                newName: "d_postal_code");

            migrationBuilder.RenameColumn(
                name: "postal_code",
                table: "DoctorInfo",
                newName: "d_phone");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "DoctorInfo",
                newName: "d_lname");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "DoctorInfo",
                newName: "d_fname");

            migrationBuilder.RenameColumn(
                name: "gender",
                table: "DoctorInfo",
                newName: "dob");

            migrationBuilder.RenameColumn(
                name: "dateofbirth",
                table: "DoctorInfo",
                newName: "d_gender");

            migrationBuilder.RenameColumn(
                name: "country",
                table: "DoctorInfo",
                newName: "d_country");

            migrationBuilder.RenameColumn(
                name: "city",
                table: "DoctorInfo",
                newName: "d_city");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomInfo",
                table: "RoomInfo",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PatientInfo",
                table: "PatientInfo",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorInfo",
                table: "DoctorInfo",
                column: "id");
        }
    }
}
