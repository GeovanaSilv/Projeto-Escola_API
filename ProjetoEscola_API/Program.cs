using Microsoft.EntityFrameworkCore;
using ProjetoEscola_API.Data;

var builder = WebApplication.CreateBuilder(args);

//Allow Cors 
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//add services to the container.

//Allow CORS
builder.Services.AddCors(options =>

{

  options.AddPolicy(MyAllowSpecificOrigins, builder =>{
    builder.WithOrigins("http://localhost").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
  builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
  builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
  builder.SetIsOriginAllowed(origin => true);


  });
});
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EscolaContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("StringConexaoSQLServer"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

//Allow CORS
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
