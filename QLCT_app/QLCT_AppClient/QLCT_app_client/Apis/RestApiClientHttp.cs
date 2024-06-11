using System;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using QLCT_app_client.Helpers;

namespace QLCT_app_client.Apis
{
	public class CustomRestApiHttpClient : HttpClient
	{
        static JsonSerializerSettings _jsonSerializerSettings;
        public CustomRestApiHttpClient()
		{
            this.DefaultRequestHeaders.Add("User-Agent", "CustomRestApiHttpClient");
            this.Timeout = TimeSpan.FromSeconds(30);
            _jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new UnderscorePropertyNamesContractResolver()

                // NullValueHandling = NullValueHandling.Ignore
            };
        }

        public async Task<TResponse> SendAsync<TVaribles, TResponse>(HttpRequestMessage request, HttpClient httpClient, Action<HttpRequestMessage> onStartAction = null, bool isSnakeCaseNamingWithNumber = false, CancellationToken cancellationToken = default)
        {
            try
            {
                // Invoke the custom action before sending the request
                onStartAction?.Invoke(request);

                // Process the request content if isSnakeCaseNamingWithNumber is true
                TResponse data;
                if (isSnakeCaseNamingWithNumber && request.Content is StringContent stringContent)
                {
                    var contentString = await stringContent.ReadAsStringAsync();
                    var deserializedObject = JsonConvert.DeserializeObject<object>(contentString);
                    var snakeCaseContentString = JsonConvert.SerializeObject(deserializedObject, new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new SnakeCaseNamingStrategy { ProcessDictionaryKeys = true, OverrideSpecifiedNames = false }
                        }
                    });
                    request.Content = new StringContent(snakeCaseContentString, System.Text.Encoding.UTF8, "application/json");
                }

                // Log request details
                LogRequest(request);

                // Call the HttpClient's SendAsync method to actually send the request
                var responseApi = await httpClient.SendAsync(request, cancellationToken);
                var json = await responseApi.Content.ReadAsStringAsync();
                var response = JObject.Parse(json);
                var jsonData = response["data"].Children().FirstOrDefault()?.Children().FirstOrDefault()?.ToString();

                if (isSnakeCaseNamingWithNumber)
                {
                    var jsonSerializerSettings = new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver { NamingStrategy = new SnakeCaseNamingStrategy() }
                    };

                    data = jsonData != null ? JsonConvert.DeserializeObject<TResponse>(jsonData, jsonSerializerSettings) : default;
                }
                else
                {
                    data = jsonData != null ? JsonConvert.DeserializeObject<TResponse>(jsonData, _jsonSerializerSettings) : default;
                }

                // Log response details
                LogResponse(responseApi);

                return data;
            }
            catch (HttpRequestException e)
            {
                // Handle HttpRequestException (e.g., network issues)
                Console.WriteLine($"HttpRequestException: {e.Message}");
                throw;
            }
            catch (TaskCanceledException e) when (!cancellationToken.IsCancellationRequested)
            {
                // Handle timeout
                Console.WriteLine("Request timed out.");
                throw new TimeoutException("The request timed out.", e);
            }
            catch (Exception e)
            {
                // Handle any other exceptions
                Console.WriteLine($"Exception: {e.Message}");
                throw;
            }
        }

        private void LogRequest(HttpRequestMessage request)
        {
            Console.WriteLine($"Request Method: {request.Method}");
            Console.WriteLine($"Request URI: {request.RequestUri}");
            if (request.Content != null)
            {
                Console.WriteLine($"Request Content: {request.Content.ReadAsStringAsync().Result}");
            }
            foreach (var header in request.Headers)
            {
                Console.WriteLine($"Request Header: {header.Key}={string.Join(", ", header.Value)}");
            }
        }

        private void LogResponse(HttpResponseMessage response)
        {
            Console.WriteLine($"Response StatusCode: {response.StatusCode}");
            if (response.Content != null)
            {
                Console.WriteLine($"Response Content: {response.Content.ReadAsStringAsync().Result}");
            }
            foreach (var header in response.Headers)
            {
                Console.WriteLine($"Response Header: {header.Key}={string.Join(", ", header.Value)}");
            }
        }

        private async Task<HttpRequestMessage> GenerateHttpRequestMessageAsync(HttpRequestMessage request)
        {
            var json = JsonConvert.SerializeObject(request);
            var message = new HttpRequestMessage(HttpMethod.Post, QLCT_app_client.Apis.Environment.AppSyncEndpoint)
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            };

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

