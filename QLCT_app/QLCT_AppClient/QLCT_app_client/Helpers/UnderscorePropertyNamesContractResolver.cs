using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Serialization;

namespace QLCT_app_client.Helpers
{
    public class UnderscorePropertyNamesContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            var resolvedPropertyName = Regex.Replace(propertyName, @"(\w)([A-Z0-9])", "$1_$2").ToLower();
            return base.ResolvePropertyName(resolvedPropertyName);
        }
    }
}

