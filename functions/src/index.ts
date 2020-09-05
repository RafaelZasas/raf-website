// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();
import https = require('https');
// tslint:disable-next-line:no-implicit-dependencies
const cors = require('cors')({origin: true});
// Sendgrid Config

// tslint:disable-next-line:no-implicit-dependencies
import * as sgMail from '@sendgrid/mail';


const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

// Sends email to user after signup

export const welcomeEmail = functions.auth.user().onCreate(user => {

  const msg = {
    to: `${user.email}`,
    from: 'admin@rafaelzasas.com',
    cc: 'zasas.rafi@gmail.com',
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      subject: `New Account Created`,
      preheader: 'RafaelZasas.com',
    },
  };


  return sgMail.send(msg);

});

// Sends email to me when feedback has been submitted
export const feedbackSubmitted = functions.firestore.document('Feedback/{ID}')
  .onCreate(async (change, context) => {

    // saves the documentID as a field

    const snapshot = db.doc(`Feedback/${context.params.ID}`); // reference to post in db
    const data = { // Document ID we wish to save as post ID in doc
      postID: context.params.ID
    };
    await snapshot.set(data, {merge: true})
      .then(r => console.log(`postID updated\n${r}`))
      .catch(e => console.log(`Error when saving postID\n${e}`)); // merge stops destructive operation

    // Read the feedback document
    const entrySnap = await snapshot.get();

    // Get the raw data
    const feedback = entrySnap.data();

    if (feedback) {
      const msg = {
        to: 'zasas.rafi@gmail.com',
        from: 'admin@rafaelzasas.com',
        templateId: 'd-e64dad9f967b46a2aeb85407fcad0fd6', // hardcoded template ID
        dynamic_template_data: {
          subject: 'Feedback submitted on RafaelZasas.com',
          preheader: feedback.feedbackType,
          type: feedback.feedbackType,
          message: feedback.feedbackMessage
        },
      };
      return sgMail.send(msg);
    }
    return 'error sending feedback email';

  });

// acts as an endpoint getter for Python Password Generator FastAPI
export const getPassword = functions.https.onRequest((request, response) => {

  const useSymbols = request.query.useSymbols;
  const pwLength = request.query.pwLength;
  // BUILD URL STRING WITH PARAMS
  const ROOT_URL = `http://34.72.115.208/password?pwd_length=${pwLength}&use_symbols=${useSymbols}`;
  let password: any; // password to be received

  cors(request, response, () => {

    password = https.get(ROOT_URL);

    response.status(200).send(`password: ${password}`);
  }).catch((err: any) => {
    response.status(500).send(`error: ${err}`);
  });


});


