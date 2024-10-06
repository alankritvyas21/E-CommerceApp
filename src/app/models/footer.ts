export class footerLinks  {
    id: number;
    title: string;
    url: string;
    icon: string;
    type: string;

    constructor(id: number, title: string, url: string, icon: string, type: string) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.icon = icon;
        this.type = type;
    }
}