// <copyright file="CarInfoController.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ORB.Services.Contracts;
using ORB.Shared.Models.CarInfo; // Assuming this should be changed to CarInfo
using ORB.Shared.Models.Resume;

namespace ORB.WebHost.Controllers;

/// <summary>
/// Controller for cars API end-points.
/// </summary>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CarInfoController : ControllerBase // Assuming this should be changed to CarInfoController
{
    private readonly IInfoService<CarInfoIM, CarInfoVM> carInfoService; // Assuming this should be changed to ICarInfoService
    private readonly ICurrentUser currentUser;
    private readonly ILogger<CarInfoController> logger; // Assuming this should be changed to CarInfoController

    /// <summary>
    /// Initializes a new instance of the <see cref="CarInfoController"/> class.
    /// </summary>
    /// <param name="carInfoService">Car info service.</param>
    /// <param name="currentUser">Current user.</param>
    /// <param name="logger">Logger.</param>
    public CarInfoController(
        IInfoService<CarInfoIM, CarInfoVM> carInfoService, // Assuming this should be changed to ICarInfoService
        ICurrentUser currentUser,
        ILogger<CarInfoController> logger) // Assuming this should be changed to CarInfoController
    {
        this.carInfoService = carInfoService; // Assuming this should be changed to ICarInfoService
        this.currentUser = currentUser;
        this.logger = logger; // Assuming this should be changed to CarInfoController
    }

    /// <summary>
    /// Endpoint for getting a specific car info by its id.
    /// </summary>
    /// <param name="id">Id of the car info to retrieve.</param>
    /// <returns>The requested car info.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<CarInfoVM>> GetCarInfoByIdAsync(string id)
    {
        this.logger.LogInformation($"GetCarInfoByIdAsync method in the CarInfoController class : User with id: {this.currentUser.UserId} is trying to get car info with id: {id}");
        var carInfo = await this.carInfoService.GetByIdAsync(id, this.currentUser.UserId);

        if (carInfo is null)
        {
            this.logger.LogWarning($"GetCarInfoByIdAsync method in the CarInfoController class : There isn't a car info with this id: {id}");
            return this.NotFound();
        }

        this.logger.LogInformation($"GetCarInfoByIdAsync method in the CarInfoController class : User with id: {this.currentUser.UserId} successfully got car info with id: {id}");
        return this.Ok(carInfo);
    }

    /// <summary>
    /// Update a car info by its id.
    /// </summary>
    /// <param name="id">Id of the car info to update.</param>
    /// <param name="newCarInfo">Updated information of the car info.</param>
    /// <returns>The updated resume.</returns>
    [HttpPut("{id}")]
    public async Task<ActionResult<ResumeVM>> UpdateResumeWithIdAsync(string id, [FromForm] CarInfoIM newCarInfo)
    {
        this.logger.LogInformation($"UpdateResumeWithIdAsync method in the CarInfoController class : User with id: {this.currentUser.UserId} is trying to update car info with id: {id}");
        var carInfo = await this.carInfoService.GetByIdAsync(id, this.currentUser.UserId);

        if (carInfo is null)
        {
            this.logger.LogWarning($"UpdateResumeWithIdAsync method in the CarInfoController class : There isn't a car info with this id: {id}");
            return this.NotFound();
        }

        carInfo = await this.carInfoService.UpdateWithIdAsync(id, newCarInfo);

        this.logger.LogInformation($"UpdateResumeWithIdAsync method in the CarInfoController class : User with id: {this.currentUser.UserId} successfully updated car info with id: {id}");
        return this.Ok(carInfo);
    }
}
