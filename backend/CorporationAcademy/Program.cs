using CorporationAcademy.Features.CreateCategory;
using CorporationAcademy.Features.DeleteCategory;
using CorporationAcademy.Features.GenerateSentences;
using CorporationAcademy.Features.GetCategories;
using CorporationAcademy.Features.SaveLearningWord;
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
builder.Services.AddInfrastructureModule();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGenerateSentencesEndpoint();

app.MapSaveLearningWordEnpoint();

app.MapCreateCategoryEndpoint();
app.MapGetCategoriesEndpoint();
app.MapDeleteCategoryEndpoint();

app.UseMiddleware<UnauthorizedMiddleware>();

app.Run();