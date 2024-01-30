#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class UserJobInteractionDateTimePropertiesChangedToDateOnly : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "DateTime",
            "JobApplies");

        migrationBuilder.DropColumn(
            "DateTime",
            "Interviews");

        migrationBuilder.AddColumn<DateOnly>(
            "DateSaved",
            "SavedJobs",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1));

        migrationBuilder.AddColumn<DateOnly>(
            "DateApplied",
            "JobApplies",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1));

        migrationBuilder.AddColumn<DateOnly>(
            "InterviewDate",
            "Interviews",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1));
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "DateSaved",
            "SavedJobs");

        migrationBuilder.DropColumn(
            "DateApplied",
            "JobApplies");

        migrationBuilder.DropColumn(
            "InterviewDate",
            "Interviews");

        migrationBuilder.AddColumn<DateTime>(
            "DateTime",
            "JobApplies",
            "datetime(6)",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            "DateTime",
            "Interviews",
            "datetime(6)",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
    }
}