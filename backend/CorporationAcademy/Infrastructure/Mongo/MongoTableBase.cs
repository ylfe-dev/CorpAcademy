using CorporationAcademy.Infrastructure.Mongo.Extensions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Linq.Expressions;

namespace CorporationAcademy.Infrastructure.Mongo;

internal abstract class MongoTableBase<T>(IMongoClientProvider mongoClientProvider)
{
    private const string DatabaseName = "CorporationAcademy";

    protected Task Insert(T entity) => GetCollection().InsertOneAsync(entity);

    protected Task Update<TSearch, TValue>(T entity, Expression<Func<T, TSearch>> filter, Expression<Func<T, TValue>> update)
    {
        var filterValue = filter.Compile().Invoke(entity);
        var updateValue = update.Compile().Invoke(entity);

        return GetCollection()
            .UpdateOneAsync(
                Builders<T>.Filter.Eq(filter, filterValue),
                Builders<T>.Update.Set(update, updateValue));
    }

    protected IMongoQueryable<T> Table => GetCollection().AsQueryable();

    private IMongoCollection<T> GetCollection()
    {
        var client = mongoClientProvider.GetClient();
        return client.GetDatabase(DatabaseName).GetCollection<T>();
    }
}
