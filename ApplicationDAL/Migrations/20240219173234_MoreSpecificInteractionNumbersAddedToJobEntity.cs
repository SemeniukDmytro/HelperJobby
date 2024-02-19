using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class MoreSpecificInteractionNumbersAddedToJobEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberOfInterviews",
                table: "Jobs",
                newName: "NumberOfRejectedCandidates");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfContactingCandidates",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfContactingCandidates",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "NumberOfRejectedCandidates",
                table: "Jobs",
                newName: "NumberOfInterviews");
        }
    }
}
