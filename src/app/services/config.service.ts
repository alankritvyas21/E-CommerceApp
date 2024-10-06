import { map } from "rxjs/operators";

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    config: any;
    constructor(private http: HttpClient) { }
    load(url: string) {
        return new Promise<void>((resolve) => {
            this.http.get(url)
                .pipe(
                    map(res => res))
                .subscribe(config => {
                    this.config = config;
                    resolve();
                })
        });

    }

    getApiBaseUrl(): string {
        return this.config.apiBaseUrl;
    }

    getImageUrl(): string {
        return this.config.imageBaseUrl;
    }

}


