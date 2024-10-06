import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { footerLinks } from './models/footer';
import { Router } from '@angular/router';
import { Category } from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app';

  menu: footerLinks[] = [];
  categories: footerLinks[] = [];
  help: footerLinks[] = [];
  social: footerLinks[] = [];
  features: footerLinks[] = [];
  

  constructor(private _sharedService: SharedService, private _router: Router) {}

  ngOnInit(): void {
    this._router.navigate(['']);
    this._sharedService.showApiLoader();

    this._sharedService.getCategories().subscribe((data: Category[]) => {     
      data.forEach(element => {
        this._sharedService.categories.push(element)
      })
      this._sharedService.bannerData.next(true);
    })

    this._sharedService.getFooter().subscribe((data: any) => {
      data.forEach(element => {
        if (element.type === "menu") {
          this.menu.push(element)
        } else if (element.type === "help") {
          this.help.push(element)
        } else if (element.type === "social") {
          this.social.push(element)
        } else if (element.type === "feature") {
          this.features.push(element)
        } else if (element.type === "category") {
          this.categories.push(element)
        }
      })
    })
  }
}
