const mongoose = require('mongoose');
var enrollmentSchema = new mongoose.Schema({
    EventId: {                             //field name
        type: Number,
        required: 'Event ID can\'t be empty'
    },
        EmployeeId: {                             //field name
        type: Number
    },
    EmployeeName: {
        type: String,
        required: 'Employee name can\'t be empty'
        },
    BusinessUnit: {
        type: String,
        required: 'BU can\'t be empty'
    },
    ContactNumber:{
        type:Number,
        required: 'Contact number can\'t be empty'
    },
    AttendanceStatus: {
        type: String
       // required: 'Attendance status is mandatory'
    },
    MailId: {
        type: String,
        required: 'Mail Id is mandatory'
       },
});
mongoose.model('Enrollment', enrollmentSchema);