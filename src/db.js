
import * as firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBjURh-_jCf_vdleJIP3I_OHmQooizkkUw',
  databaseURL: 'https://shout-box-27611.firebaseio.com/'
})

export default app.database()
