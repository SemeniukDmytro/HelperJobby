using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class NumberOfEmployeesAddedInOrganization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfEmployees",
                table: "Organizations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfEmployees",
                table: "Organizations");
        }
    }
}
