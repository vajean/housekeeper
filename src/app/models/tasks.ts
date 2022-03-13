import firebase from "firebase/compat";
import firestore = firebase.firestore;


export default class Task {
  title:string;
  description:string;
  room_id:string;
  status:boolean;
  occurrence: number;
  completed:firestore.Timestamp;
  keeper:string;
}
