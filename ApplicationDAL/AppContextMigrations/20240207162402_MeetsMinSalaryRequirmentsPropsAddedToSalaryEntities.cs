#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class MeetsMinSalaryRequirmentsPropsAddedToSalaryEntities : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<bool>(
            "MeetsMinSalaryRequirement",
            "JobSalaries",
            "tinyint(1)",
            nullable: false,
            defaultValue: false);

        migrationBuilder.AddColumn<bool>(
            "MeetsMinSalaryRequirement",
            "IncompleteJobSalaries",
            "tinyint(1)",
            nullable: false,
            defaultValue: false);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "MeetsMinSalaryRequirement",
            "JobSalaries");

        migrationBuilder.DropColumn(
            "MeetsMinSalaryRequirement",
            "IncompleteJobSalaries");
    }
}