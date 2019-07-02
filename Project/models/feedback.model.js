const mongoose = require('mongoose');
var feedbackSchema = new mongoose.Schema({
    EventId: {                             //field name
        type: Number
    },
        EmployeeId: {                             //field name
        type: Number
    },
        FeedbackRequestSentFlag: {
        type: Boolean
    },
    LastRequestedDate: {
        type: Date
    },
    FeedbackReceivedFlag: {
        type: Boolean
    },
    LastReceivedDate: {
        type: Date
    },
    Rating: {
        type: Number
        },
    Description: {
        type: String
        },
    AdminResponse: {
        type: String
        },
});
mongoose.model('Feedback', feedbackSchema);