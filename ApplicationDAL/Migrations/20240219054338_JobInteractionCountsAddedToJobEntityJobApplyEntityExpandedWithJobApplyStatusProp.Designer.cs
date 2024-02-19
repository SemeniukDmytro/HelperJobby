﻿// <auto-generated />
using System;
using ApplicationDAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ApplicationDAL.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20240219054338_JobInteractionCountsAddedToJobEntityJobApplyEntityExpandedWithJobApplyStatusProp")]
    partial class JobInteractionCountsAddedToJobEntityJobApplyEntityExpandedWithJobApplyStatusProp
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ApplicationDomain.AuthRelatedModels.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.JobIndexedWord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("JobCount")
                        .HasColumnType("int");

                    b.Property<string>("Word")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)");

                    b.HasKey("Id");

                    b.HasIndex("Word")
                        .IsUnique();

                    b.ToTable("IndexedJobWords");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.ProcessedJobWord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("JobId")
                        .HasColumnType("int");

                    b.Property<int>("JobIndexedWordId")
                        .HasColumnType("int");

                    b.Property<decimal>("Rating")
                        .HasColumnType("decimal(6,2)");

                    b.HasKey("Id");

                    b.HasIndex("JobId");

                    b.HasIndex("JobIndexedWordId");

                    b.ToTable("ProcessedJobsWords");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.ProcessedResumeWord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Rating")
                        .HasColumnType("decimal(6,2)");

                    b.Property<int>("ResumeId")
                        .HasColumnType("int");

                    b.Property<int>("ResumeIndexedWordId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ResumeId");

                    b.HasIndex("ResumeIndexedWordId");

                    b.ToTable("ProcessedResumesWords");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.ResumeIndexedWord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ResumesCount")
                        .HasColumnType("int");

                    b.Property<string>("Word")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)");

                    b.HasKey("Id");

                    b.HasIndex("Word")
                        .IsUnique();

                    b.ToTable("IndexedResumeWords");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)");

                    b.Property<string>("StreetAddress")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Education", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("Country")
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("FieldOfStudy")
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<DateOnly?>("From")
                        .HasColumnType("date");

                    b.Property<string>("LevelOfEducation")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<int>("ResumeId")
                        .HasColumnType("int");

                    b.Property<string>("SchoolName")
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)");

                    b.Property<DateOnly?>("To")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("ResumeId");

                    b.ToTable("Educations");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Employer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ContactNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("varchar(60)");

                    b.Property<bool>("HasPostedFirstJob")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsOrganizationOwner")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("OrganizationId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("OrganizationId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Employers");
                });

            modelBuilder.Entity("ApplicationDomain.Models.IncompleteJob", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("Benefits")
                        .HasColumnType("int");

                    b.Property<string>("ContactEmail")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("ContactPhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

                    b.Property<int>("JobLocationType")
                        .HasColumnType("int");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("JobTypes")
                        .HasColumnType("int");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("LocationCountry")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("NumberOfOpenings")
                        .HasColumnType("int");

                    b.Property<int?>("ResumeRequired")
                        .HasColumnType("int");

                    b.Property<int?>("Schedule")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("IncompleteJobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.IncompleteJobSalary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("IncompleteJobId")
                        .HasColumnType("int");

                    b.Property<decimal?>("MaximalAmount")
                        .HasColumnType("decimal(10,2)");

                    b.Property<bool>("MeetsMinSalaryRequirement")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("MinimalAmount")
                        .HasColumnType("decimal(10,2)");

                    b.Property<int>("SalaryRate")
                        .HasColumnType("int");

                    b.Property<int>("ShowPayByOption")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IncompleteJobId")
                        .IsUnique();

                    b.ToTable("IncompleteJobSalaries");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Interview", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("JobSeekerId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<string>("AppointmentInfo")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<TimeOnly>("InterviewEnd")
                        .HasColumnType("time(6)");

                    b.Property<DateTime>("InterviewStart")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("InterviewType")
                        .HasColumnType("int");

                    b.HasKey("JobId", "JobSeekerId");

                    b.HasIndex("JobSeekerId");

                    b.ToTable("Interviews");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Benefits")
                        .HasColumnType("int");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("ContactPhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<DateOnly>("DatePosted")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

                    b.Property<int>("JobLocationType")
                        .HasColumnType("int");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("JobTypes")
                        .HasColumnType("int");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("LocationCountry")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("NumberOfInterviews")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfJobApplies")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfOpenings")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfPeopleHired")
                        .HasColumnType("int");

                    b.Property<int>("ResumeRequired")
                        .HasColumnType("int");

                    b.Property<int>("Schedule")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobApply", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("JobSeekerId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<DateOnly>("DateApplied")
                        .HasColumnType("date");

                    b.Property<int>("JobApplyStatus")
                        .HasColumnType("int");

                    b.HasKey("JobId", "JobSeekerId");

                    b.HasIndex("JobSeekerId");

                    b.ToTable("JobApplies");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSalary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("JobId")
                        .HasColumnType("int");

                    b.Property<decimal?>("MaximalAmount")
                        .HasColumnType("decimal(10,2)");

                    b.Property<bool>("MeetsMinSalaryRequirement")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("MinimalAmount")
                        .HasColumnType("decimal(10,2)");

                    b.Property<int>("SalaryRate")
                        .HasColumnType("int");

                    b.Property<int>("ShowPayByOption")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("JobId")
                        .IsUnique();

                    b.ToTable("JobSalaries");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSeeker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AddressId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("JobSeekers");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Organization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int?>("NumberOfEmployees")
                        .HasColumnType("int");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.HasKey("Id");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("ApplicationDomain.Models.OrganizationEmployeeEmail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("OrganizationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.HasIndex("Email", "OrganizationId")
                        .IsUnique();

                    b.ToTable("OrganizationEmployeeEmails");
                });

            modelBuilder.Entity("ApplicationDomain.Models.RecentUserSearch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Query")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RecentUserSearches");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Resume", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("JobSeekerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("JobSeekerId")
                        .IsUnique();

                    b.ToTable("Resumes");
                });

            modelBuilder.Entity("ApplicationDomain.Models.SavedJob", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("JobSeekerId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<DateOnly>("DateSaved")
                        .HasColumnType("date");

                    b.HasKey("JobId", "JobSeekerId");

                    b.HasIndex("JobSeekerId");

                    b.ToTable("SavedJobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<int>("ResumeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ResumeId");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("ApplicationDomain.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AccountType")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ApplicationDomain.Models.WorkExperience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CityOrProvince")
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("Company")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Country")
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<bool?>("CurrentlyWorkHere")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Description")
                        .HasMaxLength(2000)
                        .HasColumnType("varchar(2000)");

                    b.Property<DateOnly?>("From")
                        .HasColumnType("date");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("ResumeId")
                        .HasColumnType("int");

                    b.Property<DateOnly?>("To")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("ResumeId");

                    b.ToTable("WorkExperiences");
                });

            modelBuilder.Entity("ApplicationDomain.AuthRelatedModels.RefreshToken", b =>
                {
                    b.HasOne("ApplicationDomain.Models.User", "User")
                        .WithOne("RefreshToken")
                        .HasForeignKey("ApplicationDomain.AuthRelatedModels.RefreshToken", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.ProcessedJobWord", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany()
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.IndexedModels.JobIndexedWord", "JobIndexedWord")
                        .WithMany("ProcessedJobWords")
                        .HasForeignKey("JobIndexedWordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobIndexedWord");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.ProcessedResumeWord", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Resume", "Resume")
                        .WithMany()
                        .HasForeignKey("ResumeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.IndexedModels.ResumeIndexedWord", "ResumeIndexedWord")
                        .WithMany("ProcessedResumeWords")
                        .HasForeignKey("ResumeIndexedWordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Resume");

                    b.Navigation("ResumeIndexedWord");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Education", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Resume", "Resume")
                        .WithMany("Educations")
                        .HasForeignKey("ResumeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Resume");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Employer", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Organization", "Organization")
                        .WithMany("Employees")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.User", "User")
                        .WithOne("Employer")
                        .HasForeignKey("ApplicationDomain.Models.Employer", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organization");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApplicationDomain.Models.IncompleteJob", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Employer", "Employer")
                        .WithMany("IncompleteJobs")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("ApplicationDomain.Models.IncompleteJobSalary", b =>
                {
                    b.HasOne("ApplicationDomain.Models.IncompleteJob", "IncompleteJob")
                        .WithOne("Salary")
                        .HasForeignKey("ApplicationDomain.Models.IncompleteJobSalary", "IncompleteJobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IncompleteJob");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Interview", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany("Interviews")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.JobSeeker", "JobSeeker")
                        .WithMany("Interviews")
                        .HasForeignKey("JobSeekerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobSeeker");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Job", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Employer", "Employer")
                        .WithMany("Jobs")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobApply", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany("JobApplies")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.JobSeeker", "JobSeeker")
                        .WithMany("JobApplies")
                        .HasForeignKey("JobSeekerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobSeeker");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSalary", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithOne("Salary")
                        .HasForeignKey("ApplicationDomain.Models.JobSalary", "JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSeeker", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");

                    b.HasOne("ApplicationDomain.Models.User", "User")
                        .WithOne("JobSeeker")
                        .HasForeignKey("ApplicationDomain.Models.JobSeeker", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApplicationDomain.Models.OrganizationEmployeeEmail", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Organization", "Organization")
                        .WithMany("EmployeeEmails")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organization");
                });

            modelBuilder.Entity("ApplicationDomain.Models.RecentUserSearch", b =>
                {
                    b.HasOne("ApplicationDomain.Models.User", "User")
                        .WithMany("RecentUserSearches")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Resume", b =>
                {
                    b.HasOne("ApplicationDomain.Models.JobSeeker", "JobSeeker")
                        .WithOne("Resume")
                        .HasForeignKey("ApplicationDomain.Models.Resume", "JobSeekerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("JobSeeker");
                });

            modelBuilder.Entity("ApplicationDomain.Models.SavedJob", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany()
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.JobSeeker", "JobSeeker")
                        .WithMany("SavedJobs")
                        .HasForeignKey("JobSeekerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobSeeker");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Skill", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Resume", "Resume")
                        .WithMany("Skills")
                        .HasForeignKey("ResumeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Resume");
                });

            modelBuilder.Entity("ApplicationDomain.Models.WorkExperience", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Resume", "Resume")
                        .WithMany("WorkExperiences")
                        .HasForeignKey("ResumeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Resume");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.JobIndexedWord", b =>
                {
                    b.Navigation("ProcessedJobWords");
                });

            modelBuilder.Entity("ApplicationDomain.IndexedModels.ResumeIndexedWord", b =>
                {
                    b.Navigation("ProcessedResumeWords");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Employer", b =>
                {
                    b.Navigation("IncompleteJobs");

                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.IncompleteJob", b =>
                {
                    b.Navigation("Salary");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Job", b =>
                {
                    b.Navigation("Interviews");

                    b.Navigation("JobApplies");

                    b.Navigation("Salary");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSeeker", b =>
                {
                    b.Navigation("Interviews");

                    b.Navigation("JobApplies");

                    b.Navigation("Resume");

                    b.Navigation("SavedJobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Organization", b =>
                {
                    b.Navigation("EmployeeEmails");

                    b.Navigation("Employees");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Resume", b =>
                {
                    b.Navigation("Educations");

                    b.Navigation("Skills");

                    b.Navigation("WorkExperiences");
                });

            modelBuilder.Entity("ApplicationDomain.Models.User", b =>
                {
                    b.Navigation("Employer");

                    b.Navigation("JobSeeker")
                        .IsRequired();

                    b.Navigation("RecentUserSearches");

                    b.Navigation("RefreshToken")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
