#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class ContactNumberAddedToEmployerAccount : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
                "ContactNumber",
                "EmployerAccounts",
                "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "ContactNumber",
            "EmployerAccounts");
    }
}