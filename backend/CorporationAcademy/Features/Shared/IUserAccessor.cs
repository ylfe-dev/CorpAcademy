namespace CorporationAcademy.Features.Shared;

public interface IUserAccessor
{
    public Guid UserId { get; }
    void ThrowIfNotAuthenticated();
}
