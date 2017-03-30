
angular.module('starter.FeedbackCtr', ['ngStorage','toaster','ngAnimate'])





 .controller('FeedbackCtr', function($scope,$localStorage,ionicToast,$ionicLoading,$state,$ionicPopup, $window,$stateParams,toaster, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate,FeedbackServiceInfo) {

        //--------Pagination start --------//

        $scope.Destpage = 0;
        $scope.currentPage = 0;
        $scope.NumOfRowsCount = 0;
        $scope.pageSize = 1;

        //--------Pagination End --------//


        debugger;
        $scope.feedbackList=[
            {   id:'1',
                QuestionItem:'How do you rate your overall experience with our services?',
                Rating:[
                    {rid:'1',rattingName:'Excellent',show:false},
                    {rid:'2',rattingName:'Good',show:false},
                    {rid:'3',rattingName:'Fair',show:false},
                    {rid:'4',rattingName:'Poor',show:false}
                ]},
            {   id:'2',
                QuestionItem:'How do you rate skills of our nursing staff?',
                Rating:[
                    {rid:'1',rattingName:'Excellent',show:false},
                    {rid:'2',rattingName:'Good',show:false},
                    {rid:'3',rattingName:'Fair',show:false},
                    {rid:'4',rattingName:'Poor',show:false}
                ]},
            {   id:'3',
                QuestionItem:'How do you rate our CNA staff skills?',
                Rating:[
                    {rid:'1',rattingName:'Excellent',show:false},
                    {rid:'2',rattingName:'Good',show:false},
                    {rid:'3',rattingName:'Fair',show:false},
                    {rid:'4',rattingName:'Poor',show:false}
                ]},
            {   id:'4',
                QuestionItem:'How likely are you to recommend our services to friends and family?',
                Rating:[
                    {rid:'1',rattingName:'Highly likely',show:false},
                    {rid:'2',rattingName:' Likely',show:false},
                    {rid:'3',rattingName:' Unlikely',show:false}

                ]},
            {   id:'5',
                QuestionItem:'Please comment on our service',
                Rating:[
                    {rid:'1',rattingName:'',show:false}
                ]}

        ];
                      debugger;
        $scope.answerModel={
            questionId:'',
            questionName:'',
            answer:''
        }
        $scope.getFeedArray=[]
        $scope.GetFeedBackResult=[]
        $scope.GetMasterData = function(index){
            debugger;
            $scope.GetFeedbackList=[];
            $scope.GetFeedbackList.push($scope.feedbackList[index]);
            $scope.NumOfRowsCount= $scope.feedbackList.length;
        }
        $scope.GetMasterData($scope.currentPage);


        $scope.findNextRecords = function () {
            debugger;
            $scope.answerModel = $.grep($scope.getFeedArray,function(gfa){return gfa.questionId==$scope.GetFeedbackList[0].id})[0];

            if($scope.answerModel==undefined){
               /* toaster.pop('error',  "", '<ul><li>please select any one option</li></ul>', 3000, 'trustedHtml') ;*/
                var toast = ({
                    message : 'Please select any one option',
                    position: 'top',
                    stick: false,
                    timeout: 2000,

                    cssClass: "toast_section_error"
                });
                ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);


                $scope.answerModel={};
            }
            else{
                $scope.currentPage = $scope.currentPage + 1;
                $scope.Destpage = $scope.currentPage + 1;
                $scope.GetMasterData($scope.currentPage);
                $scope.answerModel={};
            }




        }

        $scope.findPreviousRecords = function () {
            debugger;
            $scope.currentPage = $scope.currentPage - 1;
            $scope.Destpage = $scope.currentPage - 1;
            $scope.GetMasterData($scope.currentPage);

            $scope.answerModel = $.grep($scope.getFeedArray,function(gfa){return gfa.questionId==$scope.GetFeedbackList[0].id})[0];
            if($scope.answerModel==undefined)
                $scope.answerModel={};
        }

        $scope.GetRattingVal=function (indexVal,Qid,Qname,RatingVal) {
            debugger;
            var getval= $scope.GetFeedbackList;

            $scope.answerModel.questionId=Qid;
            $scope.answerModel.answer=$scope.answerModel.answer;

            if((!!$scope.getFeedArray[indexVal]))
            {
                $scope.getFeedArray[indexVal]= $scope.answerModel;
                $scope.GetFeedBackResult[indexVal]= {questionId:Qid,questionName:Qname,answer:RatingVal};
            }
            else
            {
                $scope.getFeedArray.push($scope.answerModel);
                $scope.GetFeedBackResult.push({questionId:Qid,questionName:Qname,answer:RatingVal});
            }
            debugger;
        }

debugger;

        $scope.textmodel={
            rattingName:''
        }

        $scope.index = 0;

        $scope.getList = $scope.feedbackList[0];

        /*$scope.getNext = function (){
            debugger;
            $scope.index = $scope.index + 1;
            $scope.getList = $scope.feedbackList[$scope.index];
        }*/

        /*$scope.getPrevious = function (){
            debugger;
            $scope.index = $scope.index - 1;
            $scope.getList = $scope.feedbackList[$scope.index];
        }*/




      $scope.FeedbackModel= {
      appId: '',
      userId: '',
      sessionId: '',
      feedbackSet: 'nurse',
      serviceProvideBy: 'care',
      phoneNumber: '',
      emailId: '',
      serviceDate: '2017-02-02',
      saveFeedBackDetails: []
  }

        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };


        $scope.SubmitFeedBack=function (RatingVal) {
            debugger;
            /*var RatingVal = $scope.rattingName;*/
            $scope.GetFeedBackResult.push({questionId:'5',questionName:'Please comment for this App',answer:RatingVal.rattingName});

            $scope.FeedbackModel.appId='a8edd8e0';
            $scope.FeedbackModel.userId=$localStorage.userId;
            $scope.FeedbackModel.firstName=$localStorage.firstName;
            $scope.FeedbackModel.lastName=$localStorage.lastName;
            $scope.FeedbackModel.sessionId=$localStorage.sessionId;
            $scope.FeedbackModel.feedbackSet='1001';
            $scope.FeedbackModel.serviceProvideBy='Nurse';
            $scope.FeedbackModel.phoneNumber="6784621339";
            $scope.FeedbackModel.emailId="asristy@hotmail.com";
            $scope.FeedbackModel.serviceDate='2017-02-02';


            angular.forEach($scope.GetFeedBackResult,function (fdr) {
                $scope.FeedbackModel.saveFeedBackDetails.push(fdr);
                $scope.getFeedArray=[];
            });
            debugger;


            $scope.show($ionicLoading);
            FeedbackServiceInfo.saveFeedback($scope.FeedbackModel).then(function (Feedbackresult) {
                debugger;
                var GetResultVal = Feedbackresult.resultObject;
                var ResultVal = Feedbackresult.responseCode;

                if(Feedbackresult.responseCode == 0){
                    $scope.hide($ionicLoading);
                    $scope.textmodel.rattingName="";
                   // toaster.pop('success',  "", '<ul><li>Thank you</li></ul>', 3000, 'trustedHtml');
                    $state.go('app.home');

                }
                else if(Feedbackresult.errorMessage =="Session is Expired"){
                    $scope.hide($ionicLoading);
                    $scope.showConfirm = function() {
                        debugger;
                        var alertPopup = $ionicPopup.alert({
                            title: 'Session is Expired',
                            template: ''
                        });

                        alertPopup.then(function(res) {
                            debugger;
                            $window.localStorage.clear();
                            $state.go('app.login');
                            $ionicPopup.close();
                        });


                    };
                    $scope.showConfirm();
                }
                else{
                    $scope.hide($ionicLoading);
                }
            })
        }


        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab('right');

        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.CallTel = function(tel) {
            debugger;
            window.location.href = 'tel:'+ tel;
        }



    })


