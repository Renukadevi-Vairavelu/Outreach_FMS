const mongoose = require('mongoose');
 
const Enrollment = mongoose.model('Enrollment');
module.exports.createEnrollment = (req, res, next) => {
    var new_enrollment = new Enrollment(req.body);
    new_enrollment.save((err, enrollment) => {
        if (err)
          return next(err);
         console.log('Enrollment successful');
         res.json(enrollment);    
    });
}
module.exports.editEnrollment = function(req, res) {
    Enrollment.findOneAndUpdate({EventId: req.params.EventId}, req.body, {new: true}, function(err, enrollment) {
      if (err)
        res.send(err);
      console.log("Updated Successfully"); 
      res.json(enrollment);
    });  };


module.exports.ShowEnrollment = function(req, res, next) {
   var query = {}
    var perPage = 200
   var page = req.params.page || 1
    query.skip=(perPage * page) - perPage
    query.limit=perPage
    Enrollment .find({},{},query,function(err, enrollmentDetails) {
      if (err)
         res.send(err);
      res.json(enrollmentDetails);
    });   
};
  
exports.deleteEnrollment = function(req, res) {
  Enrollment.remove({
    EventId: req.params.eventId,
    EmployeeId:req.params.employeeId
  },
  function(err, event) {
    if (err)
      res.send(err);
    res.json({ message: 'Enrollment deleted' });
  });
};

exports.getEnrollmentDetails=function(eventId,callback){
  Enrollment.find({EventId:eventId}, function(err, enrollmentDetails) {
    if (err){
        return callback(err);
    }
    return callback(enrollmentDetails);
  });
};

