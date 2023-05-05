import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGoodGroupDto } from '../shared/models/basket';
import { ApiService } from '../shared/services/api.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit, OnDestroy {

    categories: IGoodGroupDto[] = [];
    categoriesTree: IGoodGroupDto[] = [];
    subscription = new Subscription();
    hasCategories = true;
    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.subscription.add(
            this.apiService.getGoodGroups().subscribe({
                next: (response) => {
                    console.log(response.data);
                    this.categories = response.data;
                    this.categoriesTree = this.convertListToObjArray();
                    if (this.categories.length == 0) {
                        this.hasCategories = false;
                    } else {
                        this.hasCategories = true;
                    }
                },
                error: (error) => { console.log(error); },
            })
        );

    }

    convertListToObjArray(parentId: number | null = null) {
        let temp: IGoodGroupDto[] = [];
        this.categories.filter(p => (p.parent?.id || null) == parentId).forEach((Element) => {
            temp.push({
                ...Element,
                children: this.convertListToObjArray(Element.id)
            });
        });
        return temp;
    }



    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
