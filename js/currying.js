// function autoMailer(to, sub, body) {
//   console.log(
//     `mail has been sent to ${to} with subject ${sub} and body ${body}`,
//   );
// }
// autoMailer("vikas@gmail.com", "order details");

//currying

function autoMailer(to) {
  return function (sub) {
    return function (body) {
      console.log(
        `mail has been sent to ${to} with subject ${sub} and body ${body}`,
      );
    };
  };
}

autoMailer("vikas@gmail.com")("order details");
