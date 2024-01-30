#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class DatePostedAttributeAddedToJobEntity : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<DateOnly>(
            "DatePosted",
            "Jobs",
            "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1));
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "DatePosted",
            "Jobs");
    }
}