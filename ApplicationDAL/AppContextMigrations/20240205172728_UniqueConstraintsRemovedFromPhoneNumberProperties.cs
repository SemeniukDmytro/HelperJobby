#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class UniqueConstraintsRemovedFromPhoneNumberProperties : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            "IX_JobSeekers_PhoneNumber",
            "JobSeekers");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateIndex(
            "IX_JobSeekers_PhoneNumber",
            "JobSeekers",
            "PhoneNumber",
            unique: true);
    }
}