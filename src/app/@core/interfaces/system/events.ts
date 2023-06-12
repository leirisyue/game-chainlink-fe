import { EventName, EventStatus, EventType } from "../enum"

export class EventDto {
   id: string
   eventName: EventName
   eventType: EventType
   eventStatus: EventStatus
   eventDetail: string
   timestamp: Date
   filter?: string
}