const mailRouter = require("express").Router();
var nodemailer = require("nodemailer");
const sendEmail = require("./sendMail");


const sendOrderMail = async (user, order) =>{
  const { firstName, email } = user
  let list = []
  order.products.forEach((product) =>{
    list.push(`<h4 style="color:#4b59ad; text-align:center;">${product.quantity
    } of ${product.productId.name} for ${(product.productId.price * product.quantity)}EGP<h4/>`)
  })

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'trendlix6@gmail.com',
  //     pass: 'marian@trendlix.com'
  //   }
  // });

  try {
    const mailOptions = {
      to: email,
      subject: "Hatly Order",
      html: `<body style="background-position: center; background-color: #e2f3f5; color: #4caf50; padding:50px; background-image:url('https://www.clipartmax.com/png/full/188-1883743_man-celebrating-success-man-raise-hands-png.png'); background-size: contain; background-repeat: no-repeat;">
      <div style="display: flex;">
          <div style="width: 20%;"><img width="100%"
                  src="https://hatlystore.netlify.app/static/media/logo.308a58bf393acd0c7e09.png" />
          </div>
      </div>
      <div style="display:flex; flex-direction: column;">
          <div style="width: 50%; margin: auto;">
              <h3 style="text-align: center;">Dear ${firstName} you order is: ${order._id}</h3>
              ${list}
              <h3 style="text-align: center;">We will contact you as soon as possible.</h3>
              <h4 style="text-align: center;">Thank you for choosing us.</h4>
          </div>
      </div>
  </body>`,
    };

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    await sendEmail(mailOptions).then(()=>{
      console.log('mail sent with order details')
    }).catch(err => console.error(err));
  }catch(err) {
    console.error(err)
  }
}
// mailRouter.post("/mail", async (req, res) => {
//   const name = req.body.name;
//   const orderID = req.body.orderID;
//   let list = "";
//   req?.body?.items?.forEach((el) => {
//     return (list += `<h4 style="color:#4b59ad; text-align:center;">${el.quantity
//       } of ${el.name} for ${(el.amount_cents * el.quantity) / 100}EGP<h4/>`);
//   });
//   try {
//     // var transporter = nodemailer.createTransport({
//     //   service: "gmail",
//     //   auth: {
//     //     user: "mostafamabdallah94@gmail.com",
//     //     pass: "piutjcingwgnxhsv",
//     //   },
//     // });

//     const mailOptions = {
//       // from: "mostafamabdallah94@gmail.com",
//       to: req.body.to,
//       subject: "Hatly Order",
//       html: `<body style="background-position: center; background-color: #e2f3f5; color: #4caf50; padding:50px; background-image:url('https://www.clipartmax.com/png/full/188-1883743_man-celebrating-success-man-raise-hands-png.png'); background-size: contain; background-repeat: no-repeat;">
//       <div style="display: flex;">
//           <div style="width: 20%;"><img width="100%"
//                   src="https://hatlystore.netlify.app/static/media/logo.308a58bf393acd0c7e09.png" />
//           </div>
//       </div>
//       <div style="display:flex; flex-direction: column;">
//           <div style="width: 50%; margin: auto;">
//               <h3 style="text-align: center;">Dear ${name} you order is: ${orderID}</h3>
//               ${list}
//               <h3 style="text-align: center;">We will contact you as soon as possible.</h3>
//               <h4 style="text-align: center;">Thank you for choosing us.</h4>
//           </div>
//       </div>
//   </body>`,
//     };

//     await sendEmail(mailOptions)
//     res.status(200).json({
//       ok : true, 
//       status: 200,
//       message: 'succeeded',
//     })
//     // transporter.sendMail(mailOptions, function (error, info) {
//     //   if (error) {
//     //   } else {
//     //   }
//     // });
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({
//       ok : false,
//       status :  500,
//       message : e.message
//     })
//   }
// });


// mailRouter.post("/mail/contact", (req, res) => {

//   try {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "mostafamabdallah94@gmail.com",
//         pass: "piutjcingwgnxhsv",
//       },
//     });

//     var mailOptions = {
//       from: req.body.data.firstName,
//       to: "mostafamabdallah94@gmail.com",
//       subject: req.body.data.subject,
//       html: `<body>
//       <div style="padding: 30px;">
//           <div style="display: flex;">
//               <div style="width: 50%;">From</div>
//               <div style="width: 50%;">${req.body.data.firstName}</div>
//           </div>
//           <div style="display: flex;">
//               <div style="width: 50%;">Phone</div>
//               <div style="width: 50%;">${req.body.data.phone}</div>
//           </div>
//           <div style="display: flex;">
//               <div style="width: 50%;">Subject ${req.body.data.email}</div>
//               <div style="width: 50%;">${req.body.data.subject}</div>
//           </div>
//           <div style="display: flex;">
//               <div style="width: 50%;">Messeage</div>
//               <div style="width: 50%;">${req.body.data.message}</div>
//           </div>
//       </div>
//   </body>`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         return res.send(error)
//       } else {
//         return res.send('true')
//       }
//     });
//   } catch (er) { }
// })

module.exports = { sendOrderMail };
