using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static System.Collections.Specialized.BitVector32;

namespace reactmuiaspnet.Services
{
    public static class WebApplicationBuilder
    {
        public static IHostBuilder ConfigureAppSettings(this IHostBuilder host)
        {
            host.ConfigureAppConfiguration((ctx, builder) =>
            {
                var enviroment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                builder.AddJsonFile("appsettings.json", true, true);
                builder.AddJsonFile($"appsettings.{enviroment}.json", true, true);
                builder.AddJsonFile($"appsettings.{Environment.MachineName}.json", true, true);

                builder.AddEnvironmentVariables();
            });

            return host;
        }
    }

    public class Settings
    {
        public bool IsDarkTheme { get; set; }
    }

    public static class SettingsHelpers
    {
        public static void AddOrUpdateAppSetting<T>(string sectionPathKey, T value)
        {
            try
            {
                var filePath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
                string json = File.ReadAllText(filePath);

                JObject jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<JObject>(json)!;
                //SetValueRecursively(sectionPathKey, jsonObj, value);
                jsonObj.TryAdd(sectionPathKey, value?.ToString());

                string output = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText(filePath, output);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error writing app settings | {0}", ex.Message);
            }
        }

        //private static void SetValueRecursively<T>(string sectionPathKey, dynamic jsonObj, T value)
        //{
        //    // split the string at the first ':' character
        //    try
        //    {
        //        var remainingSections = sectionPathKey.Split(":", 2);
        //        var currentSection = remainingSections[0];

        //        if (remainingSections.Length > 1)
        //        {
        //            // continue with the procress, moving down the tree
        //            var nextSection = remainingSections[1];
        //            SetValueRecursively(nextSection, jsonObj[currentSection], value);
        //        }
        //        else
        //        {
        //            // we've got to the end of the tree, set the value
        //            jsonObj[currentSection] = value;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.ToString());
        //    }
        //}
        public static void AddUpdateJObject(string section, JObject jObj)
        {
            try
            {
                var filePath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
                string json = File.ReadAllText(filePath);

                JObject jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<JObject>(json)!;
                jsonObj.TryAdd(section, jObj);
                
                string output = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText(filePath, output);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error writing app settings | {0}", ex.Message);
            }
        }
    }

    public class MainService
    {
        public static MainService? Instance { get; private set; }
        public IConfiguration Configuration { get; }
        public Settings webSettings { get; set; }
        public MainService(IConfiguration configuration)
        {
            Instance = this;
            Configuration = configuration;
            webSettings = new()
            {
                IsDarkTheme = false
            };
            //JObject obj = JObject.FromObject(webSettings);
            //SettingsHelpers.AddUpdateJObject("webSettings", obj);
            //SettingsHelpers.AddOrUpdateAppSetting("PageTheme", "Dark");
            WebSettingInit();
        }

        private void WebSettingInit()
        {
            try
            {
                var filePath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
                string json = File.ReadAllText(filePath);

                JObject jsonObj = JsonConvert.DeserializeObject<JObject>(json)!;
                JObject obj = JObject.FromObject(webSettings);

                //add test
                jsonObj.TryAdd("Settings", obj);
                //load test
                //JToken? token = JObject.Parse(json)["Settings"];
                Settings settings = jsonObj["Settings"]?.ToObject<Settings>()!;
                //Settings settings = jsonObj.ToObject<Settings>()!;
                //Settings settings = (Settings)new JsonSerializer().Deserialize(new JTokenReader(jsonObj), typeof(Settings))!;

                string output = JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText(filePath, output);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error writing app settings | {0}", ex.Message);
            }
        }
    }
}
