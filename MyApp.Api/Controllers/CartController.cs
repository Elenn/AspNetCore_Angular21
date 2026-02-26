using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;
using MyApp.Api.Models.Products;
using MyApp.Api.Extensions; 

namespace MyApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
	// Add to cart
	[HttpPost("add")]
	public IActionResult AddToCart(CartPayload product)
	{
		var cart = HttpContext.Session.GetObject<Dictionary<int, string>>("Cart")
				   ?? new Dictionary<int, string>();

		cart[product.id] = product.title;
		HttpContext.Session.SetObject("Cart", cart);

		return Ok($"Added {product.title} to cart");
	}

	// View cart
	[HttpGet("view")]
	public IActionResult ViewCart()
	{
		var cart = HttpContext.Session.GetObject<Dictionary<int, string>>("Cart")
				   ?? new Dictionary<int, string>();

		return Ok(cart);
	}
}