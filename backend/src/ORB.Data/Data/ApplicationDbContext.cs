﻿// <copyright file="ApplicationDbContext.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ORB.Data.Models.Auth;
using ORB.Data.Models.Resumes;

namespace ORB.Data.Data;

/// <summary>
/// Application database context.
/// </summary>
public class ApplicationDbContext : IdentityDbContext<User>
{
    /// <summary>
    /// Initializes a new instance of the <see cref="ApplicationDbContext"/> class.
    /// </summary>
    /// <param name="options">Options.</param>
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Gets or sets RefreshTokens.
    /// </summary>
    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    /// <summary>
    /// Gets or sets CarInfo.
    /// </summary>
    public virtual DbSet<CarInfo> CarInfo { get; set; }

    /// <summary>
    /// Gets or sets PersonalInfo.
    /// </summary>
    public virtual DbSet<PersonalInfo> PersonalInfo { get; set; }

    /// <summary>
    /// Gets or sets Resumes.
    /// </summary>
    public virtual DbSet<Resume> Resumes { get; set; }

    /// <summary>
    /// Gets or sets Templates.
    /// </summary>
    public virtual DbSet<Template> Templates { get; set; }

    /// <summary>
    /// On model creating.
    /// </summary>
    /// <param name="builder">Builder.</param>
    protected override void OnModelCreating(ModelBuilder builder)
    {

        base.OnModelCreating(builder);
    }
}
