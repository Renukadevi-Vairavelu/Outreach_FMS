const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');
const Event = mongoose.model('Event');

module.exports.createFeedback = (req, res, next) => {
    var new_feedback = new Feedback(req.body);
    new_feedback.save((err, feedback) => {
        if (err)
          return next(err);
         console.log('Feedback sent successful');
         res.json(feedback);    
    });

}
module.exports.editFeedback = function(req, res) {
    Feedback.findOneAndUpdate({EventId: req.params.EventId}, req.body, {new: true}, function(err, feedback) {
      if (err)
        res.send(err);
      console.log("Updated Successfully"); 
      res.json(feedback);
    });
  };


module.exports.ShowFeedback = function(req, res, next) {
   var query = {}
    var perPage = 200
    var page = req.params.page || 1
    query.skip=(perPage * page) - perPage
    query.limit=perPage
    Feedback.find({},{},query,function(err, feedbackDetails) {
      if (err)
         res.send(err);
      res.json(feedbackDetails);
    });   
};
 
exports.deleteFeedback = function(req, res) {
  Feedback.remove({
    EventId: req.params.eventId,
    EmployeeId:req.params.employeeId
  }, function(err, event) {
    if (err)
      res.send(err);
    res.json({ message: 'Feedback deleted' });
  });
};
module.exports.ShowFeedbacks = function(req, res, next) {
   var query = {}
    var perPage = 200
    var page = req.params.page || 1
    query.skip=(perPage * page) - perPage
    query.limit=perPage
    Feedback.find({},{},query,function(err, feedbackDetails) {
      if (err)
         res.send(err);
      res.json(feedbackDetails);
    });   

};

module.exports.insertFeedbackSentStatus=function(eventId, employeeId){
      var query = {"EventId":eventId,"EmployeeId":employeeId},
      update = { expire: new Date(),"FeedbackRequestSentFlag":true,"LastRequestedDate":new Date() },  
      options = { upsert: true, new: true, setDefaultsOnInsert: true };  
      Feedback.findOneAndUpdate(query, update, options, function(error, result) {  
      if (error) 
      { 
         console.log(error);
         return false;
      }
      console.log("Feedback sent Flag is updated");
      return true;
     });
  };

  module.exports.eventScoreRatio= function(req, res, next) {
   Feedback.aggregate([
    {$group: {_id:'$EventId', AverageScore: {$avg:'$Rating'}}
    }], function(err, result) {
      console.log(result); 
      res.json(result);  
    });
};



module.exports.eventScoreRatioTest= function(req, res, next) {
    console.log("entered");
   Feedback.aggregate([{$lookup:{
      from: "events",
      localField: "EventId",
      foreignField: "EventId",
      as: "EventDetails"
      }}],function(err, result) {
           res.json(result);
      });
}; 


 
 
