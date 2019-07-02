const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc');
var mailSchema = new mongoose.Schema({
    MailSequenceNumber: {                             //field name
        type: Number,
        unique:true
    },
    EventId: {                             //field name
        type: Number
    },
        EmployeeId: {                             //field name
        type: Number
    },
    MailSentDate: {
        type: Date,
        required: 'date can\'t be empty'
    },
});
mailSchema.plugin(autoIncrement.plugin, {
  model: 'Mail',
  field: 'MailSequenceNumber',
  startAt: 1,
  incrementBy: 1
});
mongoose.model('Mail', mailSchema);