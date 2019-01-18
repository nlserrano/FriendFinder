var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Receive user details (name, photo, scores)
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in scores
    var bestFriendIndex = 0;
    var minimumDifference = 40;

    // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      if(totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add user to friend array
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[bestFriendIndex]);
  });
};

// old code
// // Pull in required dependencies
// var path = require('path');

// // Import the list of friend entries
// var friends = require('../data/friends.js');

// // Export API routes
// module.exports = function(app) {
// 	// console.log('___ENTER apiRoutes.js___');

// 	// Total list of friend entries
// 	app.get('/api/friends', function(req, res) {
// 		res.json(friends);
// 	});

// 	// Add new friend entry
// 	app.post('/api/friends', function(req, res) {
// 		// Capture the user input object
// 		var userInput = req.body;
// 		// console.log('userInput = ' + JSON.stringify(userInput));

// 		var userResponses = userInput.scores;
// 		// console.log('userResponses = ' + userResponses);

// 		// Compute best friend match
// 		var matchName = '';
// 		var matchImage = '';
// 		var totalDifference = 10000; // Make the initial value big for comparison

// 		// Examine all existing friends in the list
// 		for (var i = 0; i < friends.length; i++) {
// 			// console.log('friend = ' + JSON.stringify(friends[i]));

// 			// Compute differenes for each question
// 			var diff = 0;
// 			for (var j = 0; j < userResponses.length; j++) {
// 				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
// 			}
// 			// console.log('diff = ' + diff);

// 			// If lowest difference, record the friend match
// 			if (diff < totalDifference) {
// 				// console.log('Closest match found = ' + diff);
// 				// console.log('Friend name = ' + friends[i].name);
// 				// console.log('Friend image = ' + friends[i].photo);

// 				totalDifference = diff;
// 				matchName = friends[i].name;
// 				matchImage = friends[i].photo;
// 			}
// 		}

// 		// Add new user
// 		friends.push(userInput);

// 		// Send appropriate response
// 		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
// 	});
// };



// from bill
// // Dependencies 
// var path = require('path')
// var friends = require("../data/friends.js");

// //Routing
// module.exports = function (app) {
  

// //Matching
//   app.get("/friends", function(req, res) {
//     res.json(friends);
//   });

//   app.post("/friends", function(req, res) {
    
//     let fInput = req.body;
//     let fResponse = fInput.scores;
    
//     var matchName = ''
//     var matchImage = ''
//     var tDiff = 100

//     for (let i = 0; i < friends.length; i++) {
//       let diff = 0
//       for (let j=0; j < fResponse.length; j++) {
//             diff += Math.abs(friends[i].scores[j] - fResponse[j])
//         }
//       if (diff < tDiff) {
//         tDiff = diff
//         matchName = friends[i].name;
//         matchImage = friends[i].photo;               
//       }
//     }

//     friends.push(fInput);
//     res.json({status: 'OK,', matchName: matchName, matchImage: matchImage})
   
//   });
//   };