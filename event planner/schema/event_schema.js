import mongo from 'mongoose'; 


const eventSchema = new mongo.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true }, 
  eventDiscription: { type: String, required: true },
  eventAttendees: { type: String, required: true },

});

const Event = mongo.model('Event', eventSchema);
export default Event;