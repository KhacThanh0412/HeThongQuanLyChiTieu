using System;
using QLCT_app_client.Apis;

namespace QLCT_app_client.Services
{
	public interface IDataService
	{
		Task<UserModel> Login(UserModel user);
	}
}

