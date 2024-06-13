using System;
using System.Net.Http;
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

        public async Task<TResponse> SendHttpQueryAsync<TResponse>(HttpRequestMessage request, HttpClient httpClient, Action onStartAction = null, bool isSnakeCaseNamingWithNumber = false, CancellationToken cancellationToken = default)
        {
            return await SendHttpQueryAsync<dynamic, TResponse>(request, httpClient, cancellationToken, onStartAction, isSnakeCaseNamingWithNumber);
        }

        public async Task<TResponse> SendHttpQueryAsync<TVaribles, TResponse>(HttpRequestMessage request, HttpClient httpClient, CancellationToken cancellationToken = default, Action onStartAction = null, bool isSnakeCaseNamingWithNumber = false)
        {
            try
            {
                onStartAction?.Invoke();

                if (cancellationToken.IsCancellationRequested)
                    throw new TaskCanceledException("Task was cancel!");

                using (var httpResponseMessage = await httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(false))
                {
                    var json = await httpResponseMessage.Content.ReadAsStringAsync();
                    LogRequest(request);
                    // Call the HttpClient's SendAsync method to actually send the request
                    var response = JObject.Parse(json);
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
                    LogResponse(httpResponseMessage);

                    return data;
                }

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
    }
}

