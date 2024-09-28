using CorporationAcademy.Features.Shared;

namespace CorporationAcademy.Infrastructure.Http;

internal class HttpContextUserAccessor(IHttpContextAccessor httpContextAccessor) : IUserAccessor
{
    private const string UserIdHeader = "userId";

    public Guid UserId
    {
        get
        {
            var headers = httpContextAccessor.HttpContext?.Request.Headers;
            if (headers is null)
            {
                return Guid.Empty;
            }

            return headers.TryGetValue(UserIdHeader, out var userId)
                ? Guid.Parse(userId.ToString())
                : Guid.Empty;
        }
    }
}
