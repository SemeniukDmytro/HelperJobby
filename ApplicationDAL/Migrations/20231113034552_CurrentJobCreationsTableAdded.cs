using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class CurrentJobCreationsTableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentJobCreation_EmployerAccounts_EmployerAccountId",
                table: "CurrentJobCreation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentJobCreation",
                table: "CurrentJobCreation");

            migrationBuilder.RenameTable(
                name: "CurrentJobCreation",
                newName: "CurrentJobCreations");

            migrationBuilder.RenameIndex(
                name: "IX_CurrentJobCreation_EmployerAccountId",
                table: "CurrentJobCreations",
                newName: "IX_CurrentJobCreations_EmployerAccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentJobCreations",
                table: "CurrentJobCreations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentJobCreations_EmployerAccounts_EmployerAccountId",
                table: "CurrentJobCreations",
                column: "EmployerAccountId",
                principalTable: "EmployerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentJobCreations_EmployerAccounts_EmployerAccountId",
                table: "CurrentJobCreations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrentJobCreations",
                table: "CurrentJobCreations");

            migrationBuilder.RenameTable(
                name: "CurrentJobCreations",
                newName: "CurrentJobCreation");

            migrationBuilder.RenameIndex(
                name: "IX_CurrentJobCreations_EmployerAccountId",
                table: "CurrentJobCreation",
                newName: "IX_CurrentJobCreation_EmployerAccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrentJobCreation",
                table: "CurrentJobCreation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentJobCreation_EmployerAccounts_EmployerAccountId",
                table: "CurrentJobCreation",
                column: "EmployerAccountId",
                principalTable: "EmployerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
