const mongoose = require('mongoose');
const gmailId='test3M2019@gmail.com';
const pwd='Nopass@2019';

const Mail = mongoose.model('Mail');
module.exports.createMail = (req, res, next) => {

    var new_mail = new Mail(req.body);
  
    new_mail.save((err, mail) => {
        if (err)
          return next(err);
         console.log('Mail functionality successful');
         res.json(mail);    
    });
}
module.exports.editMail = function(req, res) {
    Mail.findOneAndUpdate({EventId: req.body.EventId}, req.body, {new: true}, function(err, mail) {
      if (err)
        res.send(err);
      console.log("Updated Successfully"); 
      res.json(mail);
    });
  };


module.exports.ShowMail = function(req, res, next) {
   var query = {}
    var perPage = 200
    var page = req.params.page || 1
    query.skip=(perPage * page) - perPage
    query.limit=perPage
    Mail .find({},{},query,function(err, mailDetails) {
      if (err)
         res.send(err);
      res.json(mailDetails);
    });   
};
 
exports.deleteMail = function(req, res) {
  Mail.remove({
   MailSequenceNumber:req.params.MailSequenceNumber
  },
  function(err, mail) {
    if (err)
      res.send(err);
    res.json({ message: 'Mail deleted' });
  });
};

function insertMailHistory(eventId,employeeId){
  var new_mail=new Mail();
  new_mail.EventId=eventId;
  new_mail.EmployeeId=employeeId;
  new_mail.MailSentDate=new Date();
  new_mail.save((err, mail) => {
        if(err)
        return false;
        console.log('Sent Mail details are saved'); 
        return true;
    });
}


const nodemailer = require("nodemailer");
var Imap = require('imap'),
inspect = require('util').inspect;
var fs = require('fs'), fileStream;

const ctrlEvent = require('../controllers/event.controller');
const ctrlVolunteer = require('../controllers/enrollment.controller');
const ctrlMailTemplate = require('../controllers/mailtemplate.controller');
const ctrlFeedback = require('../controllers/feedback.controller');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: 'smtp.gmail.com', //using smtp server.
    secure: true, //should be true for port 465. false for other ports
    auth: {
        user: "test3M2019@gmail.com", // try giving your gmail account for testing purpose
        pass: "Nopass@2019" //provide the password for the gmail account mentioned above
    }
});   
var mailOptions={
        from:"test3M2019@gmail.com",
        to : "", 
        subject : "Outreach Feedback",
        html : "test"
}

