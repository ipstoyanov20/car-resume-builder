// <copyright file="PersonalInfoIM.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Http;
using ORB.Shared.DataAnnotations;

namespace ORB.Shared.Models.CarInfo;

/// <summary>
/// Represents a Personal Information Input Model.
/// </summary>
public class CarInfoIM
{
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
    [AllowNull]
    public string? Description { get; set; } = null;

    /// <summary>
    /// Gets or sets km traveled of the CarInfo program.
    /// </summary>
    /// 
    [AllowNull]
    public string? Distance { get; set; } = null;

    /// <summary>
    /// Gets or sets color of the CarInfo program.
    /// </summary>
    /// 
    [AllowNull]
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
    [AllowNull]
    public string? Status { get; set; } = null;
    /// <summary>
    /// Gets or sets the image of person.
    /// </summary>
    [Image]
    public IFormFile? CarImage { get; set; }
}
