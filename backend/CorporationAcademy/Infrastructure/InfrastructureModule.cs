using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Infrastructure.Http;
using CorporationAcademy.Infrastructure.Middleware;
using CorporationAcademy.Infrastructure.Mongo;
using CorporationAcademy.Infrastructure.Mongo.Features.Categories;
using CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;
using CorporationAcademy.Infrastructure.OpenAi;

namespace CorporationAcademy.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructureModule(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();

        services.AddTransient<IMongoClientProvider, MongoClientProvider>();
        services.AddTransient<IWordsClient, MongoWordsClient>();
        services.AddTransient<ICategoriesClient, MongoCategoriesClient>();

        services.AddTransient<IUserAccessor, HttpContextUserAccessor>();

        services.AddTransient<ISentencesGenerator, OpenAiSentencesGenerator>();

        services.AddTransient<UnauthorizedMiddleware>();

        return services;
    }
}
