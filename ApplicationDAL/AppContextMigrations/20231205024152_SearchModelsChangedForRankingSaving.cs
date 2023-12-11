using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class SearchModelsChangedForRankingSaving : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WordCount",
                table: "ProcessedResumesWords");

            migrationBuilder.DropColumn(
                name: "JobWordOccurrences",
                table: "ProcessedJobsWords");

            migrationBuilder.DropColumn(
                name: "WordCount",
                table: "ProcessedJobsWords");

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "ProcessedResumesWords",
                type: "decimal(6,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "ProcessedJobsWords",
                type: "decimal(6,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ProcessedResumesWords");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ProcessedJobsWords");

            migrationBuilder.AddColumn<int>(
                name: "WordCount",
                table: "ProcessedResumesWords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobWordOccurrences",
                table: "ProcessedJobsWords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WordCount",
                table: "ProcessedJobsWords",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
