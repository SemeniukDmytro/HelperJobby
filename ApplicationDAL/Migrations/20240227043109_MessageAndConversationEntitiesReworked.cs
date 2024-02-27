using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class MessageAndConversationEntitiesReworked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateIndex(
                name: "IX_Messages_EmployerId",
                table: "Messages",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_JobSeekerId",
                table: "Messages",
                column: "JobSeekerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Employers_EmployerId",
                table: "Conversations",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_JobSeekers_JobSeekerId",
                table: "Conversations",
                column: "JobSeekerId",
                principalTable: "JobSeekers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Jobs_JobId",
                table: "Conversations",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Employers_EmployerId",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_JobSeekers_JobSeekerId",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Jobs_JobId",
                table: "Conversations");

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

            migrationBuilder.DropIndex(
                name: "IX_Conversations_EmployerId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_JobId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_JobSeekerId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "JobSeekerId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "JobSeekerId",
                table: "Conversations");

            migrationBuilder.AddColumn<int>(
                name: "SenderId",
                table: "Messages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ChatMemberships",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ConversationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMemberships", x => new { x.UserId, x.ConversationId });
                    table.ForeignKey(
                        name: "FK_ChatMemberships_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChatMemberships_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMemberships_ConversationId",
                table: "ChatMemberships",
                column: "ConversationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_SenderId",
                table: "Messages",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
