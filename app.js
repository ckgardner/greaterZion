/*jshint esversion: 6 */

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
        .then((reg) => console.log("Service Worker Registered", reg))
        .catch((err) => console.log("Service Worker Not Registered", err));
}

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'home', // home, entrances, parking, shuttles, trails, map
        previousPages: '',
        homeImg: 'icons/home_green.svg',
        mapImg: 'icons/map_grey.svg',
        home_selected: true,
        map_selected: false,
        showInstallMessage: false,
        showAndroidInstallMessage: false,
        slideIndex: 1,

        // ENTRANCES
        entranceLastUpdate: '',
        SouthEntranceStat: '',
        EastEntranceStat: '',
        RiverEntranceStat: '',
        KolobEntranceStat: '',

        SouthEntranceBusiness: '',
        EastEntranceBusiness: '',
        RiverEntranceBusiness: '',
        KolobEntranceBusiness: '',

        southEntranceSvg: 'icons/entrance_grey.svg',
        southEntranceSvgStroke: '',
        eastEntranceSvg: 'icons/entrance_grey.svg',
        eastEntranceSvgStroke: '',
        riverEntranceSvg: 'icons/entrance_grey.svg',
        riverEntranceSvgStroke: '',
        kolobEntranceSvg: 'icons/entrance_grey.svg',
        kolobEntranceSvgStroke: '',

        // PARKING
        parkingLastUpdate: '',
        vcStat: '',
        museumStat: '',
        rvStat: '',
        springdaleStat: '',
        kolobVcStat: '',

        vcFullTime: '',
        museumFullTime: '',
        rvFullTime: '',
        springdaleFullTime: '',
        kolobVcFullTime: '',
        vcOpenTime: '',
        museumOpenTime: '',
        rvOpenTime: '',
        springdaleOpenTime: '',
        kolobVcOpenTime: '',
        
        
        vcBusiness: '',
        museumBusiness: '',
        rvBusiness: '',
        springdaleBusiness: '',
        kolobVcBusiness: '',

        vcParkingSvg: 'icons/parking_grey.svg',
        vcParkingSvgStroke: '',
        museumParkingSvg: 'icons/parking_grey.svg',
        museumParkingSvgStroke: '',
        rvParkingSvg: 'icons/parking_grey.svg',
        rvParkingSvgStroke: '',
        springdaleParkingSvg: 'icons/parking_grey.svg',
        springdaleParkingSvgStroke: '',
        kolobVcParkingSvg: 'icons/parking_grey.svg',
        kolobVcParkingSvgStroke: '',

        // TRAILS
        trailsLastUpdate: '',
        parusStat: 50,
        archeologyStat: 20,
        lowerEmeraldStat: 50,
        grottoStat: 90,
        weepingRockStat: 'closed',
        riversideStat: 90,
        watchmanStat: 20,
        sandBenchStat: 20,
        upperEmeraldStat: 50,
        kayentaStat: 50,
        canyonOverlookStat: 90,
        taylorCreekStat: 20,
        timberCreekStat: 20,
        angelsLandingWestStat: 'closed',
        hiddenCanyonStat: 'closed',
        observationPointStat: 'closed',
        narrowsStat: 90,

        parusBusiness: '', 
        archeologyBusiness: '', 
        lowerEmeraldBusiness: '', 
        grottoBusiness: '', 
        weepingRockBusiness: '', 
        riversideBusiness: '', 
        watchmanBusiness: '', 
        sandBenchBusiness: '', 
        upperEmeraldBusiness: '', 
        kayentaBusiness: '', 
        canyonOverlookBusiness: '', 
        taylorCreekBusiness: '', 
        timberCreekBusiness: '', 
        angelsLandingWestBusiness: '', 
        hiddenCanyonBusiness: '', 
        observationPointBusiness: '', 
        narrowsBusiness: '', 

        parusSvg: '',
        parusSvgStroke: '',
        archeologySvg: '',
        archeologySvgStroke: '',
        lowerEmeraldSvg: '',
        lowerEmeraldSvgStroke: '',
        grottoSvg: '',
        grottoSvgStroke: '',
        weepingRockSvg: '',
        weepingRockSvgStroke: '',
        riversideSvg: '',
        riversideSvgStroke: '',
        watchmanSvg: '',
        watchmanSvgStroke: '',
        sandBenchSvg: '',
        sandBenchSvgStroke: '',
        upperEmeraldSvg: '',
        upperEmeraldSvgStroke: '',
        kayentaSvg: '',
        kayentaSvgStroke: '',
        canyonOverlookSvg: '',
        canyonOverlookSvgStroke: '',
        taylorCreekSvg: '',
        taylorCreekSvgStroke: '',
        timberCreekSvg: '',
        timberCreekSvgStroke: '',
        angelsLandingWestSvg: '',
        angelsLandingWestSvgStroke: '',
        hiddenCanyonSvg: '',
        hiddenCanyonSvgStroke: '',
        observationPointSvg: '',
        observationPointSvgStroke: '',
        narrowsSvg: '',
        narrowsSvgStroke: '',

        zionCanyon_selected: true,
        springdale_selected: false,
    },
    created: function(){
        this.PWA_popup();
        this.loadTrails();
        this.gestures();
    },
    methods: {
        gestures: function(){
            let touchstartX = 0;
            let touchstartY = 0;
            let touchendX = 0;
            let touchendY = 0;

            const gestureZone = document.getElementById('modalContent');

            gestureZone.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX;
                touchstartY = event.changedTouches[0].screenY;
            }, false);

            gestureZone.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX;
                touchendY = event.changedTouches[0].screenY;
                handleGesture();
            }, false); 

            function handleGesture() {
                if (touchendX < touchstartX) {
                    console.log('Swiped left');
                }
                
                if (touchendX > touchstartX) {
                    console.log('Swiped right');
                }
                
                if (touchendY < touchstartY) {
                    console.log('Swiped up');
                }
                
                if (touchendY > touchstartY) {
                console.log('Swiped down');
                }
                
                if (touchendY === touchstartY) {
                console.log('Tap');
                }
            }
        },
        PWA_popup: function(){
            const isIos = () => {
                const userAgent = window.navigator.userAgent.toLowerCase();
                return /iphone|ipad|ipod/.test( userAgent );
            };
              // Detects if device is in standalone mode
            const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
              
              // Checks if should display install popup notification:
            if (isIos() && !isInStandaloneMode()) {
                this.showInstallMessage = true;
            }else if(!isIos() && !isInStandaloneMode()) {
                this.showAndroidInstallMessage = true;
            }

            setTimeout(() => this.showInstallMessage = false, 15000);
            setTimeout(() => this.showAndroidInstallMessage = false, 15000);
        },
        bottomNavImg: function(NewTab) {
            switch(NewTab) {
                case 'home':
                    this.homeImg = 'icons/home_green.svg'; this.mapImg = 'icons/map_grey.svg'; 
                    this.home_selected=true;  this.map_selected=false; 
                    break;
                case 'map':
                    this.homeImg = 'icons/home_grey.svg'; this.mapImg = 'icons/map_green.svg'; 
                    this.home_selected=false;  this.map_selected=true; 
                    break;
            }
        },
        mapBackClicked: function(){
            this.page = 'home';
            this.bottomNavImg('home');
            this.home_selected = true;
            this.map_selected = false;
        },
        entrancesClicked: function(){
            this.page = 'entrances';
            this.loadEntrance();
            this.showInstallMessage = false;
        },
        parkingClicked: function(){
            this.page = 'parking';         
            this.loadParking();
            this.showInstallMessage = false;
        },
        shuttlesClicked: function(){
            this.page = 'shuttles';
            //history.pushState(this.previousPages, '', "index.html");            
            this.showInstallMessage = false;
        },
        trailsClicked: function(){
            this.page = 'trails';        
            this.loadTrails();
            this.showInstallMessage = false;
        },

        // Next/previous controls
        plusSlides: function(n){
            this.showSlides(this.slideIndex += n);
        },
        // Thumbnail image controls
        currentSlide: function(n) {
            this.showSlides(this.slideIndex = n);
        },
        showSlides: function(n) {
            var i, slides;
            if(this.page=='parusImages'){
                slides = document.getElementsByClassName("mySlides");
            }else if(this.page=='archeologyImages'){
                slides = document.getElementsByClassName("mySlides2");
            }else if(this.page=='lowerEmeraldImages'){
                slides = document.getElementsByClassName("mySlides3");
            }else if(this.page=='grottoImages'){
                slides = document.getElementsByClassName("mySlides4");
            }else if(this.page=='riversideImages'){
                slides = document.getElementsByClassName("mySlides5");
            }else if(this.page=='watchmanImages'){
                slides = document.getElementsByClassName("mySlides6");
            }else if(this.page=='sandbenchImages'){
                slides = document.getElementsByClassName("mySlides7");
            }else if(this.page=='upperEmeraldImages'){
                slides = document.getElementsByClassName("mySlides8");
            }else if(this.page=='kayentaImages'){
                slides = document.getElementsByClassName("mySlides9");
            }else if(this.page=='canyonImages'){
                slides = document.getElementsByClassName("mySlides10");
            }else if(this.page=='taylorImages'){
                slides = document.getElementsByClassName("mySlides11");
            }else if(this.page=='angelsImages'){
                slides = document.getElementsByClassName("mySlides13");
            }else if(this.page=='observationImages'){
                slides = document.getElementsByClassName("mySlides14");
            }else if(this.page=='narrowsImages'){
                slides = document.getElementsByClassName("mySlides15");
            }
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {this.slideIndex = 1;}
            if (n < 1) {this.slideIndex = slides.length;}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex-1].style.display = "block";
            dots[this.slideIndex-1].className += " active";
        },
        setStop: function(id, radius, stop){
            var c = document.getElementById(id);
            c.className = "background";
            var stopVal = Math.PI * radius * 2 * (stop);
            c.setAttribute("stroke-dasharray", stopVal + ", 3000");
            c.setAttribute("stroke-dashoffset", stopVal);
            c.className = "overlayLine";
        },
        getAPIData_safe: function (data, fields, def){
			//data = json object api return data
			//fields = array of data fields tree
			//def = default return value if nothing is found
			var ret = def;
			var multiEntrance = false;
			try{
				if(i == 0 && tdata.hasOwnProperty(f + "1")){multiEntrance = true;}
				var tdata = data;
				for(var i = 0; i < fields.length; i++){
					let f = fields[i];
					if(tdata.hasOwnProperty(f)){
						if(i == fields.length - 1){
							ret = tdata[f];
						}else{
							tdata = tdata[f];
						}
					}
				}
			}catch(err){
				console.log(err);
			}
			return ret;
        },
        getUpdateTime: function(){
            let date = new Date();
            let TOD = 'AM';
            let hours = date.getHours();
            if(hours>=12){
                TOD = 'PM';
                if(hours>=13){
                    hours -= 12;
                }
            }
            if(hours==0){
                hours=12;
            }
            let minutes = date.getMinutes();
            if(minutes < 10){
                minutes = "0" + minutes.toString();
            }
            return hours.toString() + ":" + minutes.toString() + " " + TOD;
        },
        loadEntrance: function(){
            var vm = this;
            axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zionsouthin").then(response =>{
                this.SouthEntranceStat = response.data.zionsouthin.rotate100;
                if(this.SouthEntranceStat < 33){
                    this.southEntranceSvg = "icons/entrance_green.svg";
                    this.southEntranceSvgStroke = "#749D4C";
                    this.SouthEntranceBusiness = "Not too busy";
                }else if(this.SouthEntranceStat < 66){
                    this.southEntranceSvg = "icons/entrance_yellow.svg";
                    this.southEntranceSvgStroke = "#FFCD31";
                    this.SouthEntranceBusiness = "A little busy";
                }else{
                    this.southEntranceSvg = "icons/entrance_pink.svg";
                    this.southEntranceSvgStroke = "#EF6A6E";
                    this.SouthEntranceBusiness = "As busy as it gets";
                }
                this.SouthEntranceStat /= 100;
                this.setStop("southEntranceLine", 8, this.SouthEntranceStat);
                
                this.entranceLastUpdate = this.getUpdateTime();
            }).catch(error =>{
                vm = "Fetch " + error;
                this.southEntranceSvg = "icons/entrance_grey.svg";
                this.southEntranceSvgStroke = "#B5B5B5";
                this.SouthEntranceBusiness = "";
                this.entranceLastUpdate = "Update needs wifi";
            });
            axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zioneastin").then(response =>{
                this.EastEntranceStat = response.data.zioneastin.rotate100;
                if(this.EastEntranceStat < 33){
                    this.eastEntranceSvg = "icons/entrance_green.svg";
                    this.eastEntranceSvgStroke = "#749D4C";
                    this.EastEntranceBusiness = "Not too busy";
                }else if(this.EastEntranceStat < 66){
                    this.eastEntranceSvg = "icons/entrance_yellow.svg";
                    this.eastEntranceSvgStroke = "#FFCD31";
                    this.EastEntranceBusiness = "A little busy";
                }else{
                    this.eastEntranceSvg = "icons/entrance_pink.svg";
                    this.eastEntranceSvgStroke = "#EF6A6E";
                    this.EastEntranceBusiness = "As busy as it gets";
                }
                this.EastEntranceStat /= 100;
                this.setStop("eastEntranceLine", 8, this.EastEntranceStat);
            }).catch(error =>{
                vm = "Fetch " + error;
                this.eastEntranceSvg = "icons/entrance_grey.svg";
                this.eastEntranceSvgStroke = "#B5B5B5";
                this.EastEntranceBusiness = "";
            });
            axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zionbridge").then(response =>{
                this.RiverEntranceStat = response.data.zionbridge.rotate100;
                if(this.RiverEntranceStat < 33){
                    this.riverEntranceSvg = "icons/entrance_green.svg";
                    this.riverEntranceSvgStroke = "#749D4C";
                    this.RiverEntranceBusiness = "Not too busy";
                }else if(this.RiverEntranceStat < 66){
                    this.riverEntranceSvg = "icons/entrance_yellow.svg";
                    this.riverEntranceSvgStroke = "#FFCD31";
                    this.RiverEntranceBusiness = "A little busy";
                }else{
                    this.riverEntranceSvg = "icons/entrance_pink.svg";
                    this.riverEntranceSvgStroke = "#EF6A6E";
                    this.RiverEntranceBusiness = "As busy as it gets";
                }
                this.RiverEntranceStat /= 100;
                this.setStop("riverEntranceLine", 8, this.RiverEntranceStat);

                this.kolobEntranceSvg = "icons/entrance_green.svg";
                this.kolobEntranceSvgStroke = "#749D4C";
                this.KolobEntranceBusiness = "Not too busy";
                this.setStop("kolobEntranceLine", 8, 0.01);
            }).catch(error =>{
                vm = "Fetch " + error;

                this.riverEntranceSvg = "icons/entrance_grey.svg";
                this.riverEntranceSvgStroke = "#B5B5B5";
                this.RiverEntranceBusiness = "";

                this.kolobEntranceSvg = "icons/entrance_grey.svg";
                this.kolobEntranceSvgStroke = "#B5B5B5";
                this.KolobEntranceBusiness = "Not too busy";
            });
            // axios.get("kolob parking php request here").then(response => {
            //     this.RiverEntranceStat = response.data.zionbridge.rotate100;
            //     if(this.RiverEntranceStat < 33){
            //         this.riverEntranceSvg = "icons/entrance_green.svg";
            //         this.riverEntranceSvgStroke = "#749D4C";
            //         this.RiverEntranceBusiness = "Not too busy";
            //     }else if(this.RiverEntranceStat < 66){
            //         this.riverEntranceSvg = "icons/entrance_yellow.svg";
            //         this.riverEntranceSvgStroke = "#FFCD31";
            //         this.RiverEntranceBusiness = "A little busy";
            //     }else{
            //         this.riverEntranceSvg = "icons/entrance_pink.svg";
            //         this.riverEntranceSvgStroke = "#EF6A6E";
            //         this.RiverEntranceBusiness = "As busy as it gets";
            //     }
            //     this.RiverEntranceStat /= 100;
            //     this.setStop("riverEntranceLine", 8, this.RiverEntranceStat);
            // }).catch(error => {
            //     vm = "Fetch " + error;
            // });
        },
        resetEntranceAnimation: function(){
            var vm = this;
            axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zionsouthin").then(response =>{
                this.SouthEntranceStat = response.data.zionsouthin.rotate100;
                if(this.SouthEntranceStat < 33){
                    this.southEntranceSvg = "icons/entrance_green.svg";
                    this.southEntranceSvgStroke = "#749D4C";
                    this.SouthEntranceBusiness = "Not too busy";
                }else if(this.SouthEntranceStat < 66){
                    this.southEntranceSvg = "icons/entrance_yellow.svg";
                    this.southEntranceSvgStroke = "#FFCD31";
                    this.SouthEntranceBusiness = "A little busy";
                }else{
                    this.southEntranceSvg = "icons/entrance_pink.svg";
                    this.southEntranceSvgStroke = "#EF6A6E";
                    this.SouthEntranceBusiness = "As busy as it gets";
                }
                this.SouthEntranceStat /= 100;
                this.setStop("southEntranceLine", 8, this.SouthEntranceStat);
                
                this.entranceLastUpdate = this.getUpdateTime();
            }).catch(error =>{
                vm = "Fetch " + error;
                this.southEntranceSvg = "icons/entrance_grey.svg";
                this.southEntranceSvgStroke = "#B5B5B5";
                this.SouthEntranceBusiness = "";
                this.entranceLastUpdate = "Update needs wifi";
            });
            axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zioneastin").then(response =>{
                this.EastEntranceStat = response.data.zioneastin.rotate100;
                if(this.EastEntranceStat < 33){
                    this.eastEntranceSvg = "icons/entrance_green.svg";
                    this.eastEntranceSvgStroke = "#749D4C";
                    this.EastEntranceBusiness = "Not too busy";
                }else if(this.EastEntranceStat < 66){
                    this.eastEntranceSvg = "icons/entrance_yellow.svg";
                    this.eastEntranceSvgStroke = "#FFCD31";
                    this.EastEntranceBusiness = "A little busy";
                }else{
                    this.eastEntranceSvg = "icons/entrance_pink.svg";
                    this.eastEntranceSvgStroke = "#EF6A6E";
                    this.EastEntranceBusiness = "As busy as it gets";
                }
                this.EastEntranceStat /= 100;
                this.setStop("eastEntranceLine", 8, this.EastEntranceStat);
            }).catch(error =>{
                vm = "Fetch " + error;
                this.eastEntranceSvg = "icons/entrance_grey.svg";
                this.eastEntranceSvgStroke = "#B5B5B5";
                this.EastEntranceBusiness = "";
            });
            axios.get("https://trailwaze.info/zion/vehicleTraffic_request.php?site=zionbridge").then(response =>{
                this.RiverEntranceStat = response.data.zionbridge.rotate100;
                if(this.RiverEntranceStat < 33){
                    this.riverEntranceSvg = "icons/entrance_green.svg";
                    this.riverEntranceSvgStroke = "#749D4C";
                    this.RiverEntranceBusiness = "Not too busy";
                }else if(this.RiverEntranceStat < 66){
                    this.riverEntranceSvg = "icons/entrance_yellow.svg";
                    this.riverEntranceSvgStroke = "#FFCD31";
                    this.RiverEntranceBusiness = "A little busy";
                }else{
                    this.riverEntranceSvg = "icons/entrance_pink.svg";
                    this.riverEntranceSvgStroke = "#EF6A6E";
                    this.RiverEntranceBusiness = "As busy as it gets";
                }
                this.RiverEntranceStat /= 100;
                this.setStop("riverEntranceLine", 8, this.RiverEntranceStat);

                this.kolobEntranceSvg = "icons/entrance_green.svg";
                this.kolobEntranceSvgStroke = "#749D4C";
                this.KolobEntranceBusiness = "Not too busy";
                this.setStop("kolobEntranceLine", 8, 0.01);
            }).catch(error =>{
                vm = "Fetch " + error;

                this.riverEntranceSvg = "icons/entrance_grey.svg";
                this.riverEntranceSvgStroke = "#B5B5B5";
                this.RiverEntranceBusiness = "";

                this.kolobEntranceSvg = "icons/entrance_green.svg";
                this.kolobEntranceSvgStroke = "#749D4C";
                this.KolobEntranceBusiness = "Not too busy";
            });
            document.getElementById("southEntranceLine").style.animation = "null";
            document.getElementById("eastEntranceLine").style.animation = "null";
            document.getElementById("riverEntranceLine").style.animation = "null";
            document.getElementById("kolobEntranceLine").style.animation = "null";
            setTimeout(function(){
                document.getElementById("southEntranceLine").style.animation = "";
                document.getElementById("eastEntranceLine").style.animation = "";
                document.getElementById("riverEntranceLine").style.animation = "";
                document.getElementById("kolobEntranceLine").style.animation = "";
            },0.2);
            this.entranceLastUpdate = this.getUpdateTime();
        },
        loadParking: function(){
            axios.get("https://trailwaze.info/zion/request.php").then(response => {
                //Visitor Center: Today
                this.vcStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                var vcFullTime = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "full_time"], 0);
                var vcOpenTime = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "open_time"], 0);
                this.vcFullTime = "Full @ " + vcFullTime;
                this.vcOpenTime = "- Open @ " + vcOpenTime;
                if(vcFullTime == "UNK"){
                    this.vcFullTime = "";
                }
                if(vcOpenTime == "UNK"){
                    this.vcOpenTime = "";
                }     
                //Museum: Today
                this.museumStat = this.getAPIData_safe(response.data, ["ParkingOverflow", "Today", "count"], 0);
                this.museumFullTime = this.getAPIData_safe(response.data, ["ParkingOverflow", "Today", "full_time"], 0);
                this.museumOpenTime = this.getAPIData_safe(response.data, ["ParkingOverflow", "Today", "open_time"], 0);
                if(this.museumFullTime == "UNK"){
                    this.museumFullTime = this.vcFullTime;
                }
                if(this.museumOpenTime == "UNK"){
                    this.museumOpenTime = this.vcOpenTime;
                }
                //RV: Today
                this.rvStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                this.rvFullTime = this.vcFullTime;
                this.rvOpenTime = this.vcOpenTime;
                //Springdale: Today
                this.springdaleStat = 0;
                //Kolob Visitor Center
                this.kolobVcStat = 'closed';
                this.loadParkingSvgs();
                let date = new Date();
                let TOD = 'AM';
                let hours = date.getHours();
                if(hours>=12){
                    TOD = 'PM';
                    if(hours>=13){
                        hours -= 12;
                    }
                }
                if(hours==0){
                    hours=12;
                }
                let minutes = date.getMinutes();
                if(minutes < 10){
                    minutes = "0" + minutes.toString();
                }
                this.parkingLastUpdate = hours.toString() + ":" + minutes.toString() + " " + TOD;
            }).catch(error => {
                vm = "Fetch " + error;
                this.vcStat = 200;this.museumStat = 200;this.rvStat=200;this.springdaleStat=200;this.kolobVcStat=200;
                this.loadParkingSvgsOffline();
            });
        },
        loadParkingSvgs: function(){
            var VC = this.vcStat / 100;
            this.vcBusiness = this.loadParkingBusiness(VC)[0];
            this.vcParkingSvg = this.loadParkingBusiness(VC)[1];
            this.vcParkingSvgStroke = this.loadParkingBusiness(VC)[2];

            var M = this.museumStat / 100;
            this.museumBusiness = this.loadParkingBusiness(M)[0];
            this.museumParkingSvg = this.loadParkingBusiness(M)[1];
            this.museumParkingSvgStroke = this.loadParkingBusiness(M)[2];

            var RV = this.rvStat / 100;
            this.rvBusiness = this.loadParkingBusiness(RV)[0];
            this.rvParkingSvg = this.loadParkingBusiness(RV)[1];
            this.rvParkingSvgStroke = this.loadParkingBusiness(RV)[2];

            var SD = this.springdaleStat / 100;
            this.springdaleBusiness = this.loadParkingBusiness(SD)[0];
            this.springdaleParkingSvg = this.loadParkingBusiness(SD)[1];
            this.springdaleParkingSvgStroke = this.loadParkingBusiness(SD)[2];

            var KVC = 0.1 / 100;
            this.kolobVcBusiness = this.loadParkingBusiness(KVC)[0];
            this.kolobVcParkingSvg = this.loadParkingBusiness(KVC)[1];
            this.kolobVcParkingSvgStroke = this.loadParkingBusiness(KVC)[2];

            this.setStop("vcLine", 8, VC);
            this.setStop("museumLine", 8, M);
            this.setStop("rvLine", 8, RV);
            this.setStop("springdaleLine", 8, SD);
            this.setStop("kolobVcLine", 8, KVC);
        },
        resetLoadParkingSvgs: function(){
            var VC = this.vcStat / 100;
            this.vcBusiness = this.loadParkingBusiness(VC)[0];
            this.vcParkingSvg = this.loadParkingBusiness(VC)[1];
            this.vcParkingSvgStroke = this.loadParkingBusiness(VC)[2];

            var M = this.museumStat / 100;
            this.museumBusiness = this.loadParkingBusiness(M)[0];
            this.museumParkingSvg = this.loadParkingBusiness(M)[1];
            this.museumParkingSvgStroke = this.loadParkingBusiness(M)[2];

            var RV = this.rvStat / 100;
            this.rvBusiness = this.loadParkingBusiness(RV)[0];
            this.rvParkingSvg = this.loadParkingBusiness(RV)[1];
            this.rvParkingSvgStroke = this.loadParkingBusiness(RV)[2];

            var SD = this.springdaleStat / 100;
            this.springdaleBusiness = this.loadParkingBusiness(SD)[0];
            this.springdaleParkingSvg = this.loadParkingBusiness(SD)[1];
            this.springdaleParkingSvgStroke = this.loadParkingBusiness(SD)[2];

            var KVC = this.kolobVcStat / 100;
            this.kolobVcBusiness = this.loadParkingBusiness(KVC)[0];
            this.kolobVcParkingSvg = this.loadParkingBusiness(KVC)[1];
            this.kolobVcParkingSvgStroke = this.loadParkingBusiness(KVC)[2];

            this.setStop("vcLine", 8, VC);
            this.setStop("museumLine", 8, M);
            this.setStop("rvLine", 8, RV);
            this.setStop("springdaleLine", 8, SD);
            this.setStop("kolobVcLine", 8, KVC);

            document.getElementById("vcLine").style.animation = "null";
            document.getElementById("museumLine").style.animation = "null";
            document.getElementById("rvLine").style.animation = "null";
            document.getElementById("springdaleLine").style.animation = "null";
            document.getElementById("kolobVcLine").style.animation = "null";
            setTimeout(function(){
                document.getElementById("vcLine").style.animation = "";
                document.getElementById("museumLine").style.animation = "";
                document.getElementById("rvLine").style.animation = "";
                document.getElementById("springdaleLine").style.animation = "";
                document.getElementById("kolobVcLine").style.animation = "";
            },0.2);
            this.parkingLastUpdate = this.getUpdateTime();
        },
        resetLoadParkingSvgsOffline: function(){
            this.parkingLastUpdate = "Update needs wifi";
            var VC = this.vcStat / 100;
            this.vcBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.vcParkingSvgStroke = '#B5B5B5';

            var M = this.museumStat / 100;
            this.museumBusiness = "";
            this.museumParkingSvg = 'icons/parking_grey.svg';
            this.museumParkingSvgStroke = '#B5B5B5';

            var RV = this.rvStat / 100;
            this.rvBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.rvParkingSvgStroke = '#B5B5B5';

            var SD = this.springdaleStat / 100;
            this.springdaleBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.springdaleParkingSvgStroke = '#B5B5B5';

            var KVC = this.kolobVcStat / 100;
            this.kolobVcBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.kolobVcParkingSvgStroke = '#B5B5B5';

            this.setStop("vcLine", 8, 1);
            this.setStop("museumLine", 8, 1);
            this.setStop("rvLine", 8, 1);
            this.setStop("springdaleLine", 8, 1);
            this.setStop("kolobVcLine", 8, 1);

            document.getElementById("vcLine").style.animation = "null";
            document.getElementById("museumLine").style.animation = "null";
            document.getElementById("rvLine").style.animation = "null";
            document.getElementById("springdaleLine").style.animation = "null";
            document.getElementById("kolobVcLine").style.animation = "null";
            setTimeout(function(){
                document.getElementById("vcLine").style.animation = "";
                document.getElementById("museumLine").style.animation = "";
                document.getElementById("rvLine").style.animation = "";
                document.getElementById("springdaleLine").style.animation = "";
                document.getElementById("kolobVcLine").style.animation = "";
            },0.2);
        },
        resetParkingAnimation: function(){
            axios.get("https://trailwaze.info/zion/request.php").then(response => {
                //Visitor Center: Today
                this.vcStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                var vcFullTime = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "full_time"], 0);
                var vcOpenTime = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "open_time"], 0);
                this.vcFullTime = "Full @ " + vcFullTime;
                this.vcOpenTime = "- Open @ " + vcOpenTime;
                if(vcFullTime == "UNK"){
                    this.vcFullTime = "";
                }
                if(vcOpenTime == "UNK"){
                    this.vcOpenTime = "";
                }     
                //Museum: Today
                this.museumStat = this.getAPIData_safe(response.data, ["ParkingOverflow", "Today", "count"], 0);
                this.museumFullTime = this.getAPIData_safe(response.data, ["ParkingOverflow", "Today", "full_time"], 0);
                this.museumOpenTime = this.getAPIData_safe(response.data, ["ParkingOverflow", "Today", "open_time"], 0);
                if(this.museumFullTime == "UNK"){
                    this.museumFullTime = this.vcFullTime;
                }
                if(this.museumOpenTime == "UNK"){
                    this.museumOpenTime = this.vcOpenTime;
                }
                //RV: Today
                this.rvStat = this.getAPIData_safe(response.data, ["ParkingVisitorCenter", "Today", "count"], 0);
                this.rvFullTime = this.vcFullTime;
                this.rvOpenTime = this.vcOpenTime;
                //Springdale: Today
                this.springdaleStat = 0;
                //Kolob Visitor Center
                this.kolobVcStat = 'closed';
                this.resetLoadParkingSvgs();
            }).catch(error => {
                vm = "Fetch " + error;
                this.vcStat = 200;this.museumStat = 200;this.rvStat=200;this.springdaleStat=200;this.kolobVcStat=200;
                this.resetLoadParkingSvgsOffline();
            });
        },
        resetTrailAnimation: function(){
            document.getElementById("parusLine").style.animation = "null";
            document.getElementById("archeologyLine").style.animation = "null";
            document.getElementById("lowerEmeraldLine").style.animation = "null";
            document.getElementById("grottoLine").style.animation = "null";
            document.getElementById("riversideLine").style.animation = "null";
            document.getElementById("watchmanLine").style.animation = "null";
            document.getElementById("sandBenchLine").style.animation = "null";
            document.getElementById("upperEmeraldLine").style.animation = "null";
            document.getElementById("kayentaLine").style.animation = "null";
            document.getElementById("canyonOverlookLine").style.animation = "null";
            document.getElementById("taylorCreekLine").style.animation = "null";
            document.getElementById("timberCreekLine").style.animation = "null";
            document.getElementById("angelsLandingWestLine").style.animation = "null";
            document.getElementById("observationPointLine").style.animation = "null";
            document.getElementById("narrowsLine").style.animation = "null";
            setTimeout(function(){
                document.getElementById("parusLine").style.animation = "";
                document.getElementById("archeologyLine").style.animation = "";
                document.getElementById("lowerEmeraldLine").style.animation = "";
                document.getElementById("grottoLine").style.animation = "";
                document.getElementById("riversideLine").style.animation = "";
                document.getElementById("watchmanLine").style.animation = "";
                document.getElementById("sandBenchLine").style.animation = "";
                document.getElementById("upperEmeraldLine").style.animation = "";
                document.getElementById("kayentaLine").style.animation = "";
                document.getElementById("canyonOverlookLine").style.animation = "";
                document.getElementById("taylorCreekLine").style.animation = "";
                document.getElementById("timberCreekLine").style.animation = "";
                document.getElementById("angelsLandingWestLine").style.animation = "";
                document.getElementById("observationPointLine").style.animation = "";
                document.getElementById("narrowsLine").style.animation = "";
            },0.2);
            this.trailsLastUpdate = this.getUpdateTime();
        },
        loadParkingBusiness: function(lot){
            if (isNaN(lot)){
                return ['Closed', 'icons/parking_grey.svg', '#B5B5B5'];
            }else if(lot < 0.33){
                return ['Not too busy', 'icons/parking_green.svg', '#749D4C'];
            }else if(lot < 0.66){
                return ['A little busy', 'icons/parking_yellow.svg', '#FFCD31'];
            }else{
                return ['As busy as it gets', 'icons/parking_pink.svg', '#EF6A6E'];
            }
        },
        loadParkingSvgsOffline: function(){
            this.parkingLastUpdate = "Update needs wifi";
            var VC = this.vcStat / 100;
            this.vcBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.vcParkingSvgStroke = '#B5B5B5';

            var M = this.museumStat / 100;
            this.museumBusiness = "";
            this.museumParkingSvg = 'icons/parking_grey.svg';
            this.museumParkingSvgStroke = '#B5B5B5';

            var RV = this.rvStat / 100;
            this.rvBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.rvParkingSvgStroke = '#B5B5B5';

            var SD = this.springdaleStat / 100;
            this.springdaleBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.springdaleParkingSvgStroke = '#B5B5B5';

            var KVC = this.kolobVcStat / 100;
            this.kolobVcBusiness = "";
            this.vcParkingSvg = 'icons/parking_grey.svg';
            this.kolobVcParkingSvgStroke = '#B5B5B5';

            this.setStop("vcLine", 8, 1);
            this.setStop("museumLine", 8, 1);
            this.setStop("rvLine", 8, 1);
            this.setStop("springdaleLine", 8, 1);
            this.setStop("kolobVcLine", 8, 1);
        },
        loadTrails: function(){
            var P = this.parusStat/100;
            var A = this.archeologyStat/100;
            var LE = this.lowerEmeraldStat/100;
            var G = this.grottoStat/100;
            //var W = this.weepingRockStat/100;
            var R = this.riversideStat/100;
            var WL = this.watchmanStat/100;
            var SB = this.sandBenchStat/100;
            var UE = this.upperEmeraldStat/100;
            var K = this.kayentaStat/100;
            var CO = this.canyonOverlookStat/100;
            var TC = this.taylorCreekStat/100;
            var TiC = this.timberCreekStat/100;
            var AW = this.angelsLandingWestStat/100;
            // var HC = this.hiddenCanyonStat/100;
            var OP = this.observationPointStat/100;
            var N = this.narrowsStat/100;
            var time = new Date().getHours();
            if (time <= 8 || time >= 21 ){
                P = A = LE = G = W = R = WL = SB = UE = K = CO = TC = TiC = AW = HC = OP = N = 0;
            }

            this.parusBusiness = this.loadTrailsBusiness(P)[0];
            this.parusSvg = this.loadTrailsBusiness(P)[1];
            this.parusSvgStroke = this.loadTrailsBusiness(P)[2];
            
            this.archeologyBusiness = this.loadTrailsBusiness(A)[0];
            this.archeologySvg = this.loadTrailsBusiness(A)[1];
            this.archeologySvgStroke = this.loadTrailsBusiness(A)[2];
        
            this.lowerEmeraldBusiness = this.loadTrailsBusiness(LE)[0];
            this.lowerEmeraldSvg = this.loadTrailsBusiness(LE)[1];
            this.lowerEmeraldSvgStroke = this.loadTrailsBusiness(LE)[2];

            this.grottoBusiness = this.loadTrailsBusiness(G)[0];
            this.grottoSvg = this.loadTrailsBusiness(G)[1];
            this.grottoSvgStroke = this.loadTrailsBusiness(G)[2];
            
            // this.weepingRockBusiness = this.loadTrailsBusiness(W)[0];
            // this.weepingRockSvg = this.loadTrailsBusiness(W)[1];
            // this.weepingRockSvgStroke = this.loadTrailsBusiness(W)[2];

            this.riversideBusiness = this.loadTrailsBusiness(R)[0];
            this.riversideSvg = this.loadTrailsBusiness(R)[1];
            this.riversideSvgStroke = this.loadTrailsBusiness(R)[2];
            
            this.watchmanBusiness = this.loadTrailsBusiness(WL)[0];
            this.watchmanSvg = this.loadTrailsBusiness(WL)[1];
            this.watchmanSvgStroke = this.loadTrailsBusiness(WL)[2];

            this.sandBenchBusiness = this.loadTrailsBusiness(SB)[0];
            this.sandBenchSvg = this.loadTrailsBusiness(SB)[1];
            this.sandBenchSvgStroke = this.loadTrailsBusiness(SB)[2];

            this.upperEmeraldBusiness = this.loadTrailsBusiness(UE)[0];
            this.upperEmeraldSvg = this.loadTrailsBusiness(UE)[1];
            this.upperEmeraldSvgStroke = this.loadTrailsBusiness(UE)[2];

            this.kayentaBusiness = this.loadTrailsBusiness(K)[0];
            this.kayentaSvg = this.loadTrailsBusiness(K)[1];
            this.kayentaSvgStroke = this.loadTrailsBusiness(K)[2];

            this.canyonOverlookBusiness = this.loadTrailsBusiness(CO)[0];
            this.canyonOverlookSvg = this.loadTrailsBusiness(CO)[1];
            this.canyonOverlookSvgStroke = this.loadTrailsBusiness(CO)[2];

            this.taylorCreekBusiness = this.loadTrailsBusiness(TC)[0];
            this.taylorCreekSvg = this.loadTrailsBusiness(TC)[1];
            this.taylorCreekSvgStroke = this.loadTrailsBusiness(TC)[2];
            
            this.timberCreekBusiness = this.loadTrailsBusiness(TiC)[0];
            this.timberCreekSvg = this.loadTrailsBusiness(TiC)[1];
            this.timberCreekSvgStroke = this.loadTrailsBusiness(TiC)[2];

            this.angelsLandingWestBusiness = this.loadTrailsBusiness(AW)[0];
            this.angelsLandingWestSvg = this.loadTrailsBusiness(AW)[1];
            this.angelsLandingWestSvgStroke = this.loadTrailsBusiness(AW)[2];

            // this.hiddenCanyonBusiness = this.loadTrailsBusiness(HC)[0];
            // this.hiddenCanyonSvg = this.loadTrailsBusiness(HC)[1];
            // this.hiddenCanyonSvgStroke = this.loadTrailsBusiness(HC)[2];

            this.observationPointBusiness = this.loadTrailsBusiness(OP)[0];
            this.observationPointSvg = this.loadTrailsBusiness(OP)[1];
            this.observationPointSvgStroke = this.loadTrailsBusiness(OP)[2];
            
            this.narrowsBusiness = this.loadTrailsBusiness(N)[0];
            this.narrowsSvg = this.loadTrailsBusiness(N)[1];
            this.narrowsSvgStroke = this.loadTrailsBusiness(N)[2];

            this.setStop("parusLine", 8, P);
            this.setStop("archeologyLine", 8, A);
            this.setStop("lowerEmeraldLine", 8, LE);
            this.setStop("grottoLine", 8, G);
            // this.setStop("weepingRockLine", 8, W);
            this.setStop("riversideLine", 8, R);
            this.setStop("watchmanLine", 8, WL);
            this.setStop("sandBenchLine", 8, SB);
            this.setStop("upperEmeraldLine", 8, UE);
            this.setStop("kayentaLine", 8, K);
            this.setStop("canyonOverlookLine", 8, CO);
            this.setStop("taylorCreekLine", 8, TC);
            this.setStop("timberCreekLine", 8, TiC);
            this.setStop("angelsLandingWestLine", 8, AW);
            // this.setStop("hiddenCanyonLine", 8, HC);
            this.setStop("observationPointLine", 8, OP);
            this.setStop("narrowsLine", 8, N);

            let date = new Date();
            let TOD = 'AM';
            let hours = date.getHours();
            if(hours>=12){
                TOD = 'PM';
                if(hours>=13){
                    hours -= 12;
                }
            }
            if(hours==0){
                hours=12;
            }
            let minutes = date.getMinutes();
            if(minutes < 10){
                minutes = "0" + minutes.toString();
            }

            this.trailsLastUpdate = hours.toString() + ":" + minutes.toString() + " " + TOD;
        },
        loadTrailsBusiness: function(trail){
            if (isNaN(trail)){
                return ['Closed', 'fill: #B5B5B5', '#B5B5B5'];
            }else if(trail < 0.33){
                return ['Not too busy', 'fill: #749D4C', '#749D4C'];
            }else if(trail < 0.66){
                return ['A little busy', 'fill: #FFCD31', '#FFCD31'];
            }else{
                return ['As busy as it gets', 'fill: #EF6A6E', '#EF6A6E'];
            }
        },
        swipe: function(dir){
            if (dir == "Left"){
                this.showSlides(this.slideIndex -= 1);
            }
        },
        zionTabClicked: function(){
            this.zionCanyon_selected = true;
            this.springdale_selected = false;
        },
        springdaleTabClicked: function(){
            this.zionCanyon_selected = false;
            this.springdale_selected = true;
        },
    }
});

