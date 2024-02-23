#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class UniqueConstraintRemovedFromEmployerEmail : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            "IX_EmployerAccounts_ContactEmail",
            "EmployerAccounts");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_ContactEmail",
            "EmployerAccounts",
            "Email",
            unique: true);
    }
}