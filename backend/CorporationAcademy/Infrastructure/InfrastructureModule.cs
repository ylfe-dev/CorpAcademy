using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Infrastructure.Mongo;
using CorporationAcademy.Infrastructure.Mongo.Features.Categories;
using CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;
using CorporationAcademy.Infrastructure.OpenAi;

namespace CorporationAcademy.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructureModule(this IServiceCollection services)
    {
        services.AddTransient<IMongoClientProvider, MongoClientProvider>();
        services.AddTransient<IWordsClient, MongoWordsClient>();
        services.AddTransient<ICategoriesClient, MongoCategoriesClient>();

        services.AddTransient<ISentencesGenerator, OpenAiSentencesGenerator>();
        return services;
    }
}
