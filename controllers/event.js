const Event = require("../models/event");
const event_registration = require('../models/event_registration')
const crypto = require('crypto')
exports.createEvent = async (req, res) => {
  try {
    const { title, venue, description, date, time, deadline, maxCapacity } = req.body;

    if (!title || !venue || !date || !time) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const imgUrl = req.file?.path || null; // secure Cloudinary URL

    const event = await Event.create({
      title,
      venue,
      description,
      date,
      time,
      deadline,
      maxCapacity,
      imgUrl, // matches your schema
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.RegisterEvent = async (req, res) => {

  try {
    const { eventId, name, email, phone, organization } = req.body;

    const registrationId = "REG-" + crypto.randomBytes(3).toString("hex").toUpperCase();
    const qrCodeData = registrationId; // can also include eventId if you want: JSON.stringify({ id: registrationId, eventId })

    const newRegistration = await event_registration.create({
      eventId,
      name,
      email,
      phone,
      organization,
      registrationId,
      qrCodeData,
    });

    res.status(201).json({registration:newRegistration});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};



// Edit / Update Event
exports.editEvent = async (req, res) => {
  try {
    const { id } = req.params; // Event ID
    const { title, venue, description, date, time, deadline, maxCapacity } = req.body;

    if (
      !title &&
      !venue &&
      !description &&
      !date &&
      !time &&
      !deadline &&
      !maxCapacity &&
      !req.file
    ) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    const updateData = {
      ...(title && { title }),
      ...(venue && { venue }),
      ...(description && { description }),
      ...(date && { date }),
      ...(time && { time }),
      ...(deadline && { deadline }),
      ...(maxCapacity && { maxCapacity }),
      ...(req.file && { imageUrl: req.file.path }) // Cloudinary image
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.Event = async (req, res) => {
  try {
    const event = await Event.find({})
    if (!event) {
      res.status(201).json({ message: "event are exist" })
    }
    res.status(201).json({
      message: "Event successfully get",
      event,
    });
  } catch (error) {
    console.log(error);

  }
}
exports.Event_Details = async (req, res) => {
  try {
    const { id } = req.params
    const event_detail = await Event.findById(id)
    if (!event_detail) {
      res.status(201).json({ message: "event detail are not found" })
    }
    res.status(201).json({
      message: "Event successfully get",
      event_detail,
    });

  } catch (error) {
    console.log(error);

  }
}
// GET /event/:id/registrations/count
exports.Event_Registration_Count_By_Event = async (req, res) => {
  try {
    const { id } = req.params;

    const count = await event_registration.countDocuments({ eventId: id });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.Event_Registration_Count = async (req, res) => {
  try {
    const registrations = await event_registration.find(); // get all registrations
    res.status(200).json({ registration: registrations }); // return array of documents
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};



exports.AttendanceStatus = async (req, res) => {
  try {
    const { registrationId } = req.body;

    // Find single registration
    const registration = await event_registration.findOne({ registrationId });
    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    // Check if already present
    if (registration.attendanceStatus === "PRESENT") {
      return res.status(400).json({ success: false, message: "Participant already checked in" });
    }

    // Mark as present and save
    registration.attendanceStatus = "PRESENT";
    await registration.save();

    return res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      attendee: {
        name: registration.name,
        email: registration.email,
        registrationId: registration.registrationId
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.Event_Delete=async (req,res) => {
  try {
   const {id}=req.params
   const event= await Event.findByIdAndDelete(id)
   res.status(201).json({event,message:"Event delete Successfully"}) 
  } catch (error) {
    console.log(error);
    
  }
}

// Get all registration users
exports.registration_user = async (req, res) => {
  try {
    const registrations = await  event_registration.find({}); // fetch all registrations
    res.status(200).json({registrations}); // directly send array
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};
