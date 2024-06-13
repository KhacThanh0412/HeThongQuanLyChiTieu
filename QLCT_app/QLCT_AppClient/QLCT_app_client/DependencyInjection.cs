using System;
using Microsoft.Extensions.DependencyInjection;
using QLCT_app_client.Services;

namespace QLCT_app_client
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddApplication(this IServiceCollection services)
		{
			services.AddSingleton<IDataService, DataService>();
			return services;
		}
	}
}

