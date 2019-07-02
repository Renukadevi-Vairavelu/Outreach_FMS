const express = require('express');
const router = express.Router();

const ctrlEvent = require('../controllers/event.controller');
const ctrlFeedback = require('../controllers/feedback.controller');
const ctrlEnrollment = require('../controllers/enrollment.controller');
const ctrlMail = require('../controllers/mail.controller');
const ctrlMailTemplate = require('../controllers/mailtemplate.controller');


router.post('/createEvent', ctrlEvent.createEvent);
router.put('/editEvent/:EventId', ctrlEvent.editEvent);
router.get('/ShowEvents',ctrlEvent.ShowEvents);
router.delete('/deleteEvent/:EventId',ctrlEvent.deleteEvent);
router.get('/getEventEnrollmentsRatio',ctrlEvent.getNoOfEnrollments);
router.get('/getEventParticipationRatio',ctrlEvent.eventParticipationRatio);


router.post('/createFeedback', ctrlFeedback.createFeedback);
router.put('/editFeedback/:EventId', ctrlFeedback.editFeedback);
router.get('/ShowFeedback',ctrlFeedback.ShowFeedback);
router.delete('/deleteFeedback/:eventId/:employeeId',ctrlFeedback.deleteFeedback);
router.get('/getEventFeedbackScoreRatio',ctrlFeedback.eventScoreRatio);

 
router.post('/createEnrollment', ctrlEnrollment.createEnrollment);
router.put('/editEnrollment/:EventId', ctrlEnrollment.editEnrollment);
router.get('/ShowEnrollment',ctrlEnrollment.ShowEnrollment);
router.delete('/deleteEnrollment/:eventId/:employeeId',ctrlEnrollment.deleteEnrollment);

router.post('/createMail', ctrlMail.createMail);
router.put('/editMail', ctrlMail.editMail);
router.get('/ShowMail',ctrlMail.ShowMail);
router.delete('/deleteMail/:MailSequenceNumber',ctrlMail.deleteMail);
router.get('/sendMail/:eventId',ctrlMail.sendBulkMail);
//router.get('/readMail',ctrlMail.readMail);

router.post('/createMailTemplate', ctrlMailTemplate.createMailTemplate);
router.put('/editMailTemplate', ctrlMailTemplate.editMailTemplate);
router.get('/ShowMailTemplate',ctrlMailTemplate.ShowMailTemplate);
router.delete('/deleteMailTemplate/:templateId',ctrlMailTemplate.deleteMailTemplate);



module.exports = router;



