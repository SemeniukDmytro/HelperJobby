#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class InterviewEntityAddedNewAttributes : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "InterviewDate",
            "Interviews");

        migrationBuilder.AddColumn<string>(
                "AppointmentInfo",
                "Interviews",
                "varchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<TimeOnly>(
            "InterviewEnd",
            "Interviews",
            "time(6)",
            nullable: false,
            defaultValue: new TimeOnly(0, 0, 0));

        migrationBuilder.AddColumn<DateTime>(
            "InterviewStart",
            "Interviews",
            "datetime(6)",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<int>(
            "InterviewType",
            "Interviews",
            "int",
            nullable: false,
            defaultValue: 0);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "AppointmentInfo",
            "Interviews");

        migrationBuilder.DropColumn(
            "InterviewEnd",
            "Interviews");

        migrationBuilder.DropColumn(
            "InterviewStart",
            "Interviews");

        migrationBuilder.DropColumn(
            "InterviewType",
            "Interviews");

        migrationBuilder.AddColumn<DateOnly>(
            "InterviewDate",
            "Interviews",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1));
    }
}