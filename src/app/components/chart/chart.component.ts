import { Component, OnInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
import { Subject } from "rxjs";
import { WealtherdataService } from "src/app/services/wealtherdata.service";
import { urlOptions } from "src/app/common/common.model";
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {

  //Countries data
  countries: string[] = ["UK", "England", "Scotland", "Wales"];
  selectedCountry="UK";

  //Metric Data
  selectedMetric="Tmax";
  metrics = [
    {
      "text": "Tmax (max temperature)",
      "value": "Tmax"

    },
    {
      "text": "Tmin (min temperature)",
      "value": "Tmin"

    },
    {
      "text": "Rainfall (mm)",
      "value": "Rainfall"

    }
  ]

  //Show loader
  isloading:boolean=false;

  //Chart 
  private chart: am4charts.XYChart;

  //UnSubscription  Object
  private unsubscribe = new Subject<void>();

  constructor(
    private weatherService: WealtherdataService,
    private zone: NgZone) { }

  ngOnInit() {
    this.getData();
  }

  /**
   * Fetch the data
   */
  getData() {
    this.isloading=true;
    let options: urlOptions = {
      metric: this.selectedMetric,
      location: this.selectedCountry
    }
    this.weatherService.getWeatherData(options).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      this.isloading=false;
      this.drawChart(res);
      
    });
  }

  /**
   * Draw chart acc. to data
   * @param wealtherData 
   */
  drawChart(wealtherData) {

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);


      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < wealtherData.length; i++) {
        visits = wealtherData[i].value;
        data.push({ date: new Date(wealtherData[i].year, wealtherData[i].month, 1), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
