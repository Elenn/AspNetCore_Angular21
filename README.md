# AspNetCore_Angular21

run:

dotnet run --urls "https://localhost:7026;http://localhost:5078"

migrations:

dotnet ef migrations add InitialCreate

dotnet ef database update

in other terminal run:

ng serve

open swagger: https://localhost:7026/swagger/index.html -> Products -> POST

add data to databse:

{ "id": 0, "title": "Essence Mascara Lash Princess", "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",

"category": "beauty", "brand": "Essence", "sku": "BEA-ESS-ESS-001", "warrantyInformation": "1 week warranty", "shippingInformation": "Ships in 3-5 business days", "availabilityStatus": "In Stock", "returnPolicy": "No return policy", "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp", "price": 9.99 }

{ "id": 0, "title": "Eyeshadow Palette with Mirror", "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.", "category": "beauty", "brand": "Glamour Beauty", "sku": "BEA-GLA-EYE-002", "warrantyInformation": "1 year warranty", "shippingInformation": "Ships in 2 weeks", "availabilityStatus": "In Stock", "returnPolicy": "7 days return policy", "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp", "price": 19.99 }

{ "id": 0, "title": "Powder Canister", "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.", "category": "beauty", "brand": "Velvet Touch", "sku": "BEA-VEL-POW-003", "warrantyInformation": "3 months warranty", "shippingInformation": "Ships in 1-2 business days", "availabilityStatus": "In Stock", "returnPolicy": "No return policy", "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp", "price": 14.99 }

{ "id": 0, "title": "Red Lipstick", "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.", "category": "beauty", "brand": "Chic Cosmetics", "sku": "BEA-CHI-LIP-004", "warrantyInformation": "3 year warranty", "shippingInformation": "Ships in 1 week", "availabilityStatus": "In Stock", "returnPolicy": "7 days return policy", "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp", "price": 12.99 }
