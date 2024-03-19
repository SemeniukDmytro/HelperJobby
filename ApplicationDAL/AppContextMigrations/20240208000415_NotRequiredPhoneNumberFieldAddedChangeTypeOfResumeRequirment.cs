#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class NotRequiredPhoneNumberFieldAddedChangeTypeOfResumeRequirment : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<int>(
            "ResumeRequired",
            "Jobs",
            "int",
            nullable: false,
            oldClrType: typeof(bool),
            oldType: "tinyint(1)");

        migrationBuilder.AddColumn<string>(
                "ContactPhoneNumber",
                "Jobs",
                "varchar(15)",
                maxLength: 15,
                nullable: true)
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<int>(
            "ResumeRequired",
            "IncompleteJobs",
            "int",
            nullable: true,
            oldClrType: typeof(bool),
            oldType: "tinyint(1)",
            oldNullable: true);

        migrationBuilder.AddColumn<string>(
                "ContactPhoneNumber",
                "IncompleteJobs",
                "varchar(15)",
                maxLength: 15,
                nullable: true)
            .Annotation("MySql:CharSet", "utf8mb4");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "ContactPhoneNumber",
            "Jobs");

        migrationBuilder.DropColumn(
            "ContactPhoneNumber",
            "IncompleteJobs");

        migrationBuilder.AlterColumn<bool>(
            "ResumeRequired",
            "Jobs",
            "tinyint(1)",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "int");

        migrationBuilder.AlterColumn<bool>(
            "ResumeRequired",
            "IncompleteJobs",
            "tinyint(1)",
            nullable: true,
            oldClrType: typeof(int),
            oldType: "int",
            oldNullable: true);
    }
}