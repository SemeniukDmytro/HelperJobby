using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class NumberOfUnreadMessagesReworkedInConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberOfUnreadMessages",
                table: "Conversations",
                newName: "JobSeekersUnreadMessagesCount");

            migrationBuilder.AddColumn<int>(
                name: "EmployersUnreadMessagesCount",
                table: "Conversations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployersUnreadMessagesCount",
                table: "Conversations");

            migrationBuilder.RenameColumn(
                name: "JobSeekersUnreadMessagesCount",
                table: "Conversations",
                newName: "NumberOfUnreadMessages");
        }
    }
}
