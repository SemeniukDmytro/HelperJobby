#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class EmployerIncompleteJobRelationChangedToOneToMany : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_IncompleteJob_Employers_EmployerId",
            "IncompleteJob");

        migrationBuilder.DropForeignKey(
            "FK_IncompleteJobSalary_IncompleteJob_IncompleteJobId",
            "IncompleteJobSalary");

        migrationBuilder.DropPrimaryKey(
            "PK_IncompleteJobSalary",
            "IncompleteJobSalary");

        migrationBuilder.DropPrimaryKey(
            "PK_IncompleteJob",
            "IncompleteJob");

        migrationBuilder.RenameTable(
            "IncompleteJobSalary",
            newName: "IncompleteJobSalaries");

        migrationBuilder.RenameTable(
            "IncompleteJob",
            newName: "IncompleteJobs");

        migrationBuilder.RenameIndex(
            "IX_IncompleteJobSalary_IncompleteJobId",
            table: "IncompleteJobSalaries",
            newName: "IX_IncompleteJobSalaries_IncompleteJobId");

        migrationBuilder.RenameIndex(
            "IX_IncompleteJob_EmployerId",
            table: "IncompleteJobs",
            newName: "IX_IncompleteJobs_EmployerId");

        migrationBuilder.AddPrimaryKey(
            "PK_IncompleteJobSalaries",
            "IncompleteJobSalaries",
            "Id");

        migrationBuilder.AddPrimaryKey(
            "PK_IncompleteJobs",
            "IncompleteJobs",
            "Id");

        migrationBuilder.AddForeignKey(
            "FK_IncompleteJobs_Employers_EmployerId",
            "IncompleteJobs",
            "EmployerId",
            "Employers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_IncompleteJobSalaries_IncompleteJobs_IncompleteJobId",
            "IncompleteJobSalaries",
            "IncompleteJobId",
            "IncompleteJobs",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_IncompleteJobs_Employers_EmployerId",
            "IncompleteJobs");

        migrationBuilder.DropForeignKey(
            "FK_IncompleteJobSalaries_IncompleteJobs_IncompleteJobId",
            "IncompleteJobSalaries");

        migrationBuilder.DropPrimaryKey(
            "PK_IncompleteJobSalaries",
            "IncompleteJobSalaries");

        migrationBuilder.DropPrimaryKey(
            "PK_IncompleteJobs",
            "IncompleteJobs");

        migrationBuilder.RenameTable(
            "IncompleteJobSalaries",
            newName: "IncompleteJobSalary");

        migrationBuilder.RenameTable(
            "IncompleteJobs",
            newName: "IncompleteJob");

        migrationBuilder.RenameIndex(
            "IX_IncompleteJobSalaries_IncompleteJobId",
            table: "IncompleteJobSalary",
            newName: "IX_IncompleteJobSalary_IncompleteJobId");

        migrationBuilder.RenameIndex(
            "IX_IncompleteJobs_EmployerId",
            table: "IncompleteJob",
            newName: "IX_IncompleteJob_EmployerId");

        migrationBuilder.AddPrimaryKey(
            "PK_IncompleteJobSalary",
            "IncompleteJobSalary",
            "Id");

        migrationBuilder.AddPrimaryKey(
            "PK_IncompleteJob",
            "IncompleteJob",
            "Id");

        migrationBuilder.AddForeignKey(
            "FK_IncompleteJob_Employers_EmployerId",
            "IncompleteJob",
            "EmployerId",
            "Employers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_IncompleteJobSalary_IncompleteJob_IncompleteJobId",
            "IncompleteJobSalary",
            "IncompleteJobId",
            "IncompleteJob",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}