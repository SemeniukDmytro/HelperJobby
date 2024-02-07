using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class MeetsMinSalaryRequirmentsPropsAddedToSalaryEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "MeetsMinSalaryRequirement",
                table: "JobSalaries",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MeetsMinSalaryRequirement",
                table: "IncompleteJobSalaries",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeetsMinSalaryRequirement",
                table: "JobSalaries");

            migrationBuilder.DropColumn(
                name: "MeetsMinSalaryRequirement",
                table: "IncompleteJobSalaries");
        }
    }
}
