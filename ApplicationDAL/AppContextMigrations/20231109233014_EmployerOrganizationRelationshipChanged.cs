#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class EmployerOrganizationRelationshipChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organizations_EmployerAccounts_EmployerAccountId",
                table: "Organizations");

            migrationBuilder.DropIndex(
                name: "IX_Organizations_EmployerAccountId",
                table: "Organizations");

            migrationBuilder.DropColumn(
                name: "EmployerAccountId",
                table: "Organizations");

            migrationBuilder.AddColumn<int>(
                name: "OrganizationId",
                table: "EmployerAccounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OrganizationEmployeeEmails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationEmployeeEmails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationEmployeeEmails_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployerAccounts",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEmployeeEmails_Email",
                table: "OrganizationEmployeeEmails",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationEmployeeEmails_OrganizationId",
                table: "OrganizationEmployeeEmails",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployerAccounts_Organizations_OrganizationId",
                table: "EmployerAccounts",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployerAccounts_Organizations_OrganizationId",
                table: "EmployerAccounts");

            migrationBuilder.DropTable(
                name: "OrganizationEmployeeEmails");

            migrationBuilder.DropIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployerAccounts");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "EmployerAccounts");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "EmployerAccounts",
                newName: "ContactEmail");

            migrationBuilder.AddColumn<int>(
                name: "EmployerAccountId",
                table: "Organizations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_EmployerAccountId",
                table: "Organizations",
                column: "EmployerAccountId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Organizations_EmployerAccounts_EmployerAccountId",
                table: "Organizations",
                column: "EmployerAccountId",
                principalTable: "EmployerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
