angular.module('starter.routes', [])

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        /*
         // Turn off back button text
         $ionicConfigProvider.backButton.previousTitleText(false);
         */

        $stateProvider
            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/Components/menu.html',
            controller: 'menuCtrl'
        })


//------Login Operation Start-----------//
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Shared/Login/login.html',
                        controller: 'LoginCtrl'
                    }

                }
            })

            .state('app.password', {
                url: '/password',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Shared/Login/password.html',
                        controller: 'passwordCtrl'
                    }

                }
            })


//------SignUp Operation Start-----------//

            .state('app.signUp', {
                url: '/signUp',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Shared/Signup/signUp.html',
                        controller: 'SaveProfileCtrl'
                    }

                }
            })

            .state('app.signUpOtp', {
                url: '/signUpOtp',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Shared/Signup/signUpOtp.html',
                        controller: 'signUpOtpCtrl'
                    }

                }
            })


            .state('app.forgotOtp', {
                url: '/forgotOtp',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Shared/resetpassword/forgotOtp.html',
                        controller: 'forgotOtpCtr'
                    }

                }
            })

            .state('app.resetpassword', {
                url: '/resetpassword',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Shared/resetpassword/resetpassword.html',
                        controller: 'resetPasswordCtr'
                    }

                }
            })

            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/home.html',
                        controller: 'homeCtrl'
                    }
                    /*'fabContent': {
                     template: '<button id="fab-consult a doctor" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-ios-telephone"></i></button>',
                     controller: function ($timeout) {
                     $timeout(function () {
                     document.getElementById('fab-consult a doctor').classList.toggle('on');
                     }, 900);
                     }
                     }*/
                }
            })
			
           .state('app.help', {
                url: '/help',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/help.html',
                        controller: 'helpCtr'
                    }
                    
                }
            })


            .state('app.popover', {
                url: '/popover',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/popover.html',
                        controller: 'helpCtr',
                        type:  'text/ng-template'
                    }

                }
            })

            .state('app.loginHelp', {
                url: '/loginHelp',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/loginHelp.html',
                        controller: 'loginHelpCtr'
                    }

                }
            })

			
            .state('app.content', {
                url: '/content',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/content.html',
                        controller: 'contentCtrl'
                    }

                }
            })

            .state('app.viewer', {
                url: '/viewer',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/viewer.html',
                        controller: 'homeCtrl'
                    }

                }
            })
            .state('app.Arcturus', {
                url: '/Arcturus',
                pdfUrl: 'app/Arcturus.pdf'

            })


            .state('app.Feedback', {
                url: '/Feedback',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/Feedback.html',
                        controller: 'FeedbackCtr'
                    }
                    /*'fabContent': {
                     template: '<button id="" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-ios-telephone"></i></button>',
                     controller: function ($timeout) {
                     $timeout(function () {
                     document.getElementById('').classList.toggle('on');
                     }, 200);
                     }
                     }*/
                }
            })

            .state('app.profile', {
                url: '/health profile',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/profile.html',
                        controller: 'ProfileCtrl'
                    }
                    

                }
            })

            .state('app.splash', {
                url: '/splash',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/splash.html',
                        controller: 'splashCtrl'
                    }


                }
            })

            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'app/Components/Home/notifications.html',
                        controller: 'notificationCtrl'
                    }
                    /*'fabContent': {
                     template: '<button id="fab-consult a doctor" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-ios-telephone"></i></button>',
                     controller: function ($timeout) {
                     $timeout(function () {
                     document.getElementById('fab-consult a doctor').classList.toggle('on');
                     }, 900);
                     }
                     }*/
                }
            })


            .state('autologin', {
                url: "/autologin",
                controller: 'autologinCtrl'
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/autologin');
    });