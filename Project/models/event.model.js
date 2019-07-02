const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc');

var eventSchema = new mongoose.Schema({
    EventId: {                             //field name
        type: Number,
        unique:true
    },
    EventName: {
        type: String,
       required: 'Event name can\'t be empty'
    },
    EventDate: {
        type: Date,
        required: 'Event date can\'t be empty'
    },
    Baselocation: {
        type: String,
        required: 'location can\'t be empty'
        },
    Project: {
        type: String,
        required: 'Project can\'t be empty'
        },
    NoofEnrollments: {
        type: Number,
        },
    EventPOCId: {
        type: Number,
        required: 'Event_POC_Id can\'t be empty'
        },
    EventPOCName: {
        type: String,
        required: 'Event_POC_Names can\'t be empty'
        },
});


eventSchema.plugin(autoIncrement.plugin, {
    model: 'Event',
    field: 'EventId',
    startAt: 10001,
    incrementBy: 1
  });

mongoose.model('Event', eventSchema);