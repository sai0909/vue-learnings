import firebase from "firebase";

var config = {
	apiKey: "AIzaSyCX-R1ncCwLOXe3t8HoswxYJkcEDERMhOU",
    authDomain: "forum-app-6e994.firebaseapp.com",
    databaseURL: "https://forum-app-6e994.firebaseio.com",
    projectId: "forum-app-6e994",
    storageBucket: "",
    messagingSenderId: "930063297534",
    appId: "1:930063297534:web:169892a7099fb9179d2eaf"
};

firebase.initializeApp(config);

var db = firebase.database();

export default {

	insertDummyData() {
		var forumRef = firebase.database().ref('forums');

		var topicsRef = firebase.database().ref('topics');

		var usersRef = firebase.database().ref('users');

		var repliesRef = firebase.database().ref('replies');

		var users = [
			 {"created_at": "2018-11-2 07:13:00", "name": "Wael Salah", "email": "email@example.com", "password": "123456"}
		];

		var forums = [
			 {"created_at": "2018-11-2 07:13:00", "title": "web development forum", "content": "web development forum"},
   			 {"created_at": "2018-11-3 03:15:00", "title": "web design forum", "content": "web design forum"},
    		 {"created_at": "2018-11-5 01:10:00", "title": "Technical support forum", "content": "Technical support forum"},
    		 {"created_at": "2018-11-10 05:01:22", "title": "IT Consulting Forum", "content": "IT Consulting Forum"},
    		 {"created_at": "2018-11-12 07:13:00", "title": "Big Data Forum", "content": "Big Data Forum"},
    		 {"created_at": "2018-11-14 09:12:00", "title": "Analytics Forum", "content": "Analytics Forum"},
    		 {"created_at": "2018-11-15 02:13:00", "title": "Servers & Hosting Forum", "content": "Servers & Hosting Forum"},
    		 {"created_at": "2018-11-16 06:13:00", "title": "Marketing Forum", "content": "Marketing Forum"},
    		 {"created_at": "2018-11-19 08:13:00", "title": "Seo Forum", "content": "Seo Forum"}
		];

		var topics = [
			{"created_at": "2018-11-2 07:13:00", "title": "How to master SOLID Principales", "content": "How to master SOLID Principales", "view_count": 20, "forum_id": 1, "user_id": 1},
    		{"created_at": "2018-11-3 03:15:00", "title": "Introduction to responsive design", "content": "Introduction to responsive design", "view_count": 10, "forum_id": 2, "user_id": 1},
    		{"created_at": "2018-11-5 01:10:00", "title": "Solutions to common problems", "content": "Solutions to common problems", "view_count": 5, "forum_id": 3, "user_id": 1},
    		{"created_at": "2018-11-10 05:01:22", "title": "Difference between CRM and ERP", "content": "Difference between CRM and ERP", "view_count": 30, "forum_id": 4, "user_id": 1},
    		{"created_at": "2018-11-12 07:13:00", "title": "Handling more than million record", "content": "Handling more than million record", "view_count": 3, "forum_id": 5, "user_id": 1},
    		{"created_at": "2018-11-14 09:12:00", "title": "Establising analytical graph data", "content": "Establising analytical graph data", "view_count": 10, "forum_id": 6, "user_id": 1},
    		{"created_at": "2018-11-15 02:13:00", "title": "How to reserve a dedicated host", "content": "How to reserve a dedicated host", "view_count": 33, "forum_id": 7, "user_id": 1},
    		{"created_at": "2018-11-16 06:13:00", "title": "Increase number of customers", "content": "Increase number of customers", "view_count": 10, "forum_id": 8, "user_id": 1},
    		{"created_at": "2018-11-19 08:13:00", "title": "Social and organic search", "content": "Social and organic search", "view_count": 100, "forum_id": 9, "user_id": 1}
		];

		var replies = [
			 {"created_at": "2018-11-2 07:13:00", "content": "web development forum", "user_id": "", "topic_id": ""}
		];

		var usersPush = usersRef.push();
		var userKey = usersPush.ref.key;

		usersPush.set(users[0]);

		for(var i=0; i<forums.length; i++) {
			var forumPush = forumRef.push();
			var key = forumPush.ref.key;

			forumPush.set(forums[i]);

			var topicPush = topicsRef.push();

			topics[i].forum_id = key;
			topics[i].user_id = userKey;
			topicPush.set(topics[i]);

			if(i == 0) {

				var repliesPush = repliesRef.push();
				replies[i].user_id = userKey;
				replies[i].topic_id = topicPush.ref.key;
				repliesPush.set(replies[i]);
			}
		}
	},

	getHomeLatestForums(callback)
	{
		var ref = db.ref("forums");

		ref.once("value", function(snapshot) {

			if(snapshot.val() != null) {
	   			snapshot.forEach(function(forum) {
	   				var forumKey = forum.key;
	   				var forumData = forum.val();
	   				forumData.key = forumKey;
	   				forumData.topics = [];

	   				var topicsRef = db.ref("topics").orderByChild("forum_id").equalTo(forumKey);
	    
	 				
	 				topicsRef.on("child_added", function(topics) {
	  					//console.log(snapshot.key);

	  					var topicsData = topics.val();
	  					topicsData.key = topics.key;
	  					topicsData.username = "";

	   					var usersRef = db.ref("users/" + topicsData.user_id);

	   					usersRef.on("value", function(user) {
	   						topicsData.username = user.val().name;

	   						forumData.topics.push(topicsData);
	   					});
					});
	    			callback(forumData);
	  			});
			} else {
				callback(null);
			}

		}, function (error) {
   			console.log("Error: " + error.code);
		});
	},

	getForumByKey(key, callback) {

		var itemRef = db.ref('forums').child(key);

		var topicsRef = db.ref('topics').orderByChild("forum_id").equalTo(key);

		itemRef.once('value', function(snapshot) {
			callback(snapshot.val(), 'forum')
		});

		topicsRef.on('value', function(snapshot) {
			callback(snapshot.val(), 'topics')
		});
	},

	getTopicByKey(key, callback) {

		var topicRef = db.ref('topics').child(key);

		topicRef.on('value', function(snapshot) {

			var topicVal = snapshot.val()

			var userRef = db.ref('users').child(topicVal.user_id)

			userRef.on('value', function(snapshotUser) {

				var forumRef = db.ref('forums').child(topicVal.forum_id)

				forumRef.on('value', function(snapshotForum) {

					callback(topicVal, snapshotUser.val(), snapshotForum.val())
				});
			});
		});
	},

	getRepliesByTopicKey(key, callback)
	{
		var repliesRef = db.ref('replies').orderByChild("topic_id").equalTo(key)

		repliesRef.on('value', function(snapshot) {

			if(snapshot.val() != null) {

				snapshot.forEach(function(reply) {

					var repliesData = reply.val();
					repliesData.username = "";
	   				
	   				db.ref("users/" + repliesData.user_id).once("value", function(user) {
						repliesData.username = user.val().name;

						callback(repliesData);
	   				});
				});
		    } else {
		    	callback(null);
		    }
		});
	},

	updateRepliesByTopicKey(key, callback)
	{
		var repliesRef = db.ref('replies').orderByChild("topic_id").equalTo(key)

		repliesRef.on('child_added', function(snapshot) {

			if(snapshot.val() != null) {

				var repliesData = snapshot.val();
					repliesData.username = "";

				db.ref("users/" + repliesData.user_id).once("value", function(user) {
						repliesData.username = user.val().name;

						callback(repliesData);
	   				});
		    } else {
		    	callback(null);
		    }
		});
	},

	updateTopicViewCount(key)
	{
		var topicRef = db.ref('topics').child(key).child('view_count');

		topicRef.transaction(function(views) {
  			// if (views) {
    			views = views + 1;
  			// }
  			return views;
		});
	},
	authenticate(email, password, successcallback, errorcallback) {
		firebase.auth().signInWithEmailAndPassword(email, password).then(successcallback).catch(errorcallback);
	},
	logout(successcallback, errorcallback) {
		firebase.auth().signOut().then(successcallback).catch(errorcallback);
	},
	getCurrentUser(callback) {
		firebase.auth().onAuthStateChanged(callback);

	},
	register(email, password, successcallback, errorcallback) {
		firebase.auth().createUserWithEmailAndPassword(email, password).then(successcallback).catch(errorcallback);
	},
	updateUserDisplayname(name) {
		var user = firebase.auth().currentUser;

		user.updateProfile({
  			displayName: name,
		}).then(function() {
  			// Update successful.
		}).catch(function(error) {
  			// An error happened.
		});
	},
	addUser(name, email, uid) {
		var usersRef = db.ref('users');
		var usersPush = usersRef.push();

		const key = usersPush.getKey();

		usersPush.set({
			name: name,
			email: email,
			uid: uid, 
			created_at: (new Date()).toLocaleString()
		});

		return key;
	},
	addForum(title, content, user_id) {
		var forumRef = db.ref('forums');
		var forumPush = forumRef.push();

		forumPush.set({
			title: title,
			content: content, 
			user_id: user_id,
			created_at: (new Date()).toLocaleString()
		});
	},
	updateForum(title, content, key) {

		db.ref("forums/" + key).update({ title: title, content: content });
	},
	deleteForum(key) {
		db.ref("forums/" + key).remove();
	},
	userForums(user_id, callback) {
		var forumRef = db.ref('forums').orderByChild("user_id").equalTo(user_id);

		forumRef.on('value', function(snapshot) {
			callback(snapshot.val());
		});
	},
	userTopics(user_id, callback) {
		var topicsRef = db.ref('topics').orderByChild("user_id").equalTo(user_id);

		forumRef.on('value', function(snapshot) {
			callback(snapshot.val());
		});
	},
	getMyTopics(forum_key, user_key, callback) {
		var topicsRef = db.ref('topics').orderByChild("userId_forumId").equalTo(user_key + "_" + forum_key);

		topicsRef.on('value', function(snapshot) {
			callback(snapshot.val());
		});
	},
	addTopic(title, content, forum_id, user_id) {
		var forumRef = db.ref('topics');
		var forumPush = forumRef.push();

		forumPush.set({
			title: title,
			content: content, 
			user_id: user_id,
			created_at: (new Date()).toLocaleString(),
			forum_id: forum_id,
			view_count: 0,
			userId_forumId: user_id + "_" + forum_id
		});
	},
	updateTopic(title, content, key) {

		db.ref("topics/" + key).update({ title: title, content: content });
	},
	deleteTopic(key) {
		db.ref("topics/" + key).remove();
	},
	addReply(content, topic_id, user_id) {
		var replyRef = db.ref('replies');
		var replyPush = replyRef.push();

		replyPush.set({
			content: content, 
			user_id: user_id,
			created_at: (new Date()).toLocaleString(),
			topic_id: topic_id
		});
	},
	getUserByUID(UID, callback) {
		var userRef = db.ref('users').orderByChild("uid").equalTo(UID);

		userRef.on('value', function(snapshot) {
			if(snapshot.val() != null) {
				callback(Object.keys(snapshot.val())[0], snapshot.val());
			} else {
				callback(null, null);
			}
		});
	}

}
