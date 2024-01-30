#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class SearchModelsChangedForRankingSaving : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "WordCount",
            "ProcessedResumesWords");

        migrationBuilder.DropColumn(
            "JobWordOccurrences",
            "ProcessedJobsWords");

        migrationBuilder.DropColumn(
            "WordCount",
            "ProcessedJobsWords");

        migrationBuilder.AddColumn<decimal>(
            "Rating",
            "ProcessedResumesWords",
            "decimal(6,2)",
            nullable: false,
            defaultValue: 0m);

        migrationBuilder.AddColumn<decimal>(
            "Rating",
            "ProcessedJobsWords",
            "decimal(6,2)",
            nullable: false,
            defaultValue: 0m);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "Rating",
            "ProcessedResumesWords");

        migrationBuilder.DropColumn(
            "Rating",
            "ProcessedJobsWords");

        migrationBuilder.AddColumn<int>(
            "WordCount",
            "ProcessedResumesWords",
            "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<int>(
            "JobWordOccurrences",
            "ProcessedJobsWords",
            "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<int>(
            "WordCount",
            "ProcessedJobsWords",
            "int",
            nullable: false,
            defaultValue: 0);
    }
}