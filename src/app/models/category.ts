export class Category {
    id: number;
    imageUrl1: string;
    name: string;
    topCategory: boolean;

    constructor(id: number, imageUrl1: string, name: string, topCategory: boolean) {
        this.id = id;
        this.imageUrl1 = imageUrl1;
        this.name = name;
        this.topCategory = topCategory;
    }
}