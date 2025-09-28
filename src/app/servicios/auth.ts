import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, updateDoc, setDoc } from '@angular/fire/firestore';


interface UserData {
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { } 

  get currentUser() {
    return this.auth.currentUser;
  }

  get firestoreInstance() { 
    return this.firestore;
  }

  async registrar(userData: UserData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );

    const usuariosCollection = collection(this.firestore, 'usuarios');

    await setDoc(doc(usuariosCollection, userCredential.user.uid), {
      nombre: userData.nombre,
      apellido: userData.apellido,
      telefono: userData.telefono,
      email: userData.email
    });

    return userCredential.user;
  } catch (e) {
    console.error("Error en el registro:", e);
    return null;
  }
}

  async actualizarPerfil(uid: string, data: Partial<UserData>) {
    try {
      const userRef = doc(this.firestore, 'usuarios', uid);
      await updateDoc(userRef, data);
      return true;
    } catch (e) {
      console.error("Error al actualizar perfil:", e);
      return false;
    }
  }

  async login(userData: UserData) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  async registrarCompra(userId: string, productId: string) {
    try {
      const comprasRef = collection(this.firestore, 'compras');
      await addDoc(comprasRef, {
        userId: userId,
        productId: productId,
        fechaCompra: new Date()
      });
      return true;
    } catch (e) {
      console.error("Error al registrar la compra:", e);
      return false;
    }
  }
}