using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.Context;

public class SearchEngineContext : DbContext
{
    public SearchEngineContext(DbContextOptions<SearchEngineContext> options) : base(options)
    {
        
    }
    
    public DbSet<IndexedResumeWord> IndexedResumeWords { get; set; }
    public DbSet<IndexedJobWord> IndexedJobWords { get; set; }
    public DbSet<ProcessedResumeWord> ProcessedResumesWords { get; set; }
    public DbSet<ProcessedJobWord> ProcessedJobsWords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<IndexedJobWord>()
            .HasMany(iw => iw.ProcessedJobWords)
            .WithOne(w => w.IndexedJobWord)
            .HasForeignKey(w => w.IndexedJobWordId);

        modelBuilder.Entity<IndexedJobWord>()
            .HasIndex(iw => iw.Word)
            .IsUnique();

        modelBuilder.Entity<IndexedResumeWord>()
            .HasMany(iw => iw.ProcessedResumeWords)
            .WithOne(w => w.IndexedResumeWord)
            .HasForeignKey(w => w.IndexedResumeWordId);

        modelBuilder.Entity<IndexedResumeWord>()
            .HasIndex(iw => iw.Word)
            .IsUnique();
    }
 }