(function (angular) {
    var app = angular.module('my-app');

    app.component('home', {

        templateUrl: '/modules/app/components/home/home.template.html',
        controller: HomeController,
       
    });
    HomeController.$inject = [];
    function HomeController() {
    	var vm = this;
    	
        vm.$onInit = function(){

        vm.gridsterOpts = {
    			resizable: {enabled: false},
    			margins: [18, 18],
    			width: 'auto',
    			mobileBreakPoint: 1024,
    			//colWidth: '262',
    			rowHeight: '320',
    			swapping: true,
    			  draggable: {
    		            enabled: true }
    	};    
           vm.standardItems = [
  { sizeX: 2, sizeY: 1},
  { sizeX: 2, sizeY: 1},
  { sizeX: 2, sizeY: 1},
  { sizeX: 2, sizeY: 1},
  { sizeX: 2, sizeY: 1},
  { sizeX: 2, sizeY: 1},
  /*{ sizeX: 1, sizeY: 1, row: 1, col: 4 },
  { sizeX: 1, sizeY: 2, row: 1, col: 5 },
  { sizeX: 1, sizeY: 1, row: 2, col: 0 },
  { sizeX: 2, sizeY: 1, row: 2, col: 1 },
  { sizeX: 1, sizeY: 1, row: 2, col: 3 },
  { sizeX: 1, sizeY: 1, row: 2, col: 4 }*/
];

vm.chartsConfig = [
    {
        title: 'Technology Change',
        chartType: 'bar',
        chartClass: 'chart-bar',
        labels: ['2013', '2014', '2015', '2016', '2017'],
        series: ['AngularJS', 'JQuery'],
        data: [
            [20, 45, 60, 80, 95],
            [90, 75, 55, 30, 15]
        ]
    },

    {
        title: 'Technology Usage',
        chartType: 'doughnut',
        chartClass: 'chart-doughnut',
        labels: ['AngularJS', 'NodeJS', 'HTML5', 'CSS3', 'JQuery'],
        data: [80, 20, 50, 10, 5]
    },

     {
        title: 'Technology Replacement',
        chartType: 'pie',
        chartClass: 'chart-pie',
        labels: ['AngularJS', 'NodeJS', 'HTML5', 'CSS3', 'JQuery'],
        data: [80, 20, 50, 10, 5]
    },

     {
        title: 'Technology Learning',
        chartType: 'horizontal-bar',
        chartClass: 'chart-horizontal-bar',
        labels: ['2013', '2014', '2015', '2016', '2017'],
        series: ['AngularJS', 'JQuery'],
        data: [
            [20, 45, 60, 80, 95],
            [90, 75, 55, 30, 15]
        ]
    },

     {
        title: 'Hobbies',
        chartType: 'polar-area',
        chartClass: 'chart-polar-area',
        labels: ['Music', 'Movies', 'Watching Sports', 'Learning', 'Playing'],
        data: [500, 100, 600, 400, 200]
    },

     {
        title: 'Aspiration to Travel',
        chartType: 'radar',
        chartClass: 'chart-radar',
        labels: ['UK', 'USA', 'Australia', 'Dubai', 'China', 'Germany', 'France'],
        data: [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ]
    }
];
        }

        vm.$postLink = function(){
            
        }
       
    }

})(window.angular);

