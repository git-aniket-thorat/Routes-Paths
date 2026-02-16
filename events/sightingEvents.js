
import EventEmitter from 'node:events'
import { createALert } from '../utils/createAlert.js'

export const sightingEvents= new EventEmitter()

sightingEvents.on('sighting-added',createALert)