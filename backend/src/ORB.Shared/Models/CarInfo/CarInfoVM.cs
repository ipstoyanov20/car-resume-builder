// <copyright file="EducationVM.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

namespace ORB.Shared.Models.CarInfo;

public class CarInfoVM
{

    /// <summary>
    /// Gets or sets identifier of CarInfo.
    /// </summary>
    
    public string Id { get; set; } = Guid.NewGuid().ToString();

    /// <summary>
    /// Gets or sets name of the brand.
    /// </summary>
    
    public string Brand { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets model obtained.
    /// </summary>
    
    public string Model { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets year of manufacture of the degree program.
    /// </summary>
    
    public string YearOfManufacture { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets description of the CarInfo program.
    /// </summary>
    
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
    
    public string Price { get; set; } = string.Empty;


    /// <summary>
    /// Gets or sets engine of the CarInfo program.
    /// </summary>
    
    public string Engine { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets status of the CarInfo program.
    /// </summary>

    
    public string? Status { get; set; } = null;

    /// <summary>
    /// Gets or sets the URL of car's image.
    /// </summary>

    public string? CarImageURL { get; set; } = null;
}