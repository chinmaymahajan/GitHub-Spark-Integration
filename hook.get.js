const axios = require('axios');

var response;

const roomId = 'Y2lzY29zcGFyazovL3VzL1JPT00vYjU4MmRiNTAtYzAyZS0xMWU3LWI3NjctZWQ0YmQwMjVjMjAz';
const acessToken = 'Bearer YjkzMTRjN2UtNDY2ZS00NWNiLTgyYWEtNjYyOGZjYTAwZTQ1ZWJkNWU0MTEtZWI2';

module['exports'] = function myService (req, res, next) {
	var res = hook.res,
	req = hook.req,
	store = hook.datastore;
	var message = '';
/*	if (hook.params.action === "opened") {
		message = "This pull request is open " + hook.params.action.pull_request.url;
		postInRoom(message);
	}
    if (hook.params.action === "submitted")
     	message = "PR review subimitted for " + pull_request;
*/
	if (hook.params.action === "review_requested") {
			message = "Review is requested for this PR "
			+ hook.params.pull_request.title + " - "
			+ hook.params.pull_request.html_url;
			postInRoom(message);
		}

	if (hook.params.action === "review_request_removed")
		 {
			 message = "Review is cancelled for this PR " + hook.params.pull_request.html_url;
			 postInRoom(message);
		 }

	if (hook.params.action === "submitted" && !(hook.params.action === "created")) {

	}

	if (hook.params.action === "dismissed") {
		message = "Review is dismissed for this PR "
		+ hook.params.pull_request.title + " - "
		+ hook.params.pull_request.html_url + " from "
		+ hook.params.review.user.login;
		postInRoom(message);
	}

	if (hook.params.action === "labeled" && "created") {
		message = "This PR is labelled as "
		+ hook.params.label.name + " "
		+ hook.params.pull_request.title + " - "
		+ hook.params.pull_request.html_url;
		postInRoom(message);
		// person whos PR is reviewed hook.params.pull_request.user.login;
	}

	if (hook.params.action === "unlabeled") {
		message = "Removed label "
		+ hook.params.label.name + " from this PR "
		+ hook.params.pull_request.title + " - "
		+ hook.params.pull_request.html_url;
		postInRoom(message);
	}
			/* To send individual messages */

			switch (hook.params.action) {
				case "created": var userEmail =  hook.params.pull_request.user.login + "@cisco.com";
				message = "Review comment "
					+ "`"+ hook.params.comment.body + "`"
					+ " from user "
					+ hook.params.comment.user.login
					+ " On this PR " + hook.params.pull_request.html_url;
					postInRoom(message);
					break
				case "submitted": message = "Review is submitted for this PR "
				+ hook.params.pull_request.title + " - "
				+ hook.params.pull_request.html_url + " from "
				+ hook.params.review.user.login;
				postInRoom(message);
					break;
				default: 

			}

		//	postToPerson(message, userEmail);
	 //if to send individual messages
/*
	function postToPerson(message, userEmail) {
			axios.get('https://api.ciscospark.com/v1/people/', {
				email: userEmail
			},
			{
				headers:
			{
				'Content-Type': 'application/json; charset=utf-8', 'Authorization': acessToken
			}
		}) //get request for people
			.then(function (personDetails) {
				var myId = {
						"notFoundIds": null,
						"items": [
							{
								"id": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS81N2E1YzBlNy1jZTkyLTRlYWYtOGJmNS1lZGMyYzBmMmIxNDc",
								"emails": [
									"chimahaj@cisco.com"
								],
								"displayName": "Chinmay Mahajan",
								"nickName": "Chinmay",
								"firstName": "Chinmay",
								"lastName": "Mahajan",
								"avatar": "https://1efa7a94ed216783e352-c62266528714497a17239ececf39e9e2.ssl.cf1.rackcdn.com/V1~f2053e3063fa81674f2edfd8d836dfce~afgAwbCCQH2KyE2drcnKNw==~1600",
								"orgId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8xZWI2NWZkZi05NjQzLTQxN2YtOTk3NC1hZDcyY2FlMGUxMGY",
								"created": "2017-06-14T18:09:00.788Z",
								"lastActivity": "2017-11-05T21:58:58.152Z",
								"status": "inactive",
								"type": "person"
							}
						]
}
				// var personID = personDetails.items[0].id;
				axios.post('https://api.ciscospark.com/v1/messages', {
					toPersonId: 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS82YzgwYmFiOS1iNjA5LTQ4NWMtYTVlOC1kMzUyM2Q3YTc3OTY',
					text: message
				},
				{
					headers:
				{
					'Content-Type': 'application/json; charset=utf-8', 'Authorization': acessToken
				}
				})
					.then(function (response) {
						if (response.status === 200) {
							console.log("personId is ", personID);
						} // if OK
						hook.res.end(personID);
					})
					.catch(function (error) {
						hook.res.end(JSON.stringify(error, true, 2));
					});
			}) //.then

			.catch(function (error) {
				hook.res.end(JSON.stringify(error, true, 2));
			});
		}// postToPerson
*/
	//	hook.res.end(hook.params);
	function postInRoom (message)  {
	axios.post('https://api.ciscospark.com/v1/messages',
		{
			roomId: roomId,
			text: message
		},
		{
			headers:
			{
				'Content-Type': 'application/json; charset=utf-8', 'Authorization': acessToken
			}
		})
		.then(function (response) {
			if(response.status === 200) {
				console.log("messages sent to group");
			} // if OK
		})
		.catch(function (error)
		{
			console.log(error);
			hook.res.end(JSON.stringify(error, true, 2));
		});
	}// function
/*  store.get('github', function(err, result){
    response = result;
     if (err) { return hook.res.end(err.message); }
     hook.res.end(result);
  });*/
};
