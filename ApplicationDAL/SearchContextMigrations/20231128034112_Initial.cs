using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.SearchContextMigrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IndexedJobWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Word = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndexedJobWords", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IndexedResumeWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Word = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndexedResumeWords", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProcessedJobsWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WordCount = table.Column<int>(type: "int", nullable: false),
                    JobWordOccurrences = table.Column<int>(type: "int", nullable: false),
                    IndexedJobWordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedJobsWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProcessedJobsWords_IndexedJobWords_IndexedJobWordId",
                        column: x => x.IndexedJobWordId,
                        principalTable: "IndexedJobWords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProcessedResumesWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WordCount = table.Column<int>(type: "int", nullable: false),
                    IndexedResumeWordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedResumesWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProcessedResumesWords_IndexedResumeWords_IndexedResumeWordId",
                        column: x => x.IndexedResumeWordId,
                        principalTable: "IndexedResumeWords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_IndexedJobWords_Word",
                table: "IndexedJobWords",
                column: "Word",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_IndexedResumeWords_Word",
                table: "IndexedResumeWords",
                column: "Word",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedJobsWords_IndexedJobWordId",
                table: "ProcessedJobsWords",
                column: "IndexedJobWordId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedResumesWords_IndexedResumeWordId",
                table: "ProcessedResumesWords",
                column: "IndexedResumeWordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcessedJobsWords");

            migrationBuilder.DropTable(
                name: "ProcessedResumesWords");

            migrationBuilder.DropTable(
                name: "IndexedJobWords");

            migrationBuilder.DropTable(
                name: "IndexedResumeWords");
        }
    }
}
