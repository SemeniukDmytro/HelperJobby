using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class TempMigrationToFixMessageSenderRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Employers_EmployerId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_JobSeekers_JobSeekerId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_EmployerId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_JobSeekerId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "JobSeekerId",
                table: "Messages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployerId",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobSeekerId",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_EmployerId",
                table: "Messages",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_JobSeekerId",
                table: "Messages",
                column: "JobSeekerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Employers_EmployerId",
                table: "Messages",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_JobSeekers_JobSeekerId",
                table: "Messages",
                column: "JobSeekerId",
                principalTable: "JobSeekers",
                principalColumn: "Id");
        }
    }
}
