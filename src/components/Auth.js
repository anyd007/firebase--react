import { useState } from 'react';
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log(auth?.currentUser?.email);

    const signIn = async () =>{
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        }
        catch(err){
            console.error(err.message);
        }
    }

    const signInWithGoogle = async () =>{
        try{
            await signInWithPopup(auth, googleProvider)
        }
        catch(err){
            console.error(err.message);
        }
    }

    const signOutHandler = async () =>{
        try{
            await signOut(auth)
        }
        catch(err){
            console.error(err.message);
        }
    }

    return (
        <div className="auth">
            <input 
            type="text" 
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
             <input 
            type="password"  
            placeholder="hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>rejestracja</button>
            <button onClick={signInWithGoogle}>zaloguj się z google</button>
            <button onClick={signOutHandler}>wyloguj</button>
        </div>
    );
}
 
export default Auth;