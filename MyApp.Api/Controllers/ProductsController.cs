using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;
using MyApp.Api.Models.Products;

namespace MyApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return Ok(product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        if (id != product.id)
            return BadRequest();

        var existing = await _context.Products.FindAsync(id);
        if (existing is null)
            return NotFound();

        // Update fields explicitly on the tracked entity
        existing.title = product.title;
        existing.description = product.description;
        existing.category = product.category;
        existing.brand = product.brand;
        existing.sku = product.sku;
        existing.warrantyInformation = product.warrantyInformation;
        existing.shippingInformation = product.shippingInformation;
        existing.availabilityStatus = product.availabilityStatus;
        existing.returnPolicy = product.returnPolicy;
        existing.thumbnail = product.thumbnail;
        existing.price = product.price;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }
}
