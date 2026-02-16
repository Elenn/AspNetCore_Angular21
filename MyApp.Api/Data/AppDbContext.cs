using Microsoft.EntityFrameworkCore;
using MyApp.Api.Models.Products;
using MyApp.Api.Models.Categories;

namespace MyApp.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
}
