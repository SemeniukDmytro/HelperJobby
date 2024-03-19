#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class LocationSpecificationPropertiesAddedToJobEntities : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<int>(
            "JobLocationType",
            "Jobs",
            "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<string>(
                "LocationCountry",
                "Jobs",
                "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<int>(
            "JobLocationType",
            "IncompleteJobs",
            "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<string>(
                "LocationCountry",
                "IncompleteJobs",
                "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "JobLocationType",
            "Jobs");

        migrationBuilder.DropColumn(
            "LocationCountry",
            "Jobs");

        migrationBuilder.DropColumn(
            "JobLocationType",
            "IncompleteJobs");

        migrationBuilder.DropColumn(
            "LocationCountry",
            "IncompleteJobs");
    }
}