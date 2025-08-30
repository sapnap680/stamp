import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 環境変数から設定を読み込み（Vercelの環境変数に設定）
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// デバッグ: Firebase設定を確認
console.log("=== Firebase Config Debug ===");
console.log("Project ID:", firebaseConfig.projectId);
console.log("Storage Bucket:", firebaseConfig.storageBucket);
console.log("Auth Domain:", firebaseConfig.authDomain);
console.log("Full config:", firebaseConfig);

export const db = getFirestore(app);