namespace QLCT_app_client.Services
{
    public class DataService : IDataService
    {
        public async Task<UserModel> Login(UserModel user) => await AppSyncClient.LoginAsync(user);
    }
}

