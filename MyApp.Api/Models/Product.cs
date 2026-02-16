namespace MyApp.Api.Models.Products;

public class Product
{
    public int id { get; set; }
    public string title { get; set; } = string.Empty;
    public string description { get; set; } = string.Empty;
    public string category { get; set; } = string.Empty;
    public string brand { get; set; } = string.Empty;
    public string sku { get; set; } = string.Empty;
    public string warrantyInformation { get; set; } = string.Empty;
    public string shippingInformation { get; set; } = string.Empty;
    public string availabilityStatus { get; set; } = string.Empty;
    public string returnPolicy { get; set; } = string.Empty;
    public string thumbnail { get; set; } = string.Empty;
    public decimal price { get; set; }
}