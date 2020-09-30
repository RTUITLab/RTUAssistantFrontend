import { Component, OnInit } from '@angular/core';
import { KeywordSpottingService } from '../shared/keyword-spotting.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private spotting: KeywordSpottingService) { }

  ngOnInit(): void {
    this.spotting.Init('mira').subscribe(() => {
      console.log('kek');
    });

    

  }


  start_spotting() {
    this.spotting.Record();
  }

}
