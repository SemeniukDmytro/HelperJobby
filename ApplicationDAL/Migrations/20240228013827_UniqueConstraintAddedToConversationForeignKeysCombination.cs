using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class UniqueConstraintAddedToConversationForeignKeysCombination : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_EmployerId_JobSeekerId_JobId",
                table: "Conversations",
                columns: new[] { "EmployerId", "JobSeekerId", "JobId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Conversations_EmployerId_JobSeekerId_JobId",
                table: "Conversations");
        }
    }
}
