import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "./index";
import { Router } from "./router";
import express = require("express");

/**
 * handles /tenant URL
 */
export class Tenant extends Router {
	async get(request: express.Request, response: express.Response) {
		const app = initializeApp(firebaseConfig);
		const db = getDatabase(app);
		const tenant = ref(db, `tenant`);
		const data = await getData(tenant);
		console.log(data);
		response.send(data);
	}
}

const getData = (ref) => {
	return new Promise((resolve, reject) => {
		const onError = (error) => reject(error);
		const onData = (snap) => resolve(snap.val());

		onValue(ref, onData, onError);
	});
};
