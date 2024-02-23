using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class JobInteractionCountsAddedToJobEntityJobApplyEntityExpandedWithJobApplyStatusProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfInterviews",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfJobApplies",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPeopleHired",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobApplyStatus",
                table: "JobApplies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfInterviews",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "NumberOfJobApplies",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "NumberOfPeopleHired",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobApplyStatus",
                table: "JobApplies");
        }
    }
}
