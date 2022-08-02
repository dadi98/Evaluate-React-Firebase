import {config} from './config';
import { initializeApp } from 'firebase/app'
import {
  getFirestore
} from 'firebase/firestore'

export const app = initializeApp(config);

export const db = getFirestore();