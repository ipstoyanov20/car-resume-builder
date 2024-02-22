// <copyright file="DependencyInjection.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using Microsoft.Extensions.DependencyInjection;
using ORB.Services.Contracts;
using ORB.Services.Implementations;
using ORB.Shared.Models.CarInfo;
using ORB.Shared.Models.PersonalInfo;

namespace ORB.Services;

/// <summary>
/// Static class for dependency injection.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Add Services.
    /// </summary>
    /// <param name="services">Services.</param>
    public static void AddServices(this IServiceCollection services)
    {
        services
            .AddScoped<ICurrentUser, CurrentUser>()
            .AddScoped<IAuthService, AuthService>()
            .AddScoped<ITokenService, TokenService>()
            .AddScoped<IUserService, UserService>()
            .AddScoped<IEmailService, EmailService>()
            .AddScoped<IResumeService, ResumeService>()
            .AddScoped<IInfoService<PersonalInfoIM, PersonalInfoVM>, PersonalInfoService>()
            .AddScoped<ITemplateService, TemplateService>()
            .AddScoped<IInfoService<CarInfoIM, CarInfoVM>, CarInfoService>()
            .AddScoped<IFileService, FileService>();
    }
}
