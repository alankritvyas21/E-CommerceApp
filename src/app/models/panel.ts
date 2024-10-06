export class Panel{
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    rating: string;
    currencySymbol: string;
    tagLine: string;
    quantity: number;

    constructor(id: number, title: string, price: number, description: string, imageUrl1: string, imageUrl2: string, imageUrl3: string, rating: string , category: string, currencySymbol: string, tagLine: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl1 = imageUrl1;
        this.imageUrl2 = imageUrl2;
        this.imageUrl3 = imageUrl3;
        this.rating = rating;
        this.category = category;
        this.currencySymbol = currencySymbol;
        this.tagLine = tagLine;
        this.quantity = quantity;
    }
}