// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['pdf','ionic', 'ionic-toast','ionic.cloud', 'ngCordova','starter.loginctrl','starter.AccountExists','starter.passwordCtrl','starter.Profilecontrollers','starter.signUpOtpCtrl','starter.ProfileCtrl',
        'starter.menuCtrl','starter.FeedbackCtr','starter.homeCtrl','starter.notificationCtrl','starter.loginPassword','starter.validateOtp',
        'starter.signUpReq','starter.signUpRegistration','starter.contentCtrl','starter.contentService','starter.directives','starter.routes',
        'starter.GetProfile','ngStorage','starter.HelpCtrl','starter.constructionCtrl','starter.SessionService','starter.logoutService', 'starter.UpdateProfileService',
        'starter.forgotService','starter.loginHelpCtr','starter.forgotOtpCtr','starter.updatePasswordService','starter.resetPasswordCtr','ionic-material', 'ionMdInput','toaster','ngAnimate','starter.FeedbackService'])
.config(function($ionicConfigProvider) {
	 $ionicConfigProvider.views.transition('none');
	})
		
.run(function($ionicPlatform,$state,$localStorage) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
       debugger;
        console.log(window.device.uuid);
        var deviceId  =  window.device.uuid;
        $localStorage.deviceId = deviceId;

        var isWebView = ionic.Platform.isWebView();
        if(isWebView) {
            $localStorage.deviceType = "Web";
        }
        var isIPad = ionic.Platform.isIPad();
        if(isIPad) {
            $localStorage.deviceType = "IPad";
        }
        var isIOS = ionic.Platform.isIOS();
        if(isIOS) {
            $localStorage.deviceType = "IOS";
        }
        var isAndroid = ionic.Platform.isAndroid();
        if(isAndroid) {
            $localStorage.deviceType = "Android";
        }
        var isWindowsPhone = ionic.Platform.isWindowsPhone();
        if(isWindowsPhone) {
            $localStorage.deviceType = "WindowsPhone";
        }


        debugger;
        $ionicPlatform.registerBackButtonAction(function() {
            if ($state.current.name == "app.home") {
                navigator.app.exitApp();
            }
           else if ($state.current.name == "app.login") {
                navigator.app.exitApp();
            }
            else{
                navigator.app.backHistory();
            }
        }, 100);

        // setTimeout(function() {
            // navigator.splashscreen.hide();
        // },110);


        // if (window.cordova && window.cordova.plugins.Keyboard) {
            // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          // }

        if (ionic.Platform.isIOS()){
            ionic.Platform.fullScreen();
        }else{
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        } }
    });
})


