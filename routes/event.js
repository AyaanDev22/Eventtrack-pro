const express = require("express");
const {
    createEvent,
    RegisterEvent,
    editEvent,
    Event,
    Event_Details,
    Event_Registration_Count_By_Event,
    Event_Registration_Count,
    AttendanceStatus,
    Event_Delete,
    Event_Edit,
    registration_user

} = require("../controllers/event");
const upload=require('../middlewares/multer')
const event_routes = express.Router();
    event_routes.post("/create", upload.single("image"), createEvent);
          // create event
event_routes.post("/register/:id", RegisterEvent); // user register
    event_routes.put("/edit/:id", upload.single("image"), editEvent); 
event_routes.get('/event', Event)
event_routes.get('/event_details/:id', Event_Details)
event_routes.get("/event/:id/registrations/count", Event_Registration_Count_By_Event);
event_routes.get('/event_registration_count',Event_Registration_Count)
event_routes.post('/attendance_mark', AttendanceStatus)
event_routes.delete('/event_delete/:id',Event_Delete)
event_routes.get('/registrations',registration_user)
module.exports = event_routes;
