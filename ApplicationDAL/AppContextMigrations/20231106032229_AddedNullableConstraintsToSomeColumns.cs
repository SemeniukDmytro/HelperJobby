#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class AddedNullableConstraintsToSomeColumns : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_JobSeekerAccounts_Addresses_AddressId",
            "JobSeekerAccounts");

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

        migrationBuilder.AlterColumn<string>(
                "PhoneNumber",
                "JobSeekerAccounts",
                "varchar(15)",
                maxLength: 15,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldMaxLength: 15)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "LastName",
                "JobSeekerAccounts",
                "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "FirstName",
                "JobSeekerAccounts",
                "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<int>(
            "AddressId",
            "JobSeekerAccounts",
            "int",
            nullable: true,
            oldClrType: typeof(int),
            oldType: "int");

        migrationBuilder.AddForeignKey(
            "FK_JobSeekerAccounts_Addresses_AddressId",
            "JobSeekerAccounts",
            "AddressId",
            "Addresses",
            principalColumn: "Id");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_JobSeekerAccounts_Addresses_AddressId",
            "JobSeekerAccounts");

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

        migrationBuilder.UpdateData(
            "JobSeekerAccounts",
            "PhoneNumber",
            null,
            "PhoneNumber",
            "");

        migrationBuilder.AlterColumn<string>(
                "PhoneNumber",
                "JobSeekerAccounts",
                "varchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldMaxLength: 15,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "JobSeekerAccounts",
            "LastName",
            null,
            "LastName",
            "");

        migrationBuilder.AlterColumn<string>(
                "LastName",
                "JobSeekerAccounts",
                "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "JobSeekerAccounts",
            "FirstName",
            null,
            "FirstName",
            "");

        migrationBuilder.AlterColumn<string>(
                "FirstName",
                "JobSeekerAccounts",
                "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<int>(
            "AddressId",
            "JobSeekerAccounts",
            "int",
            nullable: false,
            defaultValue: 0,
            oldClrType: typeof(int),
            oldType: "int",
            oldNullable: true);

        migrationBuilder.AddForeignKey(
            "FK_JobSeekerAccounts_Addresses_AddressId",
            "JobSeekerAccounts",
            "AddressId",
            "Addresses",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}