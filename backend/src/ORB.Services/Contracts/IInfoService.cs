// <copyright file="ICarInfoService.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using ORB.Shared.Models.CarInfo;
using ORB.Shared.Models.Resume;

namespace ORB.Services.Contracts;

/// <summary>
/// Interface for managing car information.
/// </summary>
public interface IInfoService<TInput, TOutput>
{
    /// <summary>
    /// Creates a car information object for the specified user.
    /// </summary>
    /// <param name="id">The user's id.</param>
    /// <returns>A CarInfoVM object.</returns>
    Task<TOutput> CreateForUserWithIdAsync(string id);

    /// <summary>
    /// Retrieves the car information of the specified user by id and user id.
    /// </summary>
    /// <param name="id">The id of the car information object.</param>
    /// <param name="userId">The id of the user whose car information is being retrieved.</param>
    /// <returns>The CarInfoVM object for the specified user, or null if not found.</returns>
    Task<TOutput?> GetByIdAsync(string id, string userId);

    /// <summary>
    /// Updates the car information of the specified user by id and user id.
    /// </summary>
    /// <param name="id">The id of the car information object.</param>
    /// <param name="newCarInfo">The new car information of the user.</param>
    /// <returns>The updated CarInfoVM object for the specified user.</returns>
    Task<TOutput> UpdateWithIdAsync(string id, TInput newCarInfo);
}
