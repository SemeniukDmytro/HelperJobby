#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class UniqueConstraintRemovedFromEmployerEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EmployerAccounts_ContactEmail",
                table: "EmployerAccounts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_ContactEmail",
                table: "EmployerAccounts",
                column: "Email",
                unique: true);
        }
    }
}
