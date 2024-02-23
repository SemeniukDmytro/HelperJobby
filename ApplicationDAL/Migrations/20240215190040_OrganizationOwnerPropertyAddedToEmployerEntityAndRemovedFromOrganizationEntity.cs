using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class OrganizationOwnerPropertyAddedToEmployerEntityAndRemovedFromOrganizationEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizationOwnerId",
                table: "Organizations");

            migrationBuilder.AddColumn<bool>(
                name: "IsOrganizationOwner",
                table: "Employers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOrganizationOwner",
                table: "Employers");

            migrationBuilder.AddColumn<int>(
                name: "OrganizationOwnerId",
                table: "Organizations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
