using MongoDB.Driver;

namespace CorporationAcademy.Infrastructure.Mongo.Extensions;

internal static class MongoExtensions
{
    public static IMongoCollection<T> GetCollection<T>(this IMongoDatabase database)
    {
        return database.GetCollection<T>(typeof(T).Name);
    }
}
