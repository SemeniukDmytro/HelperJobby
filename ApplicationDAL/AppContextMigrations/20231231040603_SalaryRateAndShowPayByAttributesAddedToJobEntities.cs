#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class SalaryRateAndShowPayByAttributesAddedToJobEntities : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
                "SalaryRate",
                "Jobs",
                "varchar(9)",
                maxLength: 9,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<string>(
                "ShowPayBy",
                "Jobs",
                "varchar(14)",
                maxLength: 14,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<string>(
                "SalaryRate",
                "CurrentJobCreations",
                "varchar(9)",
                maxLength: 9,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<string>(
                "ShowPayBy",
                "CurrentJobCreations",
                "varchar(14)",
                maxLength: 14,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "SalaryRate",
            "Jobs");

        migrationBuilder.DropColumn(
            "ShowPayBy",
            "Jobs");

        migrationBuilder.DropColumn(
            "SalaryRate",
            "CurrentJobCreations");

        migrationBuilder.DropColumn(
            "ShowPayBy",
            "CurrentJobCreations");
    }
}