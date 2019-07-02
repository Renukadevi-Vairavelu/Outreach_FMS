const mongoose = require('mongoose');
const Event = mongoose.model('Event');
module.exports.createEvent = (req, res, next) => {
    var new_event = new Event(req.body);
    new_event.save((err, event) => {
        if (err)
          return next(err);
         console.log('Registration successful');
         res.json(event);    
    });
}
module.exports.editEvent = function(req, res) {
    Event.findOneAndUpdate({EventId: req.body.EventId}, req.body, {new: true}, function(err, event) {
      if (err)
        res.send(err);
      console.log("Updated Successfully"); 
      res.json(event);
    });
  };

module.exports.ShowEvents = function(req, res, next) {
   var query = {}
    var perPage = 200
    var page = req.params.page || 1
    query.skip=(perPage * page) - perPage
    query.limit=perPage
    Event.find({},{},query,function(err, eventDetails) {
      if (err)
         res.send(err);
      res.json(eventDetails);
    });   
};
 
exports.deleteEvent = function(req, res) {
  Event.remove({
    EventId: req.params.EventId
  },
  function(err, event) {
    if (err)
    {
      res.send(err);
      }
    res.json({ message: 'Event deleted' });
  });
};

module.exports.getNoOfEnrollments= function(req,res,next){
  
   Event.aggregate([
     {$group: {_id:'$EventId', Count: {$sum:1}}
    }],
    function(err, result) { 
      res.json(result);
      });   
  };
  module.exports.eventParticipationRatio= function(req, res, next) {
    
      Event.aggregate([
       
        {$group: {_id:'$Baselocation', Enrollments: {$sum:"$NoofEnrollments"}},
       }], function(err, result) {
         console.log(result); 
         res.json(result);  
       });
   };



   exports.getEventDetails=function(eventId,callback){
    Event.find({EventId:eventId}, function(err, eventDetails) {
      if (err){
          return callback(err);
      }
      return callback(eventDetails);
    });
  };