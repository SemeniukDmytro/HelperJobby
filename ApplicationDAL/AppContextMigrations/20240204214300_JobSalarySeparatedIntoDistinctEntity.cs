#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class JobSalarySeparatedIntoDistinctEntity : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "Salary",
            "Jobs");

        migrationBuilder.DropColumn(
            "SalaryRate",
            "Jobs");

        migrationBuilder.DropColumn(
            "ShowPayBy",
            "Jobs");

        migrationBuilder.DropColumn(
            "Salary",
            "CurrentJobCreations");

        migrationBuilder.DropColumn(
            "SalaryRate",
            "CurrentJobCreations");

        migrationBuilder.DropColumn(
            "ShowPayBy",
            "CurrentJobCreations");

        migrationBuilder.AddColumn<bool>(
            "HasPostedFirstJob",
            "EmployerAccounts",
            "tinyint(1)",
            nullable: false,
            defaultValue: false);

        migrationBuilder.CreateTable(
                "CurrentJobSalaries",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShowPayByOption = table.Column<int>("int", nullable: false),
                    MinimalAmount = table.Column<decimal>("decimal(10,2)", nullable: false),
                    MaximalAmount = table.Column<decimal>("decimal(10,2)", nullable: true),
                    SalaryRate = table.Column<int>("int", nullable: false),
                    CurrentJobId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobSalaries", x => x.Id);
                    table.ForeignKey(
                        "FK_CurrentJobSalaries_CurrentJobCreations_CurrentJobId",
                        x => x.CurrentJobId,
                        "CurrentJobCreations",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "JobSalaries",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShowPayByOption = table.Column<int>("int", nullable: false),
                    MinimalAmount = table.Column<decimal>("decimal(10,2)", nullable: false),
                    MaximalAmount = table.Column<decimal>("decimal(10,2)", nullable: true),
                    SalaryRate = table.Column<int>("int", nullable: false),
                    JobId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSalaries", x => x.Id);
                    table.ForeignKey(
                        "FK_JobSalaries_Jobs_JobId",
                        x => x.JobId,
                        "Jobs",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_CurrentJobSalaries_CurrentJobId",
            "CurrentJobSalaries",
            "CurrentJobId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_JobSalaries_JobId",
            "JobSalaries",
            "JobId",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            "CurrentJobSalaries");

        migrationBuilder.DropTable(
            "JobSalaries");

        migrationBuilder.DropColumn(
            "HasPostedFirstJob",
            "EmployerAccounts");

        migrationBuilder.AddColumn<decimal>(
            "Salary",
            "Jobs",
            "decimal(10,2)",
            nullable: false,
            defaultValue: 0m);

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
                "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<decimal>(
            "Salary",
            "CurrentJobCreations",
            "decimal(10,2)",
            nullable: false,
            defaultValue: 0m);

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
                "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");
    }
}