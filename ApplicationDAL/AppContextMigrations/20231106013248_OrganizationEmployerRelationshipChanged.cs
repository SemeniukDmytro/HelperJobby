#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class OrganizationEmployerRelationshipChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployerAccounts_Organizations_OrganizationId",
                table: "EmployerAccounts");

            migrationBuilder.DropIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployerAccounts");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "EmployerAccounts");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployerAccounts",
                column: "OrganizationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployerAccounts_Organizations_OrganizationId",
                table: "EmployerAccounts",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
