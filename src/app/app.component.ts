import { Component } from '@angular/core';
import { Activities, RSVP } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  rsvps: RSVP[]=[]
  
  addRsvpToList(rsvp: RSVP) {
    console.info('rsvp >>> ', rsvp)
      const rsvps = this.rsvps.push(rsvp)
  }

  processNewActivity(activities: Activities) {
    console.info('>>>> process activities: ', activities)
  }
  
}
