using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class OrganizationEmployerRelationshipChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployerAccounts_Organizations_OrganizationId",
                table: "EmployeeAccounts");

            migrationBuilder.DropIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployeeAccounts");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "EmployeeAccounts");

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
                principalTable: "EmployeeAccounts",
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
                table: "EmployeeAccounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployeeAccounts",
                column: "OrganizationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployerAccounts_Organizations_OrganizationId",
                table: "EmployeeAccounts",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
