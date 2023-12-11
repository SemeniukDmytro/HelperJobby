using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.Context;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        
    }

    public ApplicationContext() : base()
    {
        
    }
    
    public virtual DbSet<Address> Addresses { get; set; }
    public virtual DbSet<Education> Educations { get; set; }
    public virtual DbSet<EmployerAccount> EmployerAccounts { get; set; }
    public virtual DbSet<CurrentJobCreation> CurrentJobCreations { get; set; }
    public virtual DbSet<Interview> Interviews { get; set; }
    public virtual DbSet<Job> Jobs { get; set; }
    public virtual DbSet<JobApply> JobApplies { get; set; }
    public virtual DbSet<JobSeekerAccount> JobSeekerAccounts { get; set; }
    public virtual DbSet<Organization> Organizations { get; set; }
    public virtual DbSet<Resume> Resumes { get; set; }
    public virtual DbSet<SavedJob> SavedJobs { get; set; }
    public virtual DbSet<Skill> Skills { get; set; }
    public virtual DbSet<OrganizationEmployeeEmail> OrganizationEmployeeEmails { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<WorkExperience> WorkExperiences { get; set; }
    public DbSet<ResumeIndexedWord> IndexedResumeWords { get; set; }
    public DbSet<JobIndexedWord> IndexedJobWords { get; set; }
    public DbSet<ProcessedResumeWord> ProcessedResumesWords { get; set; }
    public DbSet<ProcessedJobWord> ProcessedJobsWords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasOne(u => u.JobSeekerAccount)
            .WithOne(jsa => jsa.User)
            .HasForeignKey<JobSeekerAccount>(jsa => jsa.UserId)
            .IsRequired();
        
        modelBuilder.Entity<User>()
            .HasOne(u => u.EmployerAccount)
            .WithOne(ea => ea.User)
            .HasForeignKey<EmployerAccount>(ea => ea.UserId)
            .IsRequired();

        modelBuilder.Entity<JobSeekerAccount>()
            .HasIndex(jsa => jsa.PhoneNumber)
            .IsUnique();
        
        modelBuilder.Entity<JobSeekerAccount>()
            .HasOne(a => a.Address)
            .WithMany()
            .HasForeignKey(jsa => jsa.AddressId);

        modelBuilder.Entity<JobSeekerAccount>()
            .HasOne(jsa => jsa.Resume)
            .WithOne(r => r.JobSeekerAccount)
            .HasForeignKey<Resume>(r => r.JobSeekerAccountId)
            .IsRequired();

        modelBuilder.Entity<EmployerAccount>()
            .HasIndex(e => e.Email)
            .IsUnique();

        modelBuilder.Entity<EmployerAccount>().HasOne(ea => ea.Organization)
            .WithMany(o => o.EmployeeAccounts)
            .HasForeignKey(o => o.OrganizationId)
            .IsRequired();

        modelBuilder.Entity<EmployerAccount>()
            .HasOne(ea => ea.CurrentJobCreation)
            .WithOne(cj => cj.EmployerAccount)
            .HasForeignKey<CurrentJobCreation>(cj => cj.EmployerAccountId)
            .IsRequired();
        
        modelBuilder.Entity<Organization>()
            .HasIndex(o => o.PhoneNumber)
            .IsUnique();

        modelBuilder.Entity<Organization>()
            .HasMany(o => o.EmployeeEmails)
            .WithOne(ee => ee.Organization)
            .HasForeignKey(ee => ee.OrganizationId);

        modelBuilder.Entity<OrganizationEmployeeEmail>()
            .HasIndex(ee => new {ee.Email, ee.OrganizationId})
            .IsUnique();
        
        modelBuilder.Entity<Job>()
            .HasOne(j => j.EmployerAccount)
            .WithMany(ea => ea.Jobs)
            .HasForeignKey(j => j.EmployerAccountId);

        modelBuilder.Entity<Resume>()
            .HasMany(r => r.Educations)
            .WithOne(e => e.Resume)
            .HasForeignKey(e => e.ResumeId);
        
        modelBuilder.Entity<Resume>()
            .HasMany(r => r.WorkExperiences)
            .WithOne(we => we.Resume)
            .HasForeignKey(we => we.ResumeId);
        
        modelBuilder.Entity<Resume>()
            .HasMany(r => r.Skills)
            .WithOne(s => s.Resume)
            .HasForeignKey(s => s.ResumeId);
        
        modelBuilder.Entity<SavedJob>()
            .HasKey(e => new { e.JobId, e.JobSeekerAccountId });

        modelBuilder.Entity<SavedJob>()
            .HasOne(sj => sj.Job)
            .WithMany()
            .HasForeignKey(sj => sj.JobId);

        modelBuilder.Entity<SavedJob>()
            .HasOne(sj => sj.JobSeekerAccount)
            .WithMany(jsa => jsa.SavedJobs)
            .HasForeignKey(sj => sj.JobSeekerAccountId);
        
        modelBuilder.Entity<Interview>()
            .HasKey(e => new { e.JobId, e.JobSeekerAccountId });

        modelBuilder.Entity<Interview>()
            .HasOne(i => i.Job)
            .WithMany(j => j.Interviews)
            .HasForeignKey(i => i.JobId);

        modelBuilder.Entity<Interview>()
            .HasOne(i => i.JobSeekerAccount)
            .WithMany(jsa => jsa.Interviews)
            .HasForeignKey(i => i.JobSeekerAccountId);
        
        modelBuilder.Entity<JobApply>()
            .HasKey(e => new { e.JobId, e.JobSeekerAccountId });

        modelBuilder.Entity<JobApply>()
            .HasOne(ja => ja.Job)
            .WithMany(j => j.JobApplies)
            .HasForeignKey(ja => ja.JobId);

        modelBuilder.Entity<JobApply>()
            .HasOne(ja => ja.JobSeekerAccount)
            .WithMany(j => j.JobApplies)
            .HasForeignKey(ja => ja.JobSeekerAccountId);
        
        modelBuilder.Entity<JobIndexedWord>()
            .HasMany(iw => iw.ProcessedJobWords)
            .WithOne(w => w.JobIndexedWord)
            .HasForeignKey(w => w.JobIndexedWordId);

        modelBuilder.Entity<JobIndexedWord>()
            .HasIndex(iw => iw.Word)
            .IsUnique();

        modelBuilder.Entity<ResumeIndexedWord>()
            .HasMany(iw => iw.ProcessedResumeWords)
            .WithOne(w => w.ResumeIndexedWord)
            .HasForeignKey(w => w.ResumeIndexedWordId);

        modelBuilder.Entity<ResumeIndexedWord>()
            .HasIndex(iw => iw.Word)
            .IsUnique();

        modelBuilder.Entity<ProcessedJobWord>()
            .HasOne(pw => pw.Job)
            .WithMany()
            .HasForeignKey(pw => pw.JobId);

        modelBuilder.Entity<ProcessedResumeWord>()
            .HasOne(pw => pw.Resume)
            .WithMany()
            .HasForeignKey(pw => pw.ResumeId);

    }
    
}