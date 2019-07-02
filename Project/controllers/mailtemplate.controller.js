const mongoose = require('mongoose');
 
const MailTemplate = mongoose.model('MailTemplate');
module.exports.createMailTemplate = (req, res, next) => {

    var new_mail = new MailTemplate(req.body);
    //new_mail.AttendanceStatus="a";
   // new_mail.Template=;
     new_mail.save((err, mail) => {
        if (err)
          return next(err);
         console.log('Mail functionality successful');
         res.json(mail);    
    });
}
module.exports.editMailTemplate = function(req, res) {
    MailTemplate.findOneAndUpdate({TemplateId: req.body.TemplateId}, req.body, {new: true}, function(err, mail) {
      if (err)
        res.send(err);
      console.log("Updated Successfully"); 
      res.json(mail);
    });
  };


module.exports.ShowMailTemplate = function(req, res, next) {
   var query = {}
    var perPage = 200
    var page = req.params.page || 1
    query.skip=(perPage * page) - perPage
    query.limit=perPage
    MailTemplate .find({},{},query,function(err, mailDetails) {
      if (err)
         res.send(err);
      res.json(mailDetails);
    });   };

exports.deleteMailTemplate = function(req, res) {
  MailTemplate.remove({
     TemplateId: req.params.templateId
  }, function(err, mail) {
    if (err)
      res.send(err);
    res.json({ message: 'Mail deleted' });
  });
};

exports.getTemplate=function(templateId,callback){
  MailTemplate.find({TemplateId:templateId}, function(err, templateContent) {
    if (err){
        return callback(err);
    }
    return callback(templateContent);
  });
};