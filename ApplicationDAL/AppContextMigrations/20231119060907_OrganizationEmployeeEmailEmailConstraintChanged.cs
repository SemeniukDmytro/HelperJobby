#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class OrganizationEmployeeEmailEmailConstraintChanged : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            "IX_OrganizationEmployeeEmails_Email",
            "OrganizationEmployeeEmails");

        migrationBuilder.CreateIndex(
            "IX_OrganizationEmployeeEmails_Email_OrganizationId",
            "OrganizationEmployeeEmails",
            new[] { "Email", "OrganizationId" },
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            "IX_OrganizationEmployeeEmails_Email_OrganizationId",
            "OrganizationEmployeeEmails");

        migrationBuilder.CreateIndex(
            "IX_OrganizationEmployeeEmails_Email",
            "OrganizationEmployeeEmails",
            "Email",
            unique: true);
    }
}