#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class AddedNullableToSomeIncompleteJobProperties : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<int>(
            "Schedule",
            "IncompleteJobs",
            "int",
            nullable: true,
            oldClrType: typeof(int),
            oldType: "int");

        migrationBuilder.AlterColumn<bool>(
            "ResumeRequired",
            "IncompleteJobs",
            "tinyint(1)",
            nullable: true,
            oldClrType: typeof(bool),
            oldType: "tinyint(1)");

        migrationBuilder.AlterColumn<int>(
            "JobTypes",
            "IncompleteJobs",
            "int",
            nullable: true,
            oldClrType: typeof(int),
            oldType: "int");

        migrationBuilder.AlterColumn<string>(
                "Description",
                "IncompleteJobs",
                "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text")
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "ContactEmail",
                "IncompleteJobs",
                "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<int>(
            "Benefits",
            "IncompleteJobs",
            "int",
            nullable: true,
            oldClrType: typeof(int),
            oldType: "int");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<int>(
            "Schedule",
            "IncompleteJobs",
            "int",
            nullable: false,
            defaultValue: 0,
            oldClrType: typeof(int),
            oldType: "int",
            oldNullable: true);

        migrationBuilder.AlterColumn<bool>(
            "ResumeRequired",
            "IncompleteJobs",
            "tinyint(1)",
            nullable: false,
            defaultValue: false,
            oldClrType: typeof(bool),
            oldType: "tinyint(1)",
            oldNullable: true);

        migrationBuilder.AlterColumn<int>(
            "JobTypes",
            "IncompleteJobs",
            "int",
            nullable: false,
            defaultValue: 0,
            oldClrType: typeof(int),
            oldType: "int",
            oldNullable: true);

        migrationBuilder.UpdateData(
            "IncompleteJobs",
            "Description",
            null,
            "Description",
            "");

        migrationBuilder.AlterColumn<string>(
                "Description",
                "IncompleteJobs",
                "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "IncompleteJobs",
            "ContactEmail",
            null,
            "ContactEmail",
            "");

        migrationBuilder.AlterColumn<string>(
                "ContactEmail",
                "IncompleteJobs",
                "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<int>(
            "Benefits",
            "IncompleteJobs",
            "int",
            nullable: false,
            defaultValue: 0,
            oldClrType: typeof(int),
            oldType: "int",
            oldNullable: true);
    }
}