#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class EmployerOrganizationRelationshipChanged : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
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

        migrationBuilder.CreateTable(
                "OrganizationEmployeeEmails",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrganizationId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationEmployeeEmails", x => x.Id);
                    table.ForeignKey(
                        "FK_OrganizationEmployeeEmails_Organizations_OrganizationId",
                        x => x.OrganizationId,
                        "Organizations",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_OrganizationId",
            "EmployerAccounts",
            "OrganizationId");

        migrationBuilder.CreateIndex(
            "IX_OrganizationEmployeeEmails_Email",
            "OrganizationEmployeeEmails",
            "Email",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_OrganizationEmployeeEmails_OrganizationId",
            "OrganizationEmployeeEmails",
            "OrganizationId");

        migrationBuilder.AddForeignKey(
            "FK_EmployerAccounts_Organizations_OrganizationId",
            "EmployerAccounts",
            "OrganizationId",
            "Organizations",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_EmployerAccounts_Organizations_OrganizationId",
            "EmployerAccounts");

        migrationBuilder.DropTable(
            "OrganizationEmployeeEmails");

        migrationBuilder.DropIndex(
            "IX_EmployerAccounts_OrganizationId",
            "EmployerAccounts");

        migrationBuilder.DropColumn(
            "OrganizationId",
            "EmployerAccounts");

        migrationBuilder.RenameColumn(
            "Email",
            "EmployerAccounts",
            "ContactEmail");

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
}