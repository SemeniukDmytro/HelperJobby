using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IOrganizationQueryRepository
{

    /// <summary>
    /// Retrieves an organization from the database based on the provided organization ID,
    /// with optional loading of specific related entities.
    /// </summary>
    /// <param name="organizationId">The unique identifier of the organization to retrieve.</param>
    /// <param name="loadEmployeesEmails">Specifies whether to load the collection of employee emails (optional).</param>
    /// <param name="loadEmployeeAccounts">Specifies whether to load the collection of employee accounts (optional).</param>
    public Task<Organization> GetOrganization(int organizationId,
        bool loadEmployeesEmails = false,
        bool loadEmployeeAccounts = false);
    public Task<Organization?> GetOrganizationByName(string organizationName);

}