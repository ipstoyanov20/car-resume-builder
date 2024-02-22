// <copyright file="InitApp.cs" company="ORB">
// Copyright (c) ORB. All rights reserved.
// </copyright>

using ORB.Data.Models.Resumes;
using ORB.Services.Contracts;
using ORB.Shared.Models.Templates;

namespace ORB.WebHost.Helpers;

/// <summary>
/// A class for initializing the application.
/// </summary>
public static class InitApp
{
    /// <summary>
    /// Initializes the application asynchronously.
    /// </summary>
    /// <param name="app">The web application.</param>
    /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
    public static async Task InitAppAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var templateService = scope.ServiceProvider.GetRequiredService<ITemplateService>();

        var templates = new List<TemplateIM>
        {
            new TemplateIM
            {
                Name = "CarResumeTemplate",
                Content = """
                <div style="width: 100%; height: 100%; position: relative">
                    <div style="width: 650.07px; height: 635.20px; left: 0px; top: 0px; position: absolute; background: #D9D9D9; border-radius: 50px"></div>
                    <div style="width: 227.50px; height: 321.41px; left: 6.91px; top: 306.97px; position: absolute">
                        <div style="width: 225.30px; height: 321.41px; left: 0px; top: 0px; position: absolute; background: #323B4C; border-bottom-left-radius: 50px"></div>
                {{#if ImageUrl}}
                        <img style="border-radius: 100%; width: 56px; height: 55px; left: 85.09px; top: 18.23px; position: absolute" src={{ImageUrl}} alt={{FullName}}>
                {{/if}} 
                        <div style="width: 104px; height: 15px; left: 17.09px; top: 67.23px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Contact</div>
                        <div style="width: 208.92px; height: 0.92px; left: 11.61px; top: 95.39px; position: absolute; opacity: 0.30; background: #767C87; border-top-left-radius: 50px"></div>
                        <div style="width: 215.89px; height: 80.03px; left: 10.06px; top: 182.78px; position: absolute">
                            <div style="width: 215.11px; height: 14.72px; left: 0px; top: 0px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Phone</div>
                            <div style="width: 215.11px; height: 14.72px; left: 0px; top: 41.39px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Email</div>
                            <div style="width: 212.31px; height: 15px; left: 3.58px; top: 25.47px; position: absolute">
                                <div style="width: 197.31px; height: 12.33px; left: 15px; top: 1px; position: absolute; opacity: 0.80; color: white; font-size: 12px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{Contacts.PhoneNumber}}</div>
                                <div style="width: 8.51px; height: 15px; left: 0px; top: 0px; position: absolute">
                                    <div style="width: 1.31px; height: 15px; left: 5.89px; top: 0px; position: absolute; background: #FF0202; border-top-left-radius: 50px"></div>
                                </div>
                            </div>
                            <div style="width: 212.31px; height: 15px; left: 2.04px; top: 65.03px; position: absolute">
                                <div style="width: 197.31px; height: 12.33px; left: 15px; top: 1px; position: absolute; opacity: 0.80; color: white; font-size: 12px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{Contacts.Email}}</div>
                                <div style="width: 8.51px; height: 15px; left: 0px; top: 0px; position: absolute">
                                    <div style="width: 1.31px; height: 15px; left: 5.89px; top: 0px; position: absolute; background: #FF0202; border-top-left-radius: 50px"></div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 215.89px; height: 80.03px; left: 11.61px; top: 102.75px; position: absolute">
                            <div style="width: 215.11px; height: 14.72px; left: 0px; top: 0px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Name</div>
                            <div style="width: 215.11px; height: 14.72px; left: 0px; top: 41.39px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Address</div>
                            <div style="width: 212.31px; height: 15px; left: 3.58px; top: 25.47px; position: absolute">
                                <div style="width: 197.31px; height: 12.33px; left: 15px; top: 1px; position: absolute; opacity: 0.80; color: white; font-size: 12px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{FullName}}</div>
                                <div style="width: 8.51px; height: 15px; left: 0px; top: 0px; position: absolute">
                                    <div style="width: 1.31px; height: 15px; left: 5.89px; top: -0px; position: absolute; background: #FF0202; border-top-left-radius: 50px"></div>
                                </div>
                            </div>
                            <div style="width: 212.31px; height: 15px; left: 2.04px; top: 65.03px; position: absolute">
                                <div style="width: 197.31px; height: 12.33px; left: 15px; top: 1px; position: absolute; opacity: 0.80; color: white; font-size: 12px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{Contacts.Address}}</div>
                                <div style="width: 8.51px; height: 15px; left: 0px; top: 0px; position: absolute">
                                    <div style="width: 1.31px; height: 15px; left: 5.89px; top: 0px; position: absolute; background: #FF0202; border-top-left-radius: 50px"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 633.53px; height: 290.33px; left: 6.91px; top: 9.02px; position: absolute; background: #323B4C; border-top-left-radius: 50px; border-top-right-radius: 50px"></div>
                    <div style="width: 240.44px; height: 84.41px; left: 401.82px; top: 107.87px; position: absolute">
                        <div style="width: 238.80px; height: 53.78px; left: 0px; top: 0px; position: absolute; color: white; font-size: 50px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Brand}}</div>
                        <div style="width: 238.80px; height: 30.68px; left: 1.64px; top: 53.74px; position: absolute; color: white; font-size: 30px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Model}}</div>
                    </div>
                    <div style="width: 335.18px; height: 13.43px; left: 401.82px; top: 222.16px; position: absolute">
                        <div style="width: 267.39px; height: 13.43px; left: 0px; top: 0px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Price:</div>
                        <div style="width: 245.27px; height: 11.29px; left: 89.91px; top: 0.05px; position: absolute; opacity: 0.50; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Price}}</div>
                    </div>
                {{#if CarInfo.ImageUrl}}
                    <img style="width: 350.20px; height: 252.23px; left: 29.26px; top: 25.66px; position: absolute; border-radius: 50px" src={{CarInfo.ImageUrl}}>
                {{/if}} 
                
                    <div style="width: 402.54px; height: 321.41px; left: 239.71px; top: 306.97px; position: absolute; background: #323B4C; border-bottom-right-radius: 50px"></div>
                    <div style="width: 325.06px; height: 133.90px; left: 289.14px; top: 479.81px; position: absolute">
                        <div style="width: 267.39px; height: 13.43px; left: 0px; top: 0px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Color:</div>
                        <div style="width: 267.39px; height: 13.43px; left: 0px; top: 37.76px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Extra description:</div>
                        <div style="width: 267.22px; height: 14.46px; left: 1.86px; top: 25.51px; position: absolute">
                            <div style="width: 245.27px; height: 11.29px; left: 21.95px; top: 0px; position: absolute; opacity: 0.80; color: white; font-size: 10px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Color}}</div>
                            <div style="width: 10.58px; height: 13.59px; left: 0px; top: 0.88px; position: absolute">
                                <div style="width: 1.63px; height: 13.59px; left: 7.32px; top: 0px; position: absolute; background: #FF0202"></div>
                            </div>
                        </div>
                        <div style="width: 321.29px; height: 71.62px; left: 3.77px; top: 62.28px; position: absolute">
                            <div style="width: 301.14px; height: 70.57px; left: 20.16px; top: 1.05px; position: absolute; opacity: 0.80; color: white; font-size: 10px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Description}}</div>
                            <div style="width: 10.58px; height: 15px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 1.63px; height: 15px; left: 7.32px; top: 0px; position: absolute; background: #FF0202"></div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 267.39px; height: 75.64px; left: 289.22px; top: 406.24px; position: absolute">
                        <div style="width: 267.39px; height: 13.43px; left: 0px; top: 0px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Distance travelled:</div>
                        <div style="width: 267.39px; height: 13.43px; left: 0px; top: 37.76px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Status:</div>
                        <div style="width: 263.35px; height: 15px; left: 3.70px; top: 24.56px; position: absolute">
                            <div style="width: 245.27px; height: 11.29px; left: 18.08px; top: 0.40px; position: absolute; opacity: 0.80; color: white; font-size: 10px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Distance}}</div>
                            <div style="width: 10.58px; height: 15px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 1.63px; height: 15px; left: 7.32px; top: 0px; position: absolute; background: #FF0202"></div>
                            </div>
                        </div>
                        <div style="width: 265.38px; height: 15px; left: 1.78px; top: 60.64px; position: absolute">
                            <div style="width: 245.27px; height: 11.29px; left: 20.11px; top: 0.95px; position: absolute; opacity: 0.80; color: white; font-size: 10px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Status}}</div>
                            <div style="width: 10.58px; height: 15px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 1.63px; height: 15px; left: 7.32px; top: -0px; position: absolute; background: #FF0202"></div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 267.47px; height: 77.15px; left: 289.14px; top: 332.64px; position: absolute">
                        <div style="width: 267.39px; height: 13.43px; left: 0.08px; top: 0px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Year of manifacture:</div>
                        <div style="width: 267.39px; height: 13.43px; left: 0px; top: 37.76px; position: absolute; color: white; font-size: 20px; font-family: Salsa; font-weight: 400; word-wrap: break-word">Engine:</div>
                        <div style="width: 263.43px; height: 15px; left: 3.70px; top: 24.56px; position: absolute">
                            <div style="width: 245.27px; height: 11.29px; left: 18.16px; top: 2px; position: absolute; opacity: 0.80; color: white; font-size: 10px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.YearOfManufacture}}</div>
                            <div style="width: 10.58px; height: 15px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 1.63px; height: 15px; left: 7.32px; top: 0px; position: absolute; background: #FF0202"></div>
                            </div>
                        </div>
                        <div style="width: 265.30px; height: 15.55px; left: 1.86px; top: 61.59px; position: absolute">
                            <div style="width: 245.27px; height: 11.29px; left: 20.02px; top: 0px; position: absolute; opacity: 0.80; color: white; font-size: 10px; font-family: Salsa; font-weight: 400; word-wrap: break-word">{{CarInfo.Engine}}</div>
                            <div style="width: 10.58px; height: 13.59px; left: 0px; top: 1.97px; position: absolute">
                                <div style="width: 1.63px; height: 13.59px; left: 7.32px; top: 0px; position: absolute; background: #FF0202"></div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 63.61px; height: 107.87px; left: 535.57px; top: 0px; position: absolute">
                        <div style="width: 55.88px; height: 93.32px; left: 4.91px; top: 0px; position: absolute; background: #FF0202"></div>
                    </div>
                </div>
                """,
            },
        };

        foreach (var template in templates)
        {
            await templateService.AddTemplateIfDoesNotExistAsync(template);
        }
    }
}