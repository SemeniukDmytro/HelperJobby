using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class EmployerIncompleteJobRelationChangedToOneToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IncompleteJob_Employers_EmployerId",
                table: "IncompleteJob");

            migrationBuilder.DropForeignKey(
                name: "FK_IncompleteJobSalary_IncompleteJob_IncompleteJobId",
                table: "IncompleteJobSalary");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IncompleteJobSalary",
                table: "IncompleteJobSalary");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IncompleteJob",
                table: "IncompleteJob");

            migrationBuilder.RenameTable(
                name: "IncompleteJobSalary",
                newName: "IncompleteJobSalaries");

            migrationBuilder.RenameTable(
                name: "IncompleteJob",
                newName: "IncompleteJobs");

            migrationBuilder.RenameIndex(
                name: "IX_IncompleteJobSalary_IncompleteJobId",
                table: "IncompleteJobSalaries",
                newName: "IX_IncompleteJobSalaries_IncompleteJobId");

            migrationBuilder.RenameIndex(
                name: "IX_IncompleteJob_EmployerId",
                table: "IncompleteJobs",
                newName: "IX_IncompleteJobs_EmployerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncompleteJobSalaries",
                table: "IncompleteJobSalaries",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncompleteJobs",
                table: "IncompleteJobs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_IncompleteJobs_Employers_EmployerId",
                table: "IncompleteJobs",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IncompleteJobSalaries_IncompleteJobs_IncompleteJobId",
                table: "IncompleteJobSalaries",
                column: "IncompleteJobId",
                principalTable: "IncompleteJobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IncompleteJobs_Employers_EmployerId",
                table: "IncompleteJobs");

            migrationBuilder.DropForeignKey(
                name: "FK_IncompleteJobSalaries_IncompleteJobs_IncompleteJobId",
                table: "IncompleteJobSalaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IncompleteJobSalaries",
                table: "IncompleteJobSalaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IncompleteJobs",
                table: "IncompleteJobs");

            migrationBuilder.RenameTable(
                name: "IncompleteJobSalaries",
                newName: "IncompleteJobSalary");

            migrationBuilder.RenameTable(
                name: "IncompleteJobs",
                newName: "IncompleteJob");

            migrationBuilder.RenameIndex(
                name: "IX_IncompleteJobSalaries_IncompleteJobId",
                table: "IncompleteJobSalary",
                newName: "IX_IncompleteJobSalary_IncompleteJobId");

            migrationBuilder.RenameIndex(
                name: "IX_IncompleteJobs_EmployerId",
                table: "IncompleteJob",
                newName: "IX_IncompleteJob_EmployerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncompleteJobSalary",
                table: "IncompleteJobSalary",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncompleteJob",
                table: "IncompleteJob",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_IncompleteJob_Employers_EmployerId",
                table: "IncompleteJob",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IncompleteJobSalary_IncompleteJob_IncompleteJobId",
                table: "IncompleteJobSalary",
                column: "IncompleteJobId",
                principalTable: "IncompleteJob",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
