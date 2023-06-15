import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})

export class XLSXService {

    public data: FileReader | undefined;

    readExcel(file: File): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            if (!file) {
                resolve('');
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = reader.result;
                resolve(text);
            };
            reader.readAsBinaryString(file);
        });
    }

    binaryToSheet(binaryString: any) {
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        return worksheet;
    }

    getExcelByRange(worksheet: XLSX.WorkSheet, range: string) {
        const range_data: any = XLSX.utils.sheet_to_json(worksheet, { range: range, header: 1 });
        const rangeData = range_data[0];
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        let obj: any = {};
        let data: any = {};
        months.forEach((element: any, i: number) => {
            let obj: any = {};
            obj[element] = rangeData[i];
            // data.push({ month: element, value: rangeData[i] })
            Object.assign(data, obj);
        })
        obj.monthData = data;
        obj.total = rangeData[12];
        obj.budget = rangeData[13];
        return obj;
    }
}
