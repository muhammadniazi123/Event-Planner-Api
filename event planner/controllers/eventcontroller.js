import Event from "../schema/event_schema.js";

const createEvent = async (req, res) => {
    const data=req.body;
    const {eventName, eventDate, eventAttendees, eventDiscription} = data;
    try {
        const userExist= await Event.findOne({eventName: eventName});
        if(userExist){
            return res.status(400).json({msg:"this Event already exist"})
        }
        const Eventcreated = await Event.create({
            eventName,
            eventDate, 
            eventAttendees, 
            eventDiscription
        })
        res.status(201).json({
            msg:"Event created"
        })

        
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

const findEventbyName = async (req, res) => {
    const data=req.body;
    const {eventName} = data;
    try {
        const eventExist= await Event.findOne({eventName: eventName});
        if(eventExist){
            return res.status(201).json(eventExist)
        }

        res.status(400).json({
            msg:"Event with this name not fount"
        })

        
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
const findEventbyDate = async (req, res) => {
    const data=req.body;
    const {eventDate} = data;
    try {
        const eventExist= await Event.find({eventDate: eventDate});
        if(eventExist){
            return res.status(201).json(eventExist)
        }

        res.status(400).json({
            msg:"Event with this Date not fount"
        })

        
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export default {createEvent ,findEventbyName, findEventbyDate}