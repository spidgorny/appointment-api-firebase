import * as functions from "firebase-functions";
import { getDatabase, onValue, ref } from "firebase/database";
// import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import { Tenant } from "./tenant";
import express = require("express");

require("dotenv").config();

export const firebaseConfig = {
	...{
		apiKey: "AIzaSyD44aD5AdY1Fh4BBgGPRkiAM5jEBhN-8Mw",
		authDomain: "experim8-assistant.firebaseapp.com",
		databaseURL: "https://experim8-assistant.firebaseio.com",
		projectId: "experim8-assistant",
		storageBucket: "experim8-assistant.appspot.com",
		messagingSenderId: "971332554341",
		appId: "1:971332554341:web:33739170e6e68d327c408c",
	},
	credential: admin.credential.applicationDefault(),
	databaseURL: "http://localhost:9000/?ns=experim8-assistant",
};
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld2 = functions.https.onRequest(
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
		// const user = firebase.auth.getcurrentuser();
		response.json({
			req,
			// user,
		});
	}
);

export const tenants = functions.https.onRequest((request, response) =>
	Tenant.route(request, response)
);
