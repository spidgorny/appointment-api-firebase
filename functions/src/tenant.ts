import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "./index";
import { Router } from "./router";
import express = require("express");
import admin from "firebase-admin";
import {
	getAuth,
	signInWithEmailAndPassword,
	connectAuthEmulator,
} from "firebase/auth";

/**
 * handles /tenant URL
 */
export class Tenant extends Router {
	private readonly tableName: string = "tenants";

	async get(request: express.Request, response: express.Response) {
		const app = initializeApp(firebaseConfig);
		console.log(
			"adminEmail",
			process.env.adminEmail,
			process.env.adminPassword
		);
		const auth = getAuth();
		// const ok = await signInWithEmailAndPassword(
		// 	auth,
		// 	process.env.adminEmail,
		// 	process.env.adminPassword
		// );
		// const ok = connectAuthEmulator(auth, "http://localhost:9099");
		// console.log(ok);
		const db = getDatabase(app);
		const tenant = ref(db, this.tableName);
		const data = await getData(tenant);
		console.log(data);
		response.json({
			status: "ok",
			data,
		});
	}

	async post(request, response) {
		initializeApp(firebaseConfig);
		// const db = admin.database();
		const app = initializeApp(firebaseConfig);
		const db = getDatabase(app);
		const ref1 = db.ref(this.tableName);
		ref1.set({
			alanisawesome: {
				date_of_birth: "June 23, 1912",
				full_name: "Alan Turing",
			},
			gracehop: {
				date_of_birth: "December 9, 1906",
				full_name: "Grace Hopper",
			},
		});
		response.json({ status: "nothing fetched" });
	}
}

const getData = (ref) => {
	return new Promise((resolve, reject) => {
		const onError = (error) => reject(error);
		const onData = (snap) => resolve(snap.val());

		onValue(ref, onData, onError);
	});
};
