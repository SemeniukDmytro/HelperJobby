using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.Context;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
    }


    public DbSet<Address> Addresses { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<Employer> Employers { get; set; }
    public DbSet<IncompleteJob> IncompleteJobs { get; set; }
    public DbSet<Interview> Interviews { get; set; }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<JobApply> JobApplies { get; set; }
    public DbSet<JobSeeker> JobSeekers { get; set; }
    public DbSet<Organization> Organizations { get; set; }
    public DbSet<Resume> Resumes { get; set; }
    public DbSet<SavedJob> SavedJobs { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<OrganizationEmployeeEmail> OrganizationEmployeeEmails { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<WorkExperience> WorkExperiences { get; set; }
    public DbSet<ResumeIndexedWord> IndexedResumeWords { get; set; }
    public DbSet<JobIndexedWord> IndexedJobWords { get; set; }
    public DbSet<ProcessedResumeWord> ProcessedResumesWords { get; set; }
    public DbSet<ProcessedJobWord> ProcessedJobsWords { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<RecentUserSearch> RecentUserSearches { get; set; }
    public DbSet<JobSalary> JobSalaries { get; set; }
    public DbSet<IncompleteJobSalary> IncompleteJobSalaries { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasOne(u => u.JobSeeker)
            .WithOne(jsa => jsa.User)
            .HasForeignKey<JobSeeker>(jsa => jsa.UserId)
            .IsRequired();

        modelBuilder.Entity<User>()
            .HasOne(u => u.Employer)
            .WithOne(ea => ea.User)
            .HasForeignKey<Employer>(ea => ea.UserId)
            .IsRequired();

        modelBuilder.Entity<JobSeeker>()
            .HasOne(a => a.Address)
            .WithMany()
            .HasForeignKey(jsa => jsa.AddressId);

        modelBuilder.Entity<JobSeeker>()
            .HasOne(jsa => jsa.Resume)
            .WithOne(r => r.JobSeeker)
            .HasForeignKey<Resume>(r => r.JobSeekerId)
            .IsRequired();

        modelBuilder.Entity<Employer>()
            .HasIndex(e => e.Email)
            .IsUnique();

        modelBuilder.Entity<Employer>().HasOne(ea => ea.Organization)
            .WithMany(o => o.Employees)
            .HasForeignKey(o => o.OrganizationId)
            .IsRequired();

        modelBuilder.Entity<Employer>()
            .HasOne(ea => ea.IncompleteJob)
            .WithOne(cj => cj.Employer)
            .HasForeignKey<IncompleteJob>(cj => cj.EmployerId)
            .IsRequired();

        modelBuilder.Entity<Organization>()
            .HasMany(o => o.EmployeeEmails)
            .WithOne(ee => ee.Organization)
            .HasForeignKey(ee => ee.OrganizationId);

        modelBuilder.Entity<OrganizationEmployeeEmail>()
            .HasIndex(ee => new { ee.Email, ee.OrganizationId })
            .IsUnique();

        modelBuilder.Entity<Job>()
            .HasOne(j => j.Employer)
            .WithMany(ea => ea.Jobs)
            .HasForeignKey(j => j.EmployerId);

        modelBuilder.Entity<JobSalary>()
            .HasOne(s => s.Job)
            .WithOne(j => j.Salary)
            .HasForeignKey<JobSalary>(s => s.JobId);
            
        modelBuilder.Entity<IncompleteJobSalary>()
            .HasOne(s => s.IncompleteJob)
            .WithOne(j => j.Salary)
            .HasForeignKey<IncompleteJobSalary>(s => s.IncompleteJobId);

        
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
            .HasKey(e => new { e.JobId, JobSeekerAccountId = e.JobSeekerId });

        modelBuilder.Entity<SavedJob>()
            .HasOne(sj => sj.Job)
            .WithMany()
            .HasForeignKey(sj => sj.JobId);

        modelBuilder.Entity<SavedJob>()
            .HasOne(sj => sj.JobSeeker)
            .WithMany(jsa => jsa.SavedJobs)
            .HasForeignKey(sj => sj.JobSeekerId);

        modelBuilder.Entity<Interview>()
            .HasKey(e => new { e.JobId, JobSeekerAccountId = e.JobSeekerId });

        modelBuilder.Entity<Interview>()
            .HasOne(i => i.Job)
            .WithMany(j => j.Interviews)
            .HasForeignKey(i => i.JobId);

        modelBuilder.Entity<Interview>()
            .HasOne(i => i.JobSeeker)
            .WithMany(jsa => jsa.Interviews)
            .HasForeignKey(i => i.JobSeekerId);

        modelBuilder.Entity<JobApply>()
            .HasKey(e => new { e.JobId, JobSeekerAccountId = e.JobSeekerId });

        modelBuilder.Entity<JobApply>()
            .HasOne(ja => ja.Job)
            .WithMany(j => j.JobApplies)
            .HasForeignKey(ja => ja.JobId);

        modelBuilder.Entity<JobApply>()
            .HasOne(ja => ja.JobSeeker)
            .WithMany(j => j.JobApplies)
            .HasForeignKey(ja => ja.JobSeekerId);

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

        modelBuilder.Entity<User>()
            .HasOne(u => u.RefreshToken)
            .WithOne(t => t.User)
            .HasForeignKey<RefreshToken>(t => t.UserId);

        modelBuilder.Entity<RecentUserSearch>()
            .HasOne(rs => rs.User)
            .WithMany(u => u.RecentUserSearches)
            .HasForeignKey(rs => rs.UserId);
    }
}