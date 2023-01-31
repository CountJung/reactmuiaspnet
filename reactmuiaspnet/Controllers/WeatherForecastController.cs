using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using reactmuiaspnet.Models;
using System.Net;

namespace reactmuiaspnet.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    public static List<WeatherForecast>? WeatherForecastsDatas { get; set; }
    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        _logger.LogInformation("Random Data Generate");
        //int temp = 1 == 1 ? 2 == 1 ? 1 : 2 : 3;
        IEnumerable<WeatherForecast> weatherForecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        });
        WeatherForecastsDatas = weatherForecasts.ToList();
        return WeatherForecastsDatas.ToArray();
    }

    [HttpPost("data")]
    public IEnumerable<WeatherForecast>? PostData([FromBody] string weatherString)
    {
        try
        {
            if (weatherString == null)
                return WeatherForecastsDatas?.ToArray();
            WeatherForecast? weather = JsonConvert.DeserializeObject<WeatherForecast>(weatherString);
            weather!.Date = DateTime.Now;
            WeatherForecastsDatas?.Add(weather);
        }
        catch (Exception ex)
        {
            Console.Write(ex.ToString());
        }
        return WeatherForecastsDatas?.ToArray();
    }

    private async void WebFileDownload(string remote, string local)
    {
        using var client = new HttpClient();
        using var remoteStream = await client.GetStreamAsync(remote);
        using var localStream = new FileStream(local, FileMode.OpenOrCreate);
        await remoteStream.CopyToAsync(localStream);
    }
    static public async Task HttpDownloadFileAsync(HttpClient httpClient, string url, string fileToWriteTo)
    {
        using HttpResponseMessage response = await httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead);
        using Stream streamToReadFrom = await response.Content.ReadAsStreamAsync();
        using Stream streamToWriteTo = new FileStream(fileToWriteTo, FileMode.OpenOrCreate);
        await streamToReadFrom.CopyToAsync(streamToWriteTo);
    }
    //DotNet Core MVC simple Download
    public ActionResult DownloadUrl(string url)
    {
        return Redirect(url);
    }
}
