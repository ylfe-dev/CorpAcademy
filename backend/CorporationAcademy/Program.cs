using CorporationAcademy.Features.CreateCategory;
using CorporationAcademy.Features.DeleteCategory;
using CorporationAcademy.Features.DeleteLearningWord;
using CorporationAcademy.Features.GenerateSentences;
using CorporationAcademy.Features.GetCategories;
using CorporationAcademy.Features.SaveLearningWord;
using CorporationAcademy.Features.SaveLevel;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Infrastructure;
using CorporationAcademy.Infrastructure.Middleware;
using CorporationAcademy.Swagger;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.OperationFilter<UserIdHeaderFilter>();
});
builder.Services.AddCors();
builder.Services.AddTransient<ILevelCalculator, LevelCalculator>();
builder.Services.AddInfrastructureModule();
builder.Services.AddApplicationInsightsTelemetry();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapGenerateSentencesEndpoint();

app.MapSaveLearningWordEnpoint();
app.MapDeleteLearningWordEndpoint();

app.MapSaveLevelEndpoint();

app.MapCreateCategoryEndpoint();
app.MapGetCategoriesEndpoint();
app.MapDeleteCategoryEndpoint();

app.UseMiddleware<UnauthorizedMiddleware>();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.Run();