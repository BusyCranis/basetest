// Conveniently import this file anywhere to use db

import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'



const config = {
    apiKey: "AIzaSyDSuwxJohH1kofY1H-Q5rg3FULgz5iI8LA",
    authDomain: "vue-fire-todo-d86ab.firebaseapp.com",
    projectId: "vue-fire-todo-d86ab",
    storageBucket: "vue-fire-todo-d86ab.appspot.com",
    messagingSenderId: "158239896376",
    appId: "1:158239896376:web:c0f1d9e188fb77112947cd",
    measurementId: "G-5382KQMBJL"
  };

const firebaseApp = firebase.initializeApp(config)


const db = firebaseApp.firestore()
  


const usersCollection = db.collection('users')


export const createUser = user => {
    return usersCollection.add(user)
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
    return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
    const users = ref([])
    const close = usersCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users

}



    


// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