module.exports.sendBulkMail = function(req, res, next) {
      console.log("received"+ req.params.eventId);
      var eventId= req.params.eventId;
      var html1,html2,html3;
      var eventName,eventDate;
      ctrlEvent.getEventDetails(eventId,function(eventDetailsList){
        eventName=eventDetailsList[0].EventName;
        eventDate=eventDetailsList[0].EventDate.toDateString();
        console.log(eventName+eventDate);

        ctrlVolunteer.getEnrollmentDetails(eventId,function(volunteerList){
          volunteerList.forEach(function  (volunteer) {
            //ctrlMailTemplate.getTemplate(504,function(mailtemplate){
            //html1 = mailtemplate[0].Template;
              html1="<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head> <meta http-equiv='Content-Type' content='text/html; charset=us-ascii'>     <title>Outreach Template</title>     <style type='text/css'>         body, td, th {             font-family: 'Segoe UI', Verdana, Arial, Helvetica, sans-serif;             font-size: 14px;             color: #29383e;             margin: 0px;         }          table, td {             vertical-align: top;         }          a img {             border: 0px;         }          a {             color: rgb(5,99,193);             text-decoration: none;         }              a:visited {                 text-decoration: none !important;             }              a:focus {                 text-decoration: none !important;             }              a:hover {                 text-decoration: none !important;             }          .mail-container {             background-color: #f7f7f7;             font-size: 12px;             color: #3e4c51;             width: 100%;         }          .template-table {             border-collapse: collapse;         }              .template-table td {                 padding: 5px;                 color: rgb(99,99,99);                 border: 1px solid rgb(0,51,160);             }          a.mailtoLink {             color: #fff;             font-weight: bold;         }          .linkblock {             width: 216px; 			background: #3E4C51;             color:white;             text-align: center;             padding: 10px 0;         }          .padding-xl {             padding: 15px 20px;             background: white;         }          p.infopart {             padding: 3px 0;             color: #152227;         }          h2 {             font-weight: 500;             color: rgb(99,99,99);             font-size: 16px;         }          .titlepart {             background-color: rgb(222,242,246);             padding: 15px 20px;             color: rgb(99,99,99);         }          .psnote {             padding: 10px 20px;             background-color: rgb(247,247,247);             font-size: 12px;             color: rgb(62,76,81);         }          .foot-tab {             height: 50px; 			background:black;         }          .foot-img1 {             width: 183px;             height: 50px;             border-right: 1px solid rgb(59,56,56);         }   #foot-txt{text-align:left;padding-left:20px;color:#040506;width:420px;height:50px;background-color:rgb(0,0,0);;font-size:16px;text-overflow:clip;overflow:hidden;} #dynamic{background-color:rgb(0,0,0);width:47px;} .wide{width:650px;}  .main-container{margin:0 auto;} #headerimg {height:53px;} #headerimg td{width:256px;}           /* new CSS */         #headerimg td{            background-color:rgb(0,51,160);         }         #RequestDetails p{             color:rgb(99,99,99);         }         #UnsubscribeSection{             color:rgb(0,51,160);         }  		        #RequestOtherDetails p{             color:rgb(99,99,99);         }                 #ApprovalMethods p{             color:rgb(99,99,99);         }         #valedictionSection p{             color:rgb(99,99,99);         }         .linkblock{             border-left: 1px solid white;             border-right: 1px solid white;                    }       </style> </head> <body>     <table width='100%' border='0' cellspacing='0' cellpadding='0'>         <tr>             <td>                 <center>                     <table class='wide' border='0' cellspacing='0' cellpadding='0' style='margin: 0 auto;'>                         <tr>                             <td>                                 <table width='100%' border='0' cellspacing='0' cellpadding='0'>                                     <tr>                                         <td><div class='mail-container'><table width='100%' border='0' cellspacing='0' cellpadding='0'>     <tr id='SaluationSection'>         <td valign='top' class='titlepart padding-xl' style='font:bold 15px Arial;color:#0e91f0;height:20px;'><h2>Hi "+ volunteer.EmployeeName +",  </h2></td>             </tr>     <tr id='RequestDetails'><td class='padding-xl'><p style='padding: 5px 0; color: #4f4f4f;'>You had registered for the "+ eventName +" event on "+ eventDate +". We would like to know the reason for deregistering the event to understand if the team which created this event has some room for improvement in their process, so that we get 100% participation from registered attendees </td></tr> <tr><td class='padding-xl'><p style='padding: 5px 0; color: #4f4f4f;'>Please select any one of the options below and send the response.</p></td></tr> </td></tr> </td></tr>  <tr><td style='height:15px;' width='100%'></td></tr>   <td id='twoWayReplyButtons'><tr id='Tr2'><td style='padding-left:50px;'>        </div><br>       <table align='left' border='0' cellpadding='0' cellspacing='0' class='MsoNormalTable' style='width:487.65pt;mso-cellspacing:0in;mso-yfti-tbllook:1184;  mso-table-lspace:9.0pt;margin-left:4.75pt;mso-table-rspace:9.0pt;margin-right:9.75pt;mso-table-anchor-vertical:paragraph;mso-table-anchor-horizontal:column;  mso-table-left:left;mso-padding-alt:0in 0in 0in 0in' width='0'>     <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=   1.	Unexpected personal commitment '><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 1.	Unexpected personal commitment<br>                 </span></a><o:p></o:p></span>             </p>            </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=2.	Unexpected official work'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>               2.	Unexpected official work<br>                 </span></a><o:p></o:p></span>             </p>         </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'>                     <a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=3.	Event not what I expected'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>            3.	Event not what I expected<br>                 </span></a><o:p></o:p></span>             </p>         </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=4.	Did not receive further information about event'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>             4.	Did not receive further information about event<br>                 </span></a><o:p></o:p></span>             </p>         </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=5.	Incorrectly registered'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br> 5.	Incorrectly registered<br>                 </span></a><o:p></o:p></span>             </p>         </tr>      <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=6.	Do not wish to disclose'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br> 6.	Do not wish to disclose<br>                 </span></a><o:p></o:p></span>             </p>         </tr>     </tr> </table></td></tr></table></td></tr><tr id='AutoGeneratedMailTwoWay'>     <td>         <table width='100%' border='0' cellspacing='0' cellpadding='0'>             <tr>                 <td class='psnote'>                    <p>** Please do not change the Subject line while replying to the Email. **</p>                 </td>             </tr> 			<tr style='height:10px;'></tr>                        <tr style='height:10px;'></tr>         </table>     </td> </tr><tr id='footerImage'>                             <td> 				<table class='foot-tab wide' cellspacing='0' cellpadding='0' border='0'> 					<tr> 						<td class='foot-img1'><img class='foot-img1' src='http://1ct.es/343/images/new_footer_l.png' alt=''></td> 				<td id='foot-txt'> 				<div style='margin-top:6px;color:green;font-size:20px;font-family:Arial Unicode MS'>Outreach</div> </td>  					</tr>					 				</table>                               </td>                         </tr></table>                 </center>             </td>         </tr>     </table> </body> </html> ";
              
            //});
            //ctrlMailTemplate.getTemplate(504,function(mailtemplate){
            //html2 = mailtemplate[0].Template;
              html2="<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head> <meta http-equiv='Content-Type' content='text/html; charset=us-ascii'>     <title>Outreach Template</title>     <style type='text/css'>         body, td, th {             font-family: 'Segoe UI', Verdana, Arial, Helvetica, sans-serif;             font-size: 14px;             color: #29383e;             margin: 0px;         }          table, td {             vertical-align: top;         }          a img {             border: 0px;         }          a {             color: rgb(5,99,193);             text-decoration: none;         }              a:visited {                 text-decoration: none !important;             }              a:focus {                 text-decoration: none !important;             }              a:hover {                 text-decoration: none !important;             }          .mail-container {             background-color: #f7f7f7;             font-size: 12px;             color: #3e4c51;             width: 100%;         }          .template-table {             border-collapse: collapse;         }              .template-table td {                 padding: 5px;                 color: rgb(99,99,99);                 border: 1px solid rgb(0,51,160);             }          a.mailtoLink {             color: #fff;             font-weight: bold;         }          .linkblock {             width: 216px; 			background: #3E4C51;             color:white;             text-align: center;             padding: 10px 0;         }          .padding-xl {             padding: 15px 20px;             background: white;         }          p.infopart {             padding: 3px 0;             color: #152227;         }          h2 {             font-weight: 500;             color: rgb(99,99,99);             font-size: 16px;         }          .titlepart {             background-color: rgb(222,242,246);             padding: 15px 20px;             color: rgb(99,99,99);         }          .psnote {             padding: 10px 20px;             background-color: rgb(247,247,247);             font-size: 12px;             color: rgb(62,76,81);         }          .foot-tab {             height: 50px; 			background:black;         }          .foot-img1 {             width: 183px;             height: 50px;             border-right: 1px solid rgb(59,56,56);         }   #foot-txt{text-align:left;padding-left:20px;color:#040506;width:420px;height:50px;background-color:rgb(0,0,0);;font-size:16px;text-overflow:clip;overflow:hidden;} #dynamic{background-color:rgb(0,0,0);width:47px;} .wide{width:650px;}  .main-container{margin:0 auto;} #headerimg {height:53px;} #headerimg td{width:256px;}           /* new CSS */         #headerimg td{            background-color:rgb(0,51,160);         }         #RequestDetails p{             color:rgb(99,99,99);         }         #UnsubscribeSection{             color:rgb(0,51,160);         }  		        #RequestOtherDetails p{             color:rgb(99,99,99);         }                 #ApprovalMethods p{             color:rgb(99,99,99);         }         #valedictionSection p{             color:rgb(99,99,99);         }         .linkblock{             border-left: 1px solid white;             border-right: 1px solid white;                    }       </style> </head> <body>     <table width='100%' border='0' cellspacing='0' cellpadding='0'>         <tr>             <td>                 <center>                     <table class='wide' border='0' cellspacing='0' cellpadding='0' style='margin: 0 auto;'>                         <tr>                             <td>                                 <table width='100%' border='0' cellspacing='0' cellpadding='0'>                                     <tr>                                         <td><div class='mail-container'><table width='100%' border='0' cellspacing='0' cellpadding='0'>     <tr id='SaluationSection'>         <td valign='top' class='titlepart padding-xl' style='font:bold 15px Arial;color:#0e91f0;height:20px;'><h2>Hi "+ volunteer.EmployeeName +",  </h2></td>             </tr>     <tr id='RequestDetails'><td class='padding-xl'><p style='padding: 5px 0; color: #4f4f4f;'>You had registered for the "+ eventName +" event on "+ eventDate +". We would like to know the reason for not joining the event to understand if the team which created this event has some room for improvement in their process, so that we get 100% participation from registered attendees </td></tr> <tr><td class='padding-xl'><p style='padding: 5px 0; color: #4f4f4f;'>Please select any one of the options below and send the response.</p></td></tr> </td></tr> </td></tr>  <tr><td style='height:15px;' width='100%'></td></tr>   <td id='twoWayReplyButtons'><tr id='Tr2'><td style='padding-left:50px;'>        </div><br>       <table align='left' border='0' cellpadding='0' cellspacing='0' class='MsoNormalTable' style='width:487.65pt;mso-cellspacing:0in;mso-yfti-tbllook:1184;  mso-table-lspace:9.0pt;margin-left:4.75pt;mso-table-rspace:9.0pt;margin-right:9.75pt;mso-table-anchor-vertical:paragraph;mso-table-anchor-horizontal:column;  mso-table-left:left;mso-padding-alt:0in 0in 0in 0in' width='0'>     <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=   1.	Unexpected personal commitment '><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 1.	Unexpected personal commitment<br>                 </span></a><o:p></o:p></span>             </p>            </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=2.	Unexpected official work'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>               2.	Unexpected official work<br>                 </span></a><o:p></o:p></span>             </p>         </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'>                     <a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=3.	Event not what I expected'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>            3.	Event not what I expected<br>                 </span></a><o:p></o:p></span>             </p>         </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=4.	Did not receive further information about event'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>             4.	Did not receive further information about event<br>                 </span></a><o:p></o:p></span>             </p>         </tr>         <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=5.	Incorrectly registered'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br> 5.	Incorrectly registered<br>                 </span></a><o:p></o:p></span>             </p>         </tr>      <tr style='padding:0in 0in 0in 0in' valign='top'>             <p align='left' class='MsoNormal' style='text-align:left;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=6.	Do not wish to disclose'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br> 6.	Do not wish to disclose<br>                 </span></a><o:p></o:p></span>             </p>         </tr>     </tr> </table></td></tr></table></td></tr><tr id='AutoGeneratedMailTwoWay'>     <td>         <table width='100%' border='0' cellspacing='0' cellpadding='0'>             <tr>                 <td class='psnote'>                    <p>** Please do not change the Subject line while replying to the Email. **</p>                 </td>             </tr> 			<tr style='height:10px;'></tr>                        <tr style='height:10px;'></tr>         </table>     </td> </tr><tr id='footerImage'>                             <td> 				<table class='foot-tab wide' cellspacing='0' cellpadding='0' border='0'> 					<tr> 						<td class='foot-img1'><img class='foot-img1' src='http://1ct.es/343/images/new_footer_l.png' alt=''></td> 				<td id='foot-txt'> 				<div style='margin-top:6px;color:green;font-size:20px;font-family:Arial Unicode MS'>Outreach</div> </td>  					</tr>					 				</table>                               </td>                         </tr></table>                 </center>             </td>         </tr>     </table> </body> </html>  ";
            //});
            // ctrlMailTemplate.getTemplate(504,function(mailtemplate){
             // html3 = mailtemplate[0].Template;
             html3="<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head> <meta http-equiv='Content-Type' content='text/html; charset=us-ascii'>     <title>Outreach Template</title>     <style type='text/css'>         body, td, th {             font-family: 'Segoe UI', Verdana, Arial, Helvetica, sans-serif;             font-size: 14px;             color: #29383e;             margin: 0px;         }          table, td {             vertical-align: top;         }          a img {             border: 0px;         }          a {             color: rgb(5,99,193);             text-decoration: none;         }              a:visited {                 text-decoration: none !important;             }              a:focus {                 text-decoration: none !important;             }              a:hover {                 text-decoration: none !important;             }          .mail-container {             background-color: #f7f7f7;             font-size: 12px;             color: #3e4c51;             width: 100%;         }          .template-table {             border-collapse: collapse;         }              .template-table td {                 padding: 5px;                 color: rgb(99,99,99);                 border: 1px solid rgb(0,51,160);             }          a.mailtoLink {             color: #fff;             font-weight: bold;         }          .linkblock {             width: 216px; 			background: #3E4C51;             color:white;             text-align: center;             padding: 10px 0;         }          .padding-xl {             padding: 15px 20px;             background: white;         }          p.infopart {             padding: 3px 0;             color: #152227;         }          h2 {             font-weight: 500;             color: rgb(99,99,99);             font-size: 16px;         }          .titlepart {             background-color: rgb(222,242,246);             padding: 15px 20px;             color: rgb(99,99,99);         }          .psnote {             padding: 10px 20px;             background-color: rgb(247,247,247);             font-size: 12px;             color: rgb(62,76,81);         }          .foot-tab {             height: 50px; 			background:black;         }          .foot-img1 {             width: 183px;             height: 50px;             border-right: 1px solid rgb(59,56,56);         }   #foot-txt{text-align:left;padding-left:20px;color:#040506;width:420px;height:50px;background-color:rgb(0,0,0);;font-size:16px;text-overflow:clip;overflow:hidden;} #dynamic{background-color:rgb(0,0,0);width:47px;} .wide{width:650px;}  .main-container{margin:0 auto;} #headerimg {height:53px;} #headerimg td{width:256px;}           /* new CSS */         #headerimg td{            background-color:rgb(0,51,160);         }         #RequestDetails p{             color:rgb(99,99,99);         }         #UnsubscribeSection{             color:rgb(0,51,160);         }  		        #RequestOtherDetails p{             color:rgb(99,99,99);         }                 #ApprovalMethods p{             color:rgb(99,99,99);         }         #valedictionSection p{             color:rgb(99,99,99);         }         .linkblock{             border-left: 1px solid white;             border-right: 1px solid white;                    }       </style> </head> <body>     <table width='100%' border='0' cellspacing='0' cellpadding='0'>         <tr>             <td>                 <center>                     <table class='wide' border='0' cellspacing='0' cellpadding='0' style='margin: 0 auto;'>                         <tr>                             <td>                                 <table width='100%' border='0' cellspacing='0' cellpadding='0'>                                     <tr>                                         <td><div class='mail-container'><table width='100%' border='0' cellspacing='0' cellpadding='0'>     <tr id='SaluationSection'>         <td valign='top' class='titlepart padding-xl' style='font:bold 15px Arial;color:#0e91f0;height:20px;'><h2>Hi "+volunteer.EmployeeName+",  </h2></td>             </tr>     <tr id='RequestDetails'><td class='padding-xl'><p style='padding: 5px 0; color: #4f4f4f;'>Thanks for participating in the event "+eventName+" on "+eventDate+". </td></tr>  <tr><td class='padding-xl'> </p><p style='color: #525252;'>Your feedback is important to us. Please share your thought on what you liked about this volunteering activity.<br> <p> </p>  Please select the rating below and send us the response. If you select <font color='54C6F3'>Neutral</font> or <font color='54C6F3'>Poor</font>, please reply with reason (s) for your dissatisfaction, which will help us provide better service in future.  </p> </td></tr> </td></tr> </td></tr>  <tr><td style='height:15px;' width='100%'></td></tr>   <td id='twoWayReplyButtons'><tr id='Tr2'><td style='padding-left:50px;'>        </div><br>       <table align='left' border='0' cellpadding='0' cellspacing='0' class='MsoNormalTable' style='width:487.65pt;mso-cellspacing:0in;mso-yfti-tbllook:1184;  mso-table-lspace:9.0pt;margin-left:4.75pt;mso-table-rspace:9.0pt;margin-right:9.75pt;mso-table-anchor-vertical:paragraph;mso-table-anchor-horizontal:column;  mso-table-left:left;mso-padding-alt:0in 0in 0in 0in' width='0'>     <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>         <td colspan='5' style='width: 487.65pt; background: #3E4C51; padding: 7.5pt 0in 7.5pt 0in' valign='top' width='650'>             <p align='center' class='MsoNormal' style='text-align:center;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='#.'><b><span style='color:white'>Select Your Response</span></b></a><o:p></o:p></span></p>         </td>     </tr>     <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>         <td style='padding:0in 0in 0in 0in' valign='top'>             <p align='center' class='MsoNormal' style='text-align:center;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=VeryPoor%0D%0APlease help us to serve you better by giving your valuable feedback:'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 <img id='_x0000_i1025' border='0' src='https://gsd.cognizant.com/VeryPoor.jpg'><br>                 </span></a><o:p></o:p></span>             </p>            </td>         <td style='padding:0in 0in 0in 0in' valign='top'>             <p align='center' class='MsoNormal' style='text-align:center;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=Poor%0D%0APlease help us to serve you better by giving your valuable feedback:'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 <img id='_x0000_i1026' border='0' src='https://gsd.cognizant.com/Poor.jpg'><br>                 </span></a><o:p></o:p></span>             </p>         </td>         <td style='padding:0in 0in 0in 0in' valign='top'>             <p align='center' class='MsoNormal' style='text-align:center;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'>                     <a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=Neutral%0D%0APlease help us to serve you better by giving your valuable feedback:'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 <img id='_x0000_i1027' border='0' src='https://gsd.cognizant.com/Neutral.jpg'><br>                 </span></a><o:p></o:p></span>             </p>         </td>         <td style='padding:0in 0in 0in 0in' valign='top'>             <p align='center' class='MsoNormal' style='text-align:center;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=Good'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 <img id='_x0000_i1028' border='0' src='https://gsd.cognizant.com/Good.jpg'><br>                 </span></a><o:p></o:p></span>             </p>         </td>         <td style='padding:0in 0in 0in 0in' valign='top'>             <p align='center' class='MsoNormal' style='text-align:center;mso-element:frame;   mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:   paragraph;mso-element-anchor-horizontal:column;mso-height-rule:exactly'>                 <span style='font-size:10.5pt;font-family:&quot;Segoe UI&quot;,sans-serif;color:#29383E'><a href='mailto:"+ gmailId+ "?subject=Outreach%20Survey%20Response%20:%20Event%20ID%20"+volunteer.EventId+":[mailseqnum] &amp;body=VeryGood'><span style='color:#0E98E4;text-decoration:none;text-underline:none'>                 <br>                 <img id='_x0000_i1029' border='0' src='https://gsd.cognizant.com/VeryGood.jpg'><br>                 </span></a><o:p></o:p></span>             </p>         </td>     </tr> </table></td></tr></table></td></tr><tr id='AutoGeneratedMailTwoWay'>     <td>         <table width='100%' border='0' cellspacing='0' cellpadding='0'>             <tr>                 <td class='psnote'>                    <p>** Please do not change the Subject line while replying to the Email. **</p>                 </td>             </tr> 			<tr style='height:10px;'></tr>                        <tr style='height:10px;'></tr>         </table>     </td> </tr><tr id='footerImage'>                             <td> 				<table class='foot-tab wide' cellspacing='0' cellpadding='0' border='0'> 					<tr> 						<td class='foot-img1'><img class='foot-img1' src='http://1ct.es/343/images/new_footer_l.png' alt=''></td> 				<td id='foot-txt'> 				<div style='margin-top:6px;color:green;font-size:20px;font-family:Arial Unicode MS'>Outreach</div> </td>  					</tr>					 				</table>                               </td>                         </tr></table>                 </center>             </td>         </tr>     </table> </body> </html>   ";
           //});
              mailOptions.to=volunteer.MailId;
              if(volunteer.AttendanceStatus=="U")
              mailOptions.html=html1;
              else if(volunteer.AttendanceStatus=="A")
              mailOptions.html=html2;
              else if(volunteer.AttendanceStatus=="P")
              mailOptions.html=html3
              //console.log(mailOptions);
              smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                    console.log(error);
                    res.send("error");
                    }else{
                    console.log("Message sent: " + response.message);       
                    insertMailHistory(volunteer.EventId,volunteer.EmployeeId);
                    ctrlFeedback.insertFeedbackSentStatus(volunteer.EventId,volunteer.EmployeeId);
                    res.send("sent");
                    }
                });           
          });  
      });    
      });
        
};
/*var imap = new Imap({
=======
module.exports.sendMail = function(req, res, next) {
    var mailOptions={
       from:""+ gmailId+ "",
       to : "selvi.14cs@kct.ac.in", 
       subject : "test",
       text : "test"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
    console.log(error);
    res.end("error");
    }else{
    console.log("Message sent: " + response.message);
    res.end("sent");
    }
    });
    }

var imap = new Imap({
>>>>>>> 15e4c541b32faa5664f5c99c58eb6f4e06b5f39f
    user: '"+ gmailId+ "',
    password: 'yourPassword',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
    });

function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
<<<<<<< HEAD
     }*/
/*imap.once('ready', function() {
        openInbox(function(err, box) {
        if (err) throw err;
        imap.search([ 'UNSEEN', ['SINCE', 'June 15, 2018'] ], function(err, results) {
        if (err) throw err;
        var f = imap.fetch(results, { bodies: '' });
        f.on('message', function(msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {
        console.log(prefix + 'Body');
        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
        });
        msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', function() {
        console.log(prefix + 'Finished');
        });
        });
        f.once('error', function(err) {
        console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();});
            });
          });
  });
imap.once('error', function(err) {
console.log(err);
});
imap.once('end', function() {
console.log('Connection ended');
});
imap.connect(); */

