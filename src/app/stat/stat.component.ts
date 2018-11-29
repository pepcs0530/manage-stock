declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { StatService } from './services/stat/stat.service';
import { dateToStrYYYYMMDD } from '@shared/utils/date-to-str-yyyymmdd';


@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
    imgPath = require('src/assets/images/rice.jpg');
    numberOnly: RegExp = /^\d+$/;
    data: any;
    barOptions: any;
    display: Boolean;
    showBarChart: Boolean;
    yyyymm: string;

    constructor(
        private statService: StatService
    ) { }

    ngOnInit() {
        this.display = true;
        this.data = {
            labels: [
                'ข้าวหอมมะลิ 105',
                'ข้าวหอมมะลิทุ่งกุลา',
                'ข้าวเหนียวพันธุ์ กข. 6',
                'ข้าวเหนียวเขาวงกาฬสินธ์ุ',
                'ข้าวเหนียวเขี้ยวงู',
                'ข้าวเหนียวดำหรือข้าวก่ำ',
                'ข้าวเหลืองประทิวชุมพร',
                'ข้าวเจ๊กเชยเสาไห้',
                'ข้าวกล้อง',
                'ข้าวไรซ์เบอร์รี',
                'ข้าวมันปู',
                'ข้าวสังข์หยดพัทลุง'],
            datasets: [
                {
                    label: 'ชนิดสายพันธุ์ข้าว',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 53, 51, 15, 18, 30, 35, 40]
                }
                /* {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                } */
            ]
        };

        this.barOptions = {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                        // return datasetLabel + ' : ' + formatNumber(tooltipItem.yLabel, 'en', '.2');
                        return 'จำนวน ' + tooltipItem.yLabel + ' กระสอบ';
                    }
                }
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        callback: function (label, index, labels) {
                            // return formatNumber(label, 'en', '1.');
                            return label;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'จำนวนกระสอบ'
                    }
                }]
            }
        };

    }

    search(key) {
        if (key) {
            const yyyymm = dateToStrYYYYMMDD(key).substr(0, 6);
            console.log('yyyymm-->', yyyymm);
            this.statService.getStatRiceVarietiesByCondition(yyyymm).subscribe(
                resultArray => {
                    // this.members = resultArray;
                    console.log('Result-->', resultArray);

                    this.data = Object.assign(
                        {},
                        {
                            labels: resultArray.map(a => a.rice_var_name),
                            datasets: [
                                {
                                    label: 'ยอดขายในแต่ละสายพันธุ์',
                                    backgroundColor: '#42A5F5',
                                    borderColor: '#1E88E5',
                                    data: resultArray.map(a => a.quantity)
                                }
                            ]
                        }
                    );

                    if (resultArray.length > 0) {
                        this.showBarChart = true;
                    } else {
                        this.showBarChart = false;
                    }
                },
                error => console.log('Error :: ', error)
            );
        } else {
            alert('กรุณาระบุเดือน/ปี');
        }
    }
}
