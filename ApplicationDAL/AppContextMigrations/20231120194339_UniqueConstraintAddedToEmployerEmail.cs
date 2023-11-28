#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class UniqueConstraintAddedToEmployerEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_Email",
                table: "EmployerAccounts",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EmployerAccounts_Email",
                table: "EmployerAccounts");
        }
    }
}
