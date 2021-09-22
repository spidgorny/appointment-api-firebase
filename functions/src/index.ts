import * as functions from "firebase-functions";
// import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import { Tenant } from "./tenant";
import express = require("express");

export const firebaseConfig = {
	credential: admin.credential.applicationDefault(),
	databaseURL: "http://localhost:9000/?ns=experim8-assistant",
};
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(
	(request: express.Request, response) => {
		functions.logger.info("Hello logs!", { structuredData: true });
		const req = {
			httpVersionMajor: request.httpVersionMajor,
			httpVersionMinor: request.httpVersionMinor,
			httpVersion: request.httpVersion,
			complete: request.complete,
			url: request.url,
			method: request.method,
			statusCode: request.statusCode,
			statusMessage: request.statusMessage,
			baseUrl: request.baseUrl,
			originalUrl: request.originalUrl,
			params: request.params,
			query: request.query,
			body: request.body,
			route: request.route,
		};
		response.json(req);
	}
);

export const tenants = functions.https.onRequest((request, response) => {
	return Tenant.route(request, response);
});

export const postTenants = functions.https.onRequest((request, response) => {
	initializeApp(firebaseConfig);
	const db = admin.database();
	const ref = db.ref("tenants");
	const usersRef = ref.child("users");
	usersRef.set({
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
});
