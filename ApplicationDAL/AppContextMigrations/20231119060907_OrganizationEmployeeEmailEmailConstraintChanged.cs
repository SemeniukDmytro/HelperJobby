#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class OrganizationEmployeeEmailEmailConstraintChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrganizationEmployeeEmails_Email",
                table: "OrganizationEmployeeEmails");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEmployeeEmails_Email_OrganizationId",
                table: "OrganizationEmployeeEmails",
                columns: new[] { "Email", "OrganizationId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrganizationEmployeeEmails_Email_OrganizationId",
                table: "OrganizationEmployeeEmails");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEmployeeEmails_Email",
                table: "OrganizationEmployeeEmails",
                column: "Email",
                unique: true);
        }
    }
}
