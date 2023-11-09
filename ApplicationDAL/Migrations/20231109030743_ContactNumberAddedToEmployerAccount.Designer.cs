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
    [Migration("20231109030743_ContactNumberAddedToEmployerAccount")]
    partial class ContactNumberAddedToEmployerAccount
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

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
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("FieldOfStudy")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<DateOnly>("From")
                        .HasColumnType("date");

                    b.Property<string>("LevelOfEducation")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<int>("ResumeId")
                        .HasColumnType("int");

                    b.Property<string>("SchoolName")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)");

                    b.Property<DateOnly>("To")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("ResumeId");

                    b.ToTable("Educations");
                });

            modelBuilder.Entity("ApplicationDomain.Models.EmployerAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("ContactNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("varchar(60)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("EmployerAccounts");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Interview", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("JobSeekerAccountId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime(6)");

                    b.HasKey("JobId", "JobSeekerAccountId");

                    b.HasIndex("JobSeekerAccountId");

                    b.ToTable("Interviews");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Benefits")
                        .HasColumnType("int");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EmployerAccountId")
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

                    b.Property<int>("NumberOfOpenings")
                        .HasColumnType("int");

                    b.Property<bool>("ResumeRequired")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("Salary")
                        .HasColumnType("decimal(10,2)");

                    b.Property<int>("Schedule")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployerAccountId");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobApply", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("JobSeekerAccountId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime(6)");

                    b.HasKey("JobId", "JobSeekerAccountId");

                    b.HasIndex("JobSeekerAccountId");

                    b.ToTable("JobApplies");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSeekerAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AddressId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("LastName")
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("PhoneNumber")
                        .IsUnique();

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("JobSeekerAccounts");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Organization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("EmployerAccountId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.HasKey("Id");

                    b.HasIndex("EmployerAccountId")
                        .IsUnique();

                    b.HasIndex("PhoneNumber")
                        .IsUnique();

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Resume", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("JobSeekerAccountId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("JobSeekerAccountId")
                        .IsUnique();

                    b.ToTable("Resumes");
                });

            modelBuilder.Entity("ApplicationDomain.Models.SavedJob", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("JobSeekerAccountId")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.HasKey("JobId", "JobSeekerAccountId");

                    b.HasIndex("JobSeekerAccountId");

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
                    b.Property<int>("WorkExperienceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CityOrProvince")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<bool>("CurrentlyWorkHere")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("varchar(2000)");

                    b.Property<DateTime>("From")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("ResumeId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("To")
                        .HasColumnType("datetime(6)");

                    b.HasKey("WorkExperienceId");

                    b.HasIndex("ResumeId");

                    b.ToTable("WorkExperiences");
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

            modelBuilder.Entity("ApplicationDomain.Models.EmployerAccount", b =>
                {
                    b.HasOne("ApplicationDomain.Models.User", "User")
                        .WithOne("EmployerAccount")
                        .HasForeignKey("ApplicationDomain.Models.EmployerAccount", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Interview", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany("Interviews")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.JobSeekerAccount", "JobSeekerAccount")
                        .WithMany("Interviews")
                        .HasForeignKey("JobSeekerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobSeekerAccount");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Job", b =>
                {
                    b.HasOne("ApplicationDomain.Models.EmployerAccount", "EmployerAccount")
                        .WithMany("Jobs")
                        .HasForeignKey("EmployerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployerAccount");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobApply", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany("JobApplies")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.JobSeekerAccount", "JobSeekerAccount")
                        .WithMany("JobApplies")
                        .HasForeignKey("JobSeekerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobSeekerAccount");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSeekerAccount", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");

                    b.HasOne("ApplicationDomain.Models.User", "User")
                        .WithOne("JobSeekerAccount")
                        .HasForeignKey("ApplicationDomain.Models.JobSeekerAccount", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Organization", b =>
                {
                    b.HasOne("ApplicationDomain.Models.EmployerAccount", "EmployerAccount")
                        .WithOne("Organization")
                        .HasForeignKey("ApplicationDomain.Models.Organization", "EmployerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployerAccount");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Resume", b =>
                {
                    b.HasOne("ApplicationDomain.Models.JobSeekerAccount", "JobSeekerAccount")
                        .WithOne("Resume")
                        .HasForeignKey("ApplicationDomain.Models.Resume", "JobSeekerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("JobSeekerAccount");
                });

            modelBuilder.Entity("ApplicationDomain.Models.SavedJob", b =>
                {
                    b.HasOne("ApplicationDomain.Models.Job", "Job")
                        .WithMany()
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApplicationDomain.Models.JobSeekerAccount", "JobSeekerAccount")
                        .WithMany("SavedJobs")
                        .HasForeignKey("JobSeekerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("JobSeekerAccount");
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

            modelBuilder.Entity("ApplicationDomain.Models.EmployerAccount", b =>
                {
                    b.Navigation("Jobs");

                    b.Navigation("Organization")
                        .IsRequired();
                });

            modelBuilder.Entity("ApplicationDomain.Models.Job", b =>
                {
                    b.Navigation("Interviews");

                    b.Navigation("JobApplies");
                });

            modelBuilder.Entity("ApplicationDomain.Models.JobSeekerAccount", b =>
                {
                    b.Navigation("Interviews");

                    b.Navigation("JobApplies");

                    b.Navigation("Resume");

                    b.Navigation("SavedJobs");
                });

            modelBuilder.Entity("ApplicationDomain.Models.Resume", b =>
                {
                    b.Navigation("Educations");

                    b.Navigation("Skills");

                    b.Navigation("WorkExperiences");
                });

            modelBuilder.Entity("ApplicationDomain.Models.User", b =>
                {
                    b.Navigation("EmployerAccount")
                        .IsRequired();

                    b.Navigation("JobSeekerAccount")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
