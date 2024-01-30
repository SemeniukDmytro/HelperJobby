#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class FixedNullableConstraintsInEducationAndWorkExperience : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<DateOnly>(
            "From",
            "WorkExperiences",
            "date",
            nullable: true,
            oldClrType: typeof(DateOnly),
            oldType: "date");

        migrationBuilder.AlterColumn<DateOnly>(
            "To",
            "Educations",
            "date",
            nullable: true,
            oldClrType: typeof(DateOnly),
            oldType: "date");

        migrationBuilder.AlterColumn<DateOnly>(
            "From",
            "Educations",
            "date",
            nullable: true,
            oldClrType: typeof(DateOnly),
            oldType: "date");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<DateOnly>(
            "From",
            "WorkExperiences",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1),
            oldClrType: typeof(DateOnly),
            oldType: "date",
            oldNullable: true);

        migrationBuilder.AlterColumn<DateOnly>(
            "To",
            "Educations",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1),
            oldClrType: typeof(DateOnly),
            oldType: "date",
            oldNullable: true);

        migrationBuilder.AlterColumn<DateOnly>(
            "From",
            "Educations",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1),
            oldClrType: typeof(DateOnly),
            oldType: "date",
            oldNullable: true);
    }
}