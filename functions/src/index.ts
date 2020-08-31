// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Sendgrid Config
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

    const postRef = db.doc(`Feedback/${context.params.ID}`); // reference to post in db
    const data = { // data payload we want to save
      postID: context.params.ID
    };
   await postRef.set(data, {merge: true})
     .then(r=> console.log(`postID updated\n${r}`))
     .catch(e=>console.log(`Error when saving postID\n${e}`)); // merge stops destructive operation

    // Read the feedback document
    const entrySnap = await db.collection('Feedback').doc(context.params.ID).get();

    // Get the raw data
    const feedback = entrySnap.data();

    const msg = {
      to: 'zasas.rafi@gmail.com',
      from: 'admin@rafaelzasas.com',
      templateId: 'd-e64dad9f967b46a2aeb85407fcad0fd6', // hardcoded template ID
      dynamic_template_data: {
        subject: 'Feedback on RafaelZasas.com!',
        preheader: feedback.feedbackType,
        type: feedback.feedbackType,
        message: feedback.feedbackMessage
      },
    };


    return sgMail.send(msg);

  });


