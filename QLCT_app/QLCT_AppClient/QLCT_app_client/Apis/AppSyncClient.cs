using System;
using System.Text;
using Javax.Net.Ssl;
using Newtonsoft.Json;
using static Java.Util.Jar.Attributes;

namespace QLCT_app_client.Apis
{
    public class ApiOption
    {
        public string PendingKey { get; set; }
        public CancellationToken CancelToken { get; set; }
        public bool ShowCommonErrorDialog { get; set; } = true;
        public bool AllowRetry { get; set; } = true;
        public Action OnStartCallApi;
        public bool IsSnakeCaseNamingWithNumber { get; set; }
    }

    public class CommonResult
    {
        public string Status { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
    }

    public interface IApiResult
    {
        CommonResult Result { get; set; }
        bool IsSuccess { get; }
        object Data { get; set; }
        int? NextOffset { get; set; }
    }

    public class ApiResult<T> : IApiResult
    {
        public CommonResult Result { get; set; }
        public bool IsSuccess => Result?.Status == "Success";
        public T Data { get; set; }
        public int? NextOffset { get; set; }

        object IApiResult.Data
        {
            get => Data;
            set
            {
                if (value is T casted)
                    Data = casted;
                else
                    throw new InvalidCastException($"Data has to be type of {typeof(T).Name}");
            }
        }
    }

    public partial class AppSyncClient {
        public static async Task<UserModel> LoginAsync(UserModel user, ApiOption option = null)
        {
            string endpoint = "login";
            return await CallQueryAsync<UserModel>(endpoint, user, option);
        }
    }


    public partial class AppSyncClient
	{
        private const int MaxApiRetryRequest = 3;
        private const int DelayBetweenApiRetry = 500; // ms
        static string _url = Environment.AppSyncEndpoint;
        static CustomRestApiHttpClient _client;
        static HttpClient _httpClient = new HttpClient();
        static bool _apiDialogShowed;
        // static IDataService _dataService;

        public AppSyncClient()
		{
            _client = new CustomRestApiHttpClient();
        }

        public async static Task<T> CallQueryAsync<T>(string name, dynamic variables, ApiOption option = null)
        {
            var res = await CallQueryApiAsync<T>(name, variables, option);
            return res.Data;
        }

        private async static Task<ApiResult<T>> CallQueryApiAsync<T>(string name, dynamic variables, ApiOption option = null)
        {
            option = option ?? new ApiOption();
            StringContent content = null;
            if (variables != null)
            {
                var jsonRequest = JsonConvert.SerializeObject(variables);
                content = new StringContent(jsonRequest, System.Text.Encoding.UTF8, "application/json");
            }

            using (var request = await GenerateHttpRequestMessageAsync(name, content))
            {
                ApiResult<T> res;
                try
                {
                    res = await AutoRetryApiAsync<T>(request, option.AllowRetry, option.CancelToken, option.OnStartCallApi, option.IsSnakeCaseNamingWithNumber);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"===> CallQueryApiAsync ex: {ex}");
                }
            }

            return null;
        }


        private static async Task<ApiResult<T>> AutoRetryApiAsync<T>(HttpRequestMessage req, bool allowRetry, CancellationToken cancelToken, Action onStartAction = null, bool isSnakeCaseNamingWithNumber = false)
        {
            int maxRequest = allowRetry ? MaxApiRetryRequest : 1;
            for (int i = 0; i < maxRequest; i++)
            {
                // if (Connectivity.NetworkAccess != NetworkAccess.Internet)
                //    throw new NoInternetException(true);
                try
                {
                    return await _client.SendHttpQueryAsync<ApiResult<T>>(req, _httpClient, onStartAction, isSnakeCaseNamingWithNumber, cancelToken).ConfigureAwait(false);
                }
                catch (Exception e)
                {
                    Console.WriteLine($"===> AutoRetryCallQueryAsync: {e}");
                    // stop
                    if (i == maxRequest - 1 || cancelToken.IsCancellationRequested)
                        throw;
                }

                await Task.Delay(DelayBetweenApiRetry);
            }

            throw new InvalidOperationException("AutoRetryCallQueryAsync should not go to here");
        }

        private static async Task<HttpRequestMessage> GenerateHttpRequestMessageAsync(string name, StringContent requestContent)
        {
            var endpoint = new Uri(new Uri(QLCT_app_client.Apis.Environment.AppSyncEndpoint), name).ToString();
            var message = new HttpRequestMessage(HttpMethod.Post, endpoint)
            {
                Content = requestContent
            };

            await Task.Delay(0);
            return message;
            // var service = ServiceHelper.GetService<IGigyaService>();
            // try
            // {
            //    var credentials = await service.GetCredentialsAsync();
            //    // if can't get or re-new credential => throw exception
            //    if (credentials == null || credentials.IsExprired)
            //        throw new NoInternetException();
            //    var cred = await credentials.GetCredentialsAsync();
            //    var signer = new AWS4RequestSigner(cred.AccessKey, cred.SecretKey);
            //    var message2 = await signer.Sign(message, "appsync", "ap-southeast-1");
            //    message2.Headers.Add("X-Amz-Security-Token", cred.Token);
            //    return message2;
            // }
            // catch (TimeOutException e)
            // { 
            //    AppSyncClient.ShowErrorTimeOutGIGYAVerifyDialog(I18nHelper.Get("Common_Error_TimeOutGIGYAVerify"), I18nHelper.Get("Common_Error_TimeOutGIGYAVerify_Title"), e);
            //    App.CurrentViewModel.BusyManager.DecreaseRequest();
            //    throw;
            // }
            // catch (GigyaAuthorizeException)
            // {
            //    MainThread.BeginInvokeOnMainThread(async () =>
            //    {
            //        if (!(App.Current.MainPage is LoadingPage))
            //        {
            //            AppShell.Initialized = false;
            //            await (AppShell.Current as AppShell).RemoveRootAsync();
            //            App.Current.MainPage = new LoadingPage();
            //            ServiceHelper.GetService<IDataService>().RemoveAllNotificationMessages();
            //        }
            //    });

            //    throw;
            // }
        }
    }
}

