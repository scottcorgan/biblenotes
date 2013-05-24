angular.module('biblenotesApp').config(function ($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  
  // UserProvider.authorize();
  
  //
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: function ($scope, User, $location) {
        $scope.logout = function () {
          User.logout();
        };
        // User.authorize().then(function (user) {
        //   console.log('Success:', user);
        // }, function (err) {
        //   // $location.path('/login');
        // });
        
        // var usersRef = new Firebase(FIREBASE_BASE_URL + '/users');
        // var notesRef = new Firebase(FIREBASE_BASE_URL + '/notes');
        // var notebooksRef = new Firebase(FIREBASE_BASE_URL + '/notebooks');
        // var userClient = new FirebaseAuthClient(usersRef, function (err, user) {
        // var noteClient = new FirebaseAuthClient(notesRef, function (err, user) {
        // var noteClient = new FirebaseAuthClient(notebooksRef, function (err, user) {
        //   if (err) {
            
        //     console.log('error', err);
            
        //   } else if (user) {
        //     // angularFire(url, $scope, 'notes');
            
        //     var notebook = notebooksRef.child('-Iunvc6llDOPnck137ak');
        //     var notes = notebook.child('notes');
        //     notes.push().set({
        //       title: 'Note 2'
        //     })
            
            
        //     // Create Note!!!!!!!!!!!!!!!
        //     // var note = notesRef.push();
        //     // note.set({
        //     //   title: 'Other Title',
        //     //   author: user.id
        //     // });
            
        //     // notesRef.child(note.name()).set({
        //     //   author: 2,
        //     //   title: 'My Second Note'
        //     // });
        
        //     // notesRef.child('-IunhQVoaVnTB5yU7Dl0').on('value', function (snapshot) {
        //     //   console.log(snapshot.val());
        //     // });
            
        //     // notesRef.on('child_added', function (snapshot) {
        //     //   conosle.log(snapshot.val());
        //     // });
            
        //     // var userNotebooks = usersRef.child(user.id).child('notebooks');
            
        //     // userNotebooks.child()
            
        //     // var userRef = usersRef.child(user.id).child('notebooks');
            
        //     // var counter = 0;
        //     // userRef.on('value', function (snapshot) {
        //     //   console.log(snapshot.val());
        //     //   console.log(snapshot.name());
        //     // });
            
        //     // userRef.child('notes').child('-IunhQVoaVnTB5yU7Dl0').set(true);
        //     // userRef.set({
        //     //   username: 'scottcorgan',
        //     //   notes: [
        //     //     '-IunhQVoaVnTB5yU7Dl0'
        //     //   ]
        //     // });
            
        //     // var id = userRef.child('notes').push(0);
        //     // console.log(id.name());
            
        //   }
        // });
      }
    })
    .when('/notes', {
      templateUrl: 'views/main.html',
      controller: 'NotesCtrl'
    })
    .when('/bible', {
      templateUrl: 'views/bible.html',
      controller: 'BibleCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});