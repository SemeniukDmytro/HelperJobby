using ApplicationDomain.Models;

namespace ApplicationBLLUnitTests;

public class JobServiceTests
{
    [Fact]
    public async Task CreateJobShouldReturnCreatedJob()
    {
        var createdJob = new Job()
        {

        };
    }

    [Fact]
    public async Task CreateJobShouldThrowForbiddenExceptionIfEmployerAccountDoesNotExists()
    {
        
    }

    [Fact]
    public async Task UpdateJobShouldReturnUpdatedJob()
    {
        
    }

    [Fact]
    public async Task UpdateJobShouldThrowForbiddenExceptionIfOtherEmployerTriesToChangeJob()
    {
        
    }

    [Fact]
    public async Task DeleteJobShouldReturnJobToDelete()
    {
        
    }
    
    [Fact]
    public async Task DeleteJobShouldThrowForbiddenExceptionIfOtherEmployerTriesToDeleteJob()
    {
        
    }

    [Fact]
    public async Task SaveJobShouldReturnJobToSave()
    {
        
    }
    
    [Fact]
    public async Task SaveJobShouldThrowAnExceptionIfNotCurrentUserTriesToSave()
    {
        
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldReturnJobToRemove()
    {
        
    }
    
    [Fact]
    public async Task RemoveJobShouldThrowAnExceptionIfNotCurrentUserTriesToRemoveFromSaved()
    {
        
    }
    
}