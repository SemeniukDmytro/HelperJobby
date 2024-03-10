using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class UnreadMessagesPropsRemovedFromDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployersUnreadMessagesCount",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "JobSeekersUnreadMessagesCount",
                table: "Conversations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployersUnreadMessagesCount",
                table: "Conversations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobSeekersUnreadMessagesCount",
                table: "Conversations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
