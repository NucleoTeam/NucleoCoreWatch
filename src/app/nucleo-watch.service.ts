import { Injectable } from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class NucleoWatchService {
  socket = null;
  data = {
    requests: []
  };
  constructor() {
    var t = this;
    
    t.socket = new WebSocket('wss://dev.nucleocore.com/ws');

    t.socket.addEventListener('open', function (event) {
      console.log('Connected to server!');
    });
    t.socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      let steps = {};
      data.steps.forEach(function(step) {
        steps[step.step] = step;
      });
      let obj = {};
      obj['exec'] = data.execution;

      obj['chains'] = [];
      obj['chainBreak'] = data.chainBreak;
      obj['steps'] = data.steps;
      let totalSteps = 0;

      for ( let i = 0; i < data.chainList.length; i++) {
        let chain = '';
        let chainStr = '';
        let chainSteps = [];
        let time = 0;
        for ( let j = 0; j < data.chainList[i].length; j++ ) {
          totalSteps += 1;
          let link = data.chainList[i][j];
          chainStr += (( chain !== '' ) ?  '.' : '' ) + link;
          let decorator = 0;
          if (!steps[chainStr]) {
            decorator = 1;
            if (!obj['chainBreak']['breakChain']) {
              decorator = -1;
            }
          } else {
            const x = steps[chainStr];
            time += x.total;
            chainSteps.push(x);
          }
          if (decorator === -1) {
            link = '<span style="color:darkred;font-weight: bolder;">' + link + '</span>';
          } else if (decorator === 1) {
            link = '<span style="color:#cacaca;font-weight: bolder;">' + link + '</span>';
          } else {
            link = '<span style="color:darkgreen;font-weight: bolder;">' + link + '</span>';
          }
          chain += (( chain !== '' ) ?  '.' : '' ) + link;
        }
        let badge = ((time > 0 && time <= 50) ? '<span class="badge badge-success">' + time + ' ms</span>' : '' );
        badge += ((time > 50 && time < 100) ? '<span class="badge badge-warning">' + time + ' ms</span>' : '' );
        badge += ((time > 100) ? '<span class="badge badge-danger">' + time + ' ms</span>' : '' );
        obj['chains'].push({
          html: chain + badge,
          string: chainStr,
          time: time,
          steps: chainSteps,
          step: steps[chainStr]
        });
      }
      obj['totalSteps'] = totalSteps;
      obj['origin'] = data.origin;
      obj['completed'] = obj['steps'].length === obj['totalSteps'] || obj['chainBreak']['breakChain'];
      t.data.requests.unshift(obj);
      t.data.requests.slice(0, 15);
    });
  }
}
