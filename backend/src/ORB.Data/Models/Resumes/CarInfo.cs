// <copyright file="CarInfo.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ORB.Data.Models.Resumes;

/// <summary>
/// Represents CarInfo of a person in a resume.
/// </summary>
public class CarInfo
{
    /// <summary>
    /// Gets or sets identifier of CarInfo.
    /// </summary>
    [Required]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    /// <summary>
    /// Gets or sets name of the brand.
    /// </summary>
    [Required]
    public string Brand { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets model obtained.
    /// </summary>
    [Required]
    public string Model { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets year of manufacture of the degree program.
    /// </summary>
    [Required]
    public string YearOfManufacture { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets description of the CarInfo program.
    /// </summary>
    /// 
    public string? Description { get; set; } = null;

    /// <summary>
    /// Gets or sets km traveled of the CarInfo program.
    /// </summary>
    /// 
    public string? Distance { get; set; } = null;

    /// <summary>
    /// Gets or sets color of the CarInfo program.
    /// </summary>
    /// 

    public string? Color { get; set; } = null;

    /// <summary>
    /// Gets or sets price of the CarInfo program.
    /// </summary>
    /// 
    [Required]
    public string Price { get; set; } = string.Empty;


    /// <summary>
    /// Gets or sets engine of the CarInfo program.
    /// </summary>
    [Required]
    public string Engine { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets status of the CarInfo program.
    /// </summary>
    public string? Status { get; set; } = null;

    /// <summary>
    /// Gets or sets the URL of car's image.
    /// </summary>
    [AllowNull]
    public string? CarImageURL { get; set; } = null;
}
