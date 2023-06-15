import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        const filter = args.toLocaleLowerCase();
        return value.filter((val: any) => {
            let rVal = (val.communityId.toLocaleLowerCase().includes(filter)) ||
                (val.communityName.toLocaleLowerCase().includes(filter)) ||
                (val.region.toLocaleLowerCase().includes(filter)) ||
                (val.rpm.toLocaleLowerCase().includes(filter));
            return rVal;
        })

    }

}