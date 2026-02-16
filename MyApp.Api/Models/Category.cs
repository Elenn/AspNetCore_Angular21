namespace MyApp.Api.Models.Categories;

public class Category
{
    public int id { get; set; }
    public string slug { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string url { get; set; } = string.Empty; 
}