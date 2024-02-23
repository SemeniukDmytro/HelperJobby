#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class CurrentJobCreationsTableAdded : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_CurrentJobCreation_EmployerAccounts_EmployerAccountId",
            "CurrentJobCreation");

        migrationBuilder.DropPrimaryKey(
            "PK_CurrentJobCreation",
            "CurrentJobCreation");

        migrationBuilder.RenameTable(
            "CurrentJobCreation",
            newName: "CurrentJobCreations");

        migrationBuilder.RenameIndex(
            "IX_CurrentJobCreation_EmployerAccountId",
            table: "CurrentJobCreations",
            newName: "IX_CurrentJobCreations_EmployerAccountId");

        migrationBuilder.AddPrimaryKey(
            "PK_CurrentJobCreations",
            "CurrentJobCreations",
            "Id");

        migrationBuilder.AddForeignKey(
            "FK_CurrentJobCreations_EmployerAccounts_EmployerAccountId",
            "CurrentJobCreations",
            "EmployerAccountId",
            "EmployerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_CurrentJobCreations_EmployerAccounts_EmployerAccountId",
            "CurrentJobCreations");

        migrationBuilder.DropPrimaryKey(
            "PK_CurrentJobCreations",
            "CurrentJobCreations");

        migrationBuilder.RenameTable(
            "CurrentJobCreations",
            newName: "CurrentJobCreation");

        migrationBuilder.RenameIndex(
            "IX_CurrentJobCreations_EmployerAccountId",
            table: "CurrentJobCreation",
            newName: "IX_CurrentJobCreation_EmployerAccountId");

        migrationBuilder.AddPrimaryKey(
            "PK_CurrentJobCreation",
            "CurrentJobCreation",
            "Id");

        migrationBuilder.AddForeignKey(
            "FK_CurrentJobCreation_EmployerAccounts_EmployerAccountId",
            "CurrentJobCreation",
            "EmployerAccountId",
            "EmployerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}