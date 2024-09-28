using MongoDB.Driver;

namespace CorporationAcademy.Infrastructure.Mongo;

internal interface IMongoClientProvider
{
    IMongoClient GetClient();
}

internal class MongoClientProvider(IConfiguration configuration) : IMongoClientProvider
{
    private readonly string _connectionString = configuration.GetConnectionString("Mongo")
            ?? throw new ArgumentNullException("Mongo Connection String is empty");

    public IMongoClient GetClient()
    {
        return new MongoClient(_connectionString);
    }
}
