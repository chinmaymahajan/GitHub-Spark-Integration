const axios = require('axios');

var response;

const roomId = 'Y2lzY29zcGFyazovL3VzL1JPT00vYjU4MmRiNTAtYzAyZS0xMWU3LWI3NjctZWQ0YmQwMjVjMjAz';
const acessToken = 'Bearer YjkzMTRjN2UtNDY2ZS00NWNiLTgyYWEtNjYyOGZjYTAwZTQ1ZWJkNWU0MTEtZWI2';

module['exports'] = function myService (req, res, next) {
	var res = hook.res,
	req = hook.req,
	store = hook.datastore;
	var message = '';
	if (hook.params.action === "opened")
		message = "This pull request is open " + hook.params.action.pull_request.url;
    // if (hook.params.action === "submitted")
    //  	message = "PR review subimitted for " + pull_request;
  	if (hook.params.action === "review_requested") {

		message = "Review is requested for this PR "
		+ hook.params.pull_request.title + " - "
		+ hook.params.pull_request.html_url + " from "
		+ hook.params.pull_request.user.login;
	}
      /* axios.get(hook.params.pull_request.user.login.comments_url)
      .then(function (response) {
      message = message + " Here is the response " + response;
      })
      .catch(function (error) {
      });
    }
      */

	if (hook.params.action === "review_request_removed")
		message = "Review is cancelled for this PR " + hook.params.pull_request.html_url;
	// if (hook.params.label)
	// 	message = "This PR " + hook.params.html_url + "is labeled as " + hook.params.label.name;
	// 			/* To send individual messages */

	if (hook.params.action === "created") {
		var userEmail =  hook.params.pull_request.user.login + "@cisco.com";
		message = "Review comment "
			+ hook.params.comment.body
			+ " from user "
			+ hook.params.comment.user.login
			+ "On his PR " + userEmail;
}

/*    axios.get('https://api.ciscospark.com/v1/people', {
      		email: userEmail
		},
		{
			headers:
			{
				'Content-Type': 'application/json; charset=utf-8', 'Authorization': acessToken
			}
    }) //get request for people

      .then(function (personDetails) {

    var personID = personDetails.items[0].id;
				axios.post('https://api.ciscospark.com/v1/messages', {
					toPersonId: personID,
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
						hook.res.end('ok');
					})
					.catch((error) => {
						assert.isNotOk(error,'Promise Persondetails  error');
						done();
					});
			}) //.then
			.catch((error) => {
				assert.isNotOk(error,'Promise Persondetails  error');
				done();
			});
	} //if to send individual messages
*/
	//	hook.res.end(hook.params);
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
				console.log("messages sent");
			} // if OK
			hook.res.end('ok');
		})
		.catch(function (error)
		{
			console.log(error);
			hook.res.end(error)
		});
/*  store.get('github', function(err, result){
    response = result;
     if (err) { return hook.res.end(err.message); }
     hook.res.end(result);
  });*/
};
