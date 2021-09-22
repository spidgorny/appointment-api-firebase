import express = require("express");

/**
 *
 */
export class Router {
	/**
	 * @param request
	 * @param response
	 */
	static async route(request: express.Request, response: express.Response) {
		const self = new this();

		try {
			const res = await Router.runMethod(self, request, response);
			console.log(res);
		} catch (e) {
			console.error(e);
			response.json({
				status: e.message,
				stack: e.stack,
			});
			response.send();
		}
	}

	static async runMethod(
		self: any,
		request: express.Request,
		response: express.Response
	) {
		const method = request.method.toLowerCase();
		switch (method) {
			case "get":
				return self.get(request, response);
			case "post":
				return self.post(request, response);
			case "put":
				return self.put(request, response);
			case "delete":
				return self.delete(request, response);
			default:
				return self.methodNotAllowed(request, response);
		}
	}

	methodNotAllowed(request: express.Request, response: express.Response) {
		response.status(405).json({
			status: "Method Not Allowed",
			method: request.method,
		});
	}

	get(request: express.Request, response: express.Response) {
		response.status(501).json({
			status: "GET Not Implemented in " + this.constructor.name,
		});
	}

	post(request: express.Request, response: express.Response) {
		response.status(501).json({
			status: "POST Not Implemented",
		});
	}

	put(request: express.Request, response: express.Response) {
		response.status(501).json({
			status: "PUT Not Implemented",
		});
	}

	delete(request: express.Request, response: express.Response) {
		response.status(501).json({
			status: "DELETE Not Implemented",
		});
	}
}
