const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc');
var mailTemplateSchema = new mongoose.Schema({
    TemplateId: {                             //field name
        type: Number,
        unique:true
    },
   AttendanceStatus: {
        type: String,
        required: 'Attendance status is mandatory'
    },
    Template: {
        type: String,
        required: 'template can\'t be empty'
    },
});
mailTemplateSchema.plugin(autoIncrement.plugin, {
  model: 'MailTemplate',
  field: 'TemplateId',
  startAt: 500,
  incrementBy: 1
});
mongoose.model('MailTemplate', mailTemplateSchema);