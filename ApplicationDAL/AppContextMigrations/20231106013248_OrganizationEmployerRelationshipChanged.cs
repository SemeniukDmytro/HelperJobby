#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class OrganizationEmployerRelationshipChanged : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_EmployerAccounts_Organizations_OrganizationId",
            "EmployerAccounts");

        migrationBuilder.DropIndex(
            "IX_EmployerAccounts_OrganizationId",
            "EmployerAccounts");

        migrationBuilder.DropColumn(
            "OrganizationId",
            "EmployerAccounts");

        migrationBuilder.AddColumn<int>(
            "EmployerAccountId",
            "Organizations",
            "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.CreateIndex(
            "IX_Organizations_EmployerAccountId",
            "Organizations",
            "EmployerAccountId",
            unique: true);

        migrationBuilder.AddForeignKey(
            "FK_Organizations_EmployerAccounts_EmployerAccountId",
            "Organizations",
            "EmployerAccountId",
            "EmployerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_Organizations_EmployerAccounts_EmployerAccountId",
            "Organizations");

        migrationBuilder.DropIndex(
            "IX_Organizations_EmployerAccountId",
            "Organizations");

        migrationBuilder.DropColumn(
            "EmployerAccountId",
            "Organizations");

        migrationBuilder.AddColumn<int>(
            "OrganizationId",
            "EmployerAccounts",
            "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_OrganizationId",
            "EmployerAccounts",
            "OrganizationId",
            unique: true);

        migrationBuilder.AddForeignKey(
            "FK_EmployerAccounts_Organizations_OrganizationId",
            "EmployerAccounts",
            "OrganizationId",
            "Organizations",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}