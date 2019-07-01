import { Component, OnInit } from '@angular/core';
import {NucleoWatchService} from '../../nucleo-watch.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],

})
export class TablesComponent implements OnInit {
  data = {};
  selected = null;
  constructor(private nucleoWatchService: NucleoWatchService) {}

  ngOnInit() {
    this.data = this.nucleoWatchService.data;
  }

  open(step) {
    this.selected = step;
  }

}
