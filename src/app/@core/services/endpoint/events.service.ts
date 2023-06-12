import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../backend/common/api/http.service';
import { EventDto } from '../../interfaces/system/events';

@Injectable({
   providedIn: 'root'
})
export class EventService {

   path = 'endpoint/events'

   constructor(
      private api: HttpService,
   ) { }

   getLogEvent(start: any, end: any): Observable<EventDto[]> {
      if (start) {
         start = this.convertDateToTime(start)
      }
      if (end) {
         end = this.convertDateToTime(end)
      }
      start && typeof start !== 'undefined' && start !== 0 ? start = 'start=' + start : '';
      end && end !== undefined && end !== 0 ? end = '&end=' + end : '';
      return this.api.get(`${this.path}?${start}${end}`)
   }

   getLogEventByName(eventName: string, start: any, end: any): Observable<EventDto[]> {
      if (start) {
         start = this.convertDateToTime(start)
      }
      if (end) {
         end = this.convertDateToTime(end)
      }
      start && typeof start !== 'undefined' && start !== 0 ? start = '?start=' + start : '';
      end && end !== undefined && end !== 0 ? end = '&end=' + end : '';

      if (eventName) {
         return this.api.get(`${this.path}/name/${eventName}${start}${end}`)
      }
   }

   getLogEventByType(eventType: string, start: any, end: any): Observable<EventDto[]> {
      if (start) {
         start = this.convertDateToTime(start)
      }
      if (end) {
         end = this.convertDateToTime(end)
      }
      start && typeof start !== 'undefined' && start !== 0 ? start = '?start=' + start : '';
      end && end !== undefined && end !== 0 ? end = '&end=' + end : '';
      if (eventType) {
         return this.api.get(`${this.path}/type/${eventType}${start}${end}`)
      }
   }

   getLogEventByUser(userId: string, start: any, end: any): Observable<EventDto[]> {
      if (start) {
         start = this.convertDateToTime(start)
      }
      if (end) {
         end = this.convertDateToTime(end)
      }
      start && typeof start !== 'undefined' && start !== 0 ? start = '?start=' + start : '';
      end && end !== undefined && end !== 0 ? end = '&end=' + end : '';
      if (userId) {
         return this.api.get(`${this.path}/user/${userId}${start}${end}`)
      }
   }

   convertDateToTime(date: string) {
      return new Date(date).getTime()
   }
}