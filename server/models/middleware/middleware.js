const {
  TWILIO_FROM,
  STRIPE_KEY,
  TWILIO_TOKEN,
  TWILIO_SID,
} = process.env;

const STATUS_USER_ERROR = 422;


// Checks to see if the proper API keys are in the .env file
const envCheck = (req, res, next) => { // eslint-disable-line 
  console.log(TWILIO_FROM,TWILIO_SID,TWILIO_TOKEN,STRIPE_KEY)
  if (
    TWILIO_SID !== undefined &&
    TWILIO_TOKEN !== undefined &&
    TWILIO_FROM !== undefined &&
    STRIPE_KEY !== undefined
  ) {
    next();
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error:
        'Please add Stripe Key, Twilio SID, Twilio Token, and Twilio "From" variable to your .env file.',
    });
  }
};

// May be used still, but will need to be moved to a different file as it doesn't work as middleware
const inputCheck = (req, res, next) => { // eslint-disable-line 
  const { token } = req.body;
  const { message, recipient } = req.body.message;
  if (message !== undefined && recipient !== undefined) {
    return res.status(STATUS_USER_ERROR).json({
      error: 'Please type in your phone number and message.',
    });
  } else if (token === undefined) {
    return res.status(STATUS_USER_ERROR).json({
      error: 'Your credit card did not process, please try again',
    });
  }
  next();
};
module.exports = {
  envCheck,
  inputCheck,
};
