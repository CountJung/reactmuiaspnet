using reactmuiaspnet.Services;

var builder = WebApplication.CreateBuilder(args);

//public static IHostBuilder
builder.Host.ConfigureAppSettings();
//var settings = builder.Configuration.GetRequiredSection("Settings").Get<Settings>();

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton(new MainService(builder.Configuration));
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new() { Title = "BasketAPI", Version = "v1" });
//});
var app = builder.Build();

//var Main = app.Services.GetService<MainService>();
//Main = new MainService();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts();
}
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BasketAPI v1"));
//}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
