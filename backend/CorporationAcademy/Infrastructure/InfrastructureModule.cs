using CorporationAcademy.Features.CreateCategory.Clients;
using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Infrastructure.Http;
using CorporationAcademy.Infrastructure.Middleware;
using CorporationAcademy.Infrastructure.Mongo;
using CorporationAcademy.Infrastructure.Mongo.Features.Categories;
using CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;
using CorporationAcademy.Infrastructure.Mongo.Features.Levels;
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
        services.AddTransient<ILevelsClient, MongoLevelsClient>();

        services.AddTransient<IUserAccessor, HttpContextUserAccessor>();

        services.AddTransient<IChatCompletionService, ChatCompletionService>();
        services.AddTransient<ISentencesGenerator, OpenAiSentencesGenerator>();
        services.AddTransient<IEmojiGenerator, OpenAiEmojiGenerator>();

        services.AddTransient<UnauthorizedMiddleware>();

        return services;
    }
}
