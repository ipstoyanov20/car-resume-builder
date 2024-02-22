// <copyright file="CarInfoService.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ORB.Data.Data;
using ORB.Data.Models.Resumes; // Assuming this should be changed to ORB.Data.Models.Cars
using ORB.Services.Contracts;
using ORB.Shared.Models.CarInfo; // Assuming this should be changed to ORB.Shared.Models.PersonalInfo

namespace ORB.Services.Implementations;

/// <summary>
/// This class provides operations for creating and retrieving car information.
/// </summary>
internal class CarInfoService : IInfoService<CarInfoIM, CarInfoVM> // Assuming this should be changed to ICarInfoService
{
    private readonly ApplicationDbContext context;
    private readonly IUserService userService;
    private readonly IMapper mapper;
    private readonly IFileService fileService;

    /// <summary>
    /// Initializes a new instance of the <see cref="CarInfoService"/> class.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <param name="userService">An instance of IUserService.</param>
    /// <param name="mapper">An instance of IMapper.</param>
    /// <param name="fileService">An instance of file service.</param>
    public CarInfoService(
        ApplicationDbContext context,
        IUserService userService,
        IMapper mapper,
        IFileService fileService)
    {
        this.context = context;
        this.userService = userService;
        this.mapper = mapper;
        this.fileService = fileService;
    }


    /// <inheritdoc/>
    public async Task<CarInfoVM> CreateForUserWithIdAsync(string id)
    {
        var carInfo = new CarInfo();

        await this.context.CarInfo.AddAsync(carInfo);
        await this.context.SaveChangesAsync();

        return this.mapper.Map<CarInfoVM>(carInfo);
    }



    /// <inheritdoc/>
    public async Task<CarInfoVM?> GetByIdAsync(string id, string userId)
    {
        var carInfo = await this.context.Resumes // Assuming this should be changed to Cars
                                                .Where(r => r.CarInfoId == id && r.UserId == userId && !r.IsDeleted)
                                                .Include(r => r.CarInfo) // Assuming this should be changed to CarInfo
                                                .Select(r => r.CarInfo) // Assuming this should be changed to CarInfo
                                                .FirstOrDefaultAsync();

        return this.mapper.Map<CarInfoVM>(carInfo); // Assuming this should be changed to CarInfoVM
    }

    /// <inheritdoc/>
    public async Task<CarInfoVM> UpdateWithIdAsync(string id, CarInfoIM newCarInfo)
    {
        var carInfo = await this.context.CarInfo // Assuming this should be changed to CarInfo
                                                .Where(ci => ci.Id == id)
                                                .FirstOrDefaultAsync();

        carInfo!.Brand = newCarInfo.Brand; 
        carInfo!.Model = newCarInfo.Model; 
        carInfo!.YearOfManufacture = newCarInfo.YearOfManufacture; 
        carInfo!.Color = newCarInfo.Color; 
        carInfo!.Distance = newCarInfo.Distance; 
        carInfo!.Engine = newCarInfo.Engine;
        carInfo!.Status = newCarInfo.Status;
        carInfo!.Price = newCarInfo.Price; 
        carInfo!.Description = newCarInfo.Description;
        

        if (newCarInfo.CarImage is not null)
        {
            carInfo.CarImageURL = await this.fileService.SaveImageAsync(newCarInfo.CarImage, "resumesimages"); // Assuming this should be changed to carsimages
        }

        var resume = await this.context.Resumes // Assuming this should be changed to Cars
                                            .Where(r => r.CarInfoId == id)
                                            .FirstOrDefaultAsync();

        resume!.LastModified = DateTime.UtcNow;

        await this.context.SaveChangesAsync();

        return this.mapper.Map<CarInfoVM>(carInfo); // Assuming this should be changed to CarInfoVM
    }
}
