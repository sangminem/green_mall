import firebaseApp from './init'
import { getStorage } from "firebase/storage";

// Initialize Storage and get a reference to the service
const storage = getStorage(firebaseApp);

export default storage;