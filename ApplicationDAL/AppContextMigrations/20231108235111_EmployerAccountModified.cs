#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class EmployerAccountModified : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.UpdateData(
            "Organizations",
            "PhoneNumber",
            null,
            "PhoneNumber",
            "");

        migrationBuilder.AlterColumn<string>(
                "PhoneNumber",
                "Organizations",
                "varchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldMaxLength: 15,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<string>(
                "Email",
                "EmployerAccounts",
                "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AddColumn<string>(
                "FullName",
                "EmployerAccounts",
                "varchar(60)",
                maxLength: 60,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_ContactEmail",
            "EmployerAccounts",
            "Email",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            "IX_EmployerAccounts_ContactEmail",
            "EmployerAccounts");

        migrationBuilder.DropColumn(
            "Email",
            "EmployerAccounts");

        migrationBuilder.DropColumn(
            "FullName",
            "EmployerAccounts");

        migrationBuilder.AlterColumn<string>(
                "PhoneNumber",
                "Organizations",
                "varchar(15)",
                maxLength: 15,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldMaxLength: 15)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");
    }
}