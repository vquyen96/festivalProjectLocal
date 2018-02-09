// var URL = 'https://festival-number1.appspot.com';
var URL = 'http://localhost:3000';
var app = angular.module("myApp", ["ngRoute"]);
app.controller('ctrlHead', function($scope, $http){
    var ownerId = localStorage.getItem("ownerId");
    var tokenKey = localStorage.getItem("tokenKey");
    var level = localStorage.getItem("level");
    if (tokenKey != null && ownerId != null) {
        $http({
            method : "GET",
            url : URL+"/api/users/" + ownerId,
            headers: {
                "Authorization": tokenKey
            }
        }).then(function mySuccess(response) {
            console.log(response);
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
            console.log(response);
            if (response.data != null && response.data != undefined && response.data != '') {
                $scope.avaUrl = response.data.avaUrl;
                $scope.loggedInUsername = response.data.username;
                localStorage.setItem("ownerName", response.data.username);
                localStorage.setItem("ownerUrl", response.data.avaUrl);
                $scope.isLoggedIn = true;
            }
            else{
                alert('Bạn chưa đăng nhập');
                localStorage.removeItem("ownerId");
                localStorage.removeItem("tokenKey");
                localStorage.removeItem("level"); 
            }
            
        }, function myError(response) {
            $scope.isLoggedIn = false;
            console.log(response);
            alert(response.data);
        });

    }
    $scope.btnLogOut = function(){
        localStorage.removeItem("ownerId");
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("level");
        window.location.href = "index.html";
    }
    
    $scope.btnHeaderBar = function(){
        $('nav').slideToggle();
    }
    $scope.btnHeadSearch = function(){
        localStorage.setItem("find", $scope.searchTitle);
        window.location.href = "index.html#!/search";
    }
    var body = $("html, body");
        body.stop().animate({scrollTop:0}, 500, 'swing', function() { 
       
    });
});
app.controller('ctrlbtnCart', function($scope, $http){
    var ownerId = localStorage.getItem("ownerId");
    var level = localStorage.getItem("level");
    //phan quyen` admin
    if (level == 2|| level == 3) {
        $('#btnChangeAdminimg').attr('src','imgs/logochange.png');
        $('.countCart').attr('style','display:none;');
        localStorage.removeItem("cart");
    }
    //phan quyen user
    else{
        $('#btnChangeAdminimg').attr('src','imgs/ticket4.png');
        //lấy đơn hàng
        var cart = localStorage.getItem('cart');
        //nếu đơn hàng tồn tại
        if (cart != null && cart != undefined && ownerId != null && ownerId != undefined ) {
            //chuyển sang json
            cart = JSON.parse(cart);
            //set giá trị
            if(cart.products.length == 0){
                $('.countCart').attr('style','display:none;');
            }
            else{
                $('.countCart').text(cart.products.length);
            }
            
        } 
        else{
            $('.countCart').attr('style','display:none;');
        }
    }
    //Khi click nut cart = changeadmin
    $scope.hoverfb = function(){
        
    }
    $scope.outfb = function(){
        
    }
    $scope.btnChangeAdmin = function(){
        if (ownerId != null && ownerId != undefined) {
            if(level == 2|| level == 3){
                window.location.href = "admin/indexad.html";
            }
            else{
                window.location.href = "index.html#!/cart"; 
            }
        }
        else{
            alert('Bạn phải đăng nhập để mua hàng');
        }
    }
});
app.controller('ctrlNav', function($scope, $http){
    $scope.menuSearch = function(val){
        localStorage.setItem("find", val);
        window.open('index.html#!/search');
    }
    
    $scope.navItemDrop1 = function(){
        $('.navDrop1').slideToggle("slow");
    }
    $scope.navItemDrop2 = function(){
        $('.navDrop2').slideToggle("slow");
    }
});
app.controller('ctrlFooter', function($scope, $http){

});
app.controller('ctrlMain', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },500);
        
    // });
    // $scope.timeNow = new Date();
    // console.log($scope.timeNow);
    $scope.perPage = 10;
    $scope.currentPage = 1;
    function getListLeHoi(){
        $http({
            method : "GET",
            url : URL+"/api/festivals",
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.listData = response.data;
            $scope.totalItems  = response.data.length;
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    getListLeHoi();
    setInterval(function() { 
        $('.mainSlide2').fadeIn(1000);
        setTimeout(function(){
            $('.mainSlide2').fadeOut(1000);
        }, 4000);
        setTimeout(function(){
            $('.mainSlide3').fadeIn(1000);
        }, 4000);
        setTimeout(function(){
            $('.mainSlide3').fadeOut(1000);
        }, 9000);
    },  12000);

    setInterval(function() { 
        $('.mainSlide5').fadeIn(1000);
        setTimeout(function(){
            $('.mainSlide5').fadeOut(1000);
        }, 3000);
        setTimeout(function(){
            $('.mainSlide6').fadeIn(1000);
        }, 3000);
        setTimeout(function(){
            $('.mainSlide6').fadeOut(1000);
        }, 6000);
    },  8000);

    setInterval(function() { 
        $('.mainSlide8').fadeIn(1000);
        setTimeout(function(){
            $('.mainSlide8').fadeOut(1000);
        }, 5000);
        setTimeout(function(){
            $('.mainSlide9').fadeIn(1000);
        }, 5000);
        setTimeout(function(){
            $('.mainSlide9').fadeOut(1000);
        }, 10000);
    },  15000);

    
    $scope.detailPage = function(_id){
        localStorage.setItem("lehoiID", _id);
        window.location.href = "index.html#!/detail";
    }
});
app.controller('ctrlDetail', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },500);
        
    // });
    var idLeHoi = localStorage.getItem("lehoiID");
    var ownerId = localStorage.getItem("ownerId");
    var level = localStorage.getItem("level");
    function getDetailLeHoi(idLeHoi){
        $http({
            method : "GET",
            url : URL+"/api/festivals/"+idLeHoi,
        }).then(function mySuccess(response) {
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
            console.log(response);
            $scope.data = response.data;
            $scope.url4 = response.data.url4;
            $scope.url5 = response.data.url5;
            $scope.url6 = response.data.url6;
            $scope.url3 = response.data.url3;
            localStorage.setItem("kinhdo", response.data.kinhdo);
            localStorage.setItem("vido", response.data.vido);
            localStorage.setItem("lehoiName", response.data.nameLeHoi);
            if (response.data.tongiao == 'Không') {
                localStorage.setItem("find", response.data.lucdia);
            }
            else{
                localStorage.setItem("find", response.data.tongiao);
            }
            $scope.timeCome = new Date($scope.data.timeStart) ;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    getDetailLeHoi(idLeHoi);
    $scope.btnAddToCart = function(productId, productName, productPrice, quantity, timeCome, timeStart, timeEnd){
        console.log(timeCome);
        console.log(timeStart);
        console.log(timeEnd);
        if (timeCome  != null && timeCome != undefined) {
            var timeCome = timeCome.getTime();
            var timeStart = new Date(timeStart).getTime();
            var timeEnd = new Date(timeEnd).getTime();
            if (timeCome >= timeStart && timeCome <= timeEnd) {
                timeCome = new Date(timeCome);
                if (ownerId != null && ownerId != undefined) {
                    if(level == 1){
                        var cart = localStorage.getItem('cart');    
                        if (cart == null){
                            // Nếu chưa thì tạo mới giỏ hàng với products là danh sách các sản phẩm
                            // kèm số lượng.
                            if(quantity > 0){
                                cart = {
                                    'products': [
                                        {
                                            'id': productId,
                                            'name': productName,
                                            'time': timeCome,
                                            'price': productPrice,
                                            'quantity': quantity
                                        }
                                    ]
                                }   
                            }                       
                        } else{
                            // Nếu đã tồn tại sản phẩm.
                            // Parse thông tin giỏ hàng về json object.
                            cart = JSON.parse(cart);
                            // Kiểm tra sự tồn tại của trường products trong giỏ hàng.
                            if(cart.products != undefined && cart.products != null){
                                // Kiểm tra sự tồn tại của sản phầm trong giỏ hàng.
                                var existsItem = false;
                                for (var i = 0; i < cart.products.length; i++) {
                                    // Nếu tồn tại sản phẩm.
                                    if(cart.products[i].id == productId){
                                        existsItem = true;
                                        // tăng số lượng sản phẩm trong giỏ hàng lên 1.
                                        if(quantity == 1){
                                            cart.products[i].quantity += quantity;
                                        }
                                        else{
                                            cart.products[i].quantity = quantity;
                                        }
                                        quantity = cart.products[i].quantity;
                                        if(quantity <= 0){
                                            // Xoá bỏ sản phẩm khỏi giỏ hàng trong trường hợp số lượng nhỏ hơn 0.
                                            cart.products.splice(i, 1);
                                        }
                                        break;
                                    }
                                }
                                // Nếu không tồn tại sản phẩm trong giỏ hàng.
                                if(!existsItem){
                                    // Thêm mới sản phẩm với quantity default là 1.
                                    cart.products.push({
                                        'id': productId,
                                        'quantity': quantity,
                                        'name': productName,
                                        'time': timeCome,
                                        'price': productPrice,
                                        'totalItemPrice': 0
                                    });
                                }                   
                            }                               
                        }
                        // alert('Đặt vé' + productName + ' vào giỏ hàng thành công. Số lượng ' + quantity);
                        // Lưu lại thông tin giỏ hàng vào localStorage.
                        localStorage.setItem('cart', JSON.stringify(cart));
                        setTimeout(function(){ 
                            $('#modal-video').modal();
                        }, 300);
                    }
                    else{
                        alert('Bạn không có quyền mua vé! Đề nghị đăng nhập bằng tài khoản khác');
                    }
                    
                }
                else{
                    var r = confirm("Bạn có muốn đăng nhập để  đặt vé");
                    if (r == true){
                        window.location.href = "../login.html";
                    }
                    
                }
            }
            else{
                alert('Thời gian bạn nhập không diễn ra lế hội');
            }
        }
        else{
            alert('Bạn phải điền thời gian sẽ tham gia lễ hội')
        }
    }
    $scope.detailOffModal = function(){
        $('#modal-video').modal('hide');
    }
    $scope.detailbtnCart = function(){
        $('#modal-video').modal('hide');
        window.location.href = "index.html#!/cart";

    }
    // var doc = new jsPDF();
    // var specialElementHandlers = {
    //     '#editor': function (element, renderer) {
    //         return true;
    //     }
    // };

    // $scope.detailDowload=function () {   
    //     doc.fromHTML($('#detailcontent').html(), 15, 15, {
    //         'width': 170,
    //             'elementHandlers': specialElementHandlers
    //     });
    //     doc.save('festivals.pdf');
    // };
    

    function initMap() {
        var vido = localStorage.getItem("vido");
        var vido1 = parseFloat(vido);
        var kinhdo = localStorage.getItem("kinhdo");
        var kinhdo1 = parseFloat(kinhdo);
        var uluru = {lat: kinhdo1, lng: vido1};
        console.log(uluru);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
    setTimeout(function(){ 
        initMap();
    }, 2000);
    setTimeout(function(){ 
        $scope.searchTitle = localStorage.getItem("find");
        $scope.perPageR = 100;
        $scope.currentPageR = 1;
        $http({
            method : "GET",
            url : URL+"/api/festivals",
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.listDataRight = response.data;
            $scope.totalItemsR  = response.data.length;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }, 2000);
    $scope.btnDetail = function(_id){
        localStorage.setItem("lehoiID", _id);
        window.open('index.html#!/detail');
    }
       
});
app.controller('ctrlSearch', function($scope, $http){
    $scope.searchTitle = localStorage.getItem("find");
    $scope.perPageR = 10;
    $scope.currentPageR = 1;
    $http({
        method : "GET",
        url : URL+"/api/festivals",
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.listDataRight = response.data;
        $scope.totalItemsR  = response.data.length;
    }, function myError(response) {
        console.log(response.statusText);
    });
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    function search(){

    }
    
    $scope.currentPageL = 1;
    $http({
        method : "GET",
        url : URL+"/api/festivals",
    }).then(function mySuccess(response) {
        setTimeout(function(){
            $(".detailLoad").fadeOut("slow");
        },500);
        console.log(response);
        $scope.listDataLeft = response.data;
        $scope.totalItemsL  = response.data.length;
        $scope.perPageL = response.data.length
    }, function myError(response) {
        console.log(response.statusText);
    });
    $scope.btnDetail = function(_id){
        localStorage.setItem("lehoiID", _id);
        window.location.href = "index.html#!/detail";
    }
});
app.controller('ctrlAbout', function($scope, $http){
    function initMap() {
      var uluru = {lat: 21.028843, lng: 105.782392};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
    initMap();
});

app.controller('ctrlMedia', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },1000);
        
    // });
    $scope.perPage = 10;
    $scope.currentPage = 1;
    function getListLeHoi(){
        $http({
            method : "GET",
            url : URL+"/api/festivals",
        }).then(function mySuccess(response) {
            console.log(response);
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
            $scope.listData = response.data;
            $scope.totalItems  = response.data.length;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    getListLeHoi();
    var videoFrame = document.getElementById("video-frame");
    $scope.showVideo = function(videoId, nameLeHoi, _id){
        localStorage.setItem("lehoiID", _id);
        $('#nameLeHoi').text(nameLeHoi);
        videoFrame.src = videoId;
        setTimeout(function(){ 
            $('#modal-video').modal();
        }, 300);
        
    }
    $scope.mediaBtnDetail = function(){
        $('#modal-video').modal('hide')
        window.location.href = "index.html#!/detail";
    }
});
app.controller('ctrlContact', function($scope, $http){
    var ownerId = localStorage.getItem("ownerId");
    var ownerName = localStorage.getItem("ownerName");
    var level = localStorage.getItem("level");
    function getContact(){
        $http({
            method : "GET",
            url : URL+"/api/contact",
        }).then(function mySuccess(response) {
            $scope.contact = response.data;
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
        }, function myError(response) {
            alert(response.data);
        });
    }
    getContact();
    $scope.btnFeedback = function(){
        if (ownerId != null && ownerId != undefined ) {
            if(level == 1){
                $scope.data.userID = ownerId;
                $http({
                    method : "POST",
                    url : URL+"/api/feedback",
                    data: $scope.data
                }).then(function mySuccess(response) {
                    alert("Cảm ơn bạn đã đóng góp ý kiến !!!");
                    console.log(response);
                    window.location.href = "index.html";
                }, function myError(response) {
                    alert(response.data);
                });
            }
            else{
                alert('Bạn không phải người dùng bình thường');
            }
        }
        else{
            var r = confirm("Bạn có muốn đăng nhập để  góp ý");
            if (r == true){
                window.location.href = "login.html";
            }
        }
    }
});


/*code api hanh*/
app.controller('ctrlAccountCenter' , function($scope, $http){
    var ownerId = localStorage.getItem('ownerId');
    var tokenKey = localStorage.getItem("tokenKey");
    var level = localStorage.getItem("level");
    $http({
        method : "GET",
        url : URL+"/api/users/"+ownerId,
        headers: {
            "Authorization": tokenKey
        }
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.user = response.data;
        $scope.user.birthday = new Date(response.data.birthday) ;
        setTimeout(function(){
            $(".detailLoad").fadeOut("slow");
        },500);
    }, function myError(response) {
        alert(response.data);
    });

    $scope.Siin = [];
    $scope.file_changed = function(element) {
        $scope.userAlertBtn = false;
        var files = element.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            var data = new FormData();
            data.append('file', file);
            reader.onload = function (e) {
                $scope.$apply(function() {
                    $scope.Siin.push(e.target.result);
                });
            }
            $http({
                method : "POST",
                url : "https://festival-number1.appspot.com/_api/v1/images",
                data: data,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function success(response) {
                localStorage.setItem('avaUrl', response.data);
                console.log(response.data);
                $scope.userAlertBtn = true;
            }, function error(response) {
                console.log('Lỗi');
            });
            reader.readAsDataURL(file);
        }
    };
    $scope.btnChange = function(){
        var avaUrl = localStorage.getItem('avaUrl');
        if(avaUrl != null && avaUrl != undefined){
            $scope.user.avaUrl = avaUrl;
        }
            
        var day = $scope.user.birthday.getTime();
        var today = new Date();
            today=today.getTime();
        if(today>day){
            $http({
                method : "PUT",
                url : URL+"/api/users/"+ownerId,
                data: $scope.user
            }).then(function mySuccess(response) {
                console.log(response);
                alert("Thông Tin tài khoản được thay đổi thành công !");
                window.location.href = 'index.html';
            }, function myError(response) {
                alert("Có Lỗi");
            });  
        }
        else{
            alert("Bạn không được chọn ngày tương lai !");
        }
        console.log($scope.data);
    }
    function history(){
        var historyArray = [];
        $http({
            method : "GET",
            url : URL+"/api/order/"+ownerId,
        }).then(function mySuccess(response) {
            console.log(response);
            for(var i = 0 ; i< response.data.length ; i++){
                $http({
                    method : "GET",
                    url : URL+"/api/orderdetail/"+response.data[i]._id,
                }).then(function mySuccess(response) {
                    console.log(response);
                    for(var j = 0 ; j< response.data.length ; j++){
                            historyArray.push(response.data[j]);
                    }
                }, function myError(response) {
                    alert(response.data);
                });
            }
            console.log(historyArray);  
            $scope.history = historyArray;
        }, function myError(response) {
            alert('Lỗi tải lịch sử');
        });
    }
    if(level == 1){
        history();
        $scope.acHistory = true;
    }else{
        $scope.acHistory = false;
    }
    
});
/*code api hanh*/

app.controller('ctrlCart', function($scope, $http){
    $scope.btnInfoPay = function(){
        var disBtn = localStorage.getItem('disBtn');
        if (disBtn == "none") {
            alert('Bạn không thể tham gia 2 lễ hội cùng lúc');
        }
        else{
            $('.cartInfoPay').slideToggle();
        }
        
    }
    function loadCart(){
        var cart = localStorage.getItem('cart');
        // Kiểm tra sự tồn tại của giỏ hàng.            
        if (cart == null){
            alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
            window.location.href = "index.html";
            return;
        }
        // Parse thông tin giỏ hàng.
        cart = JSON.parse(cart);
        // Kiểm tra thông tin sản phẩm trong giỏ hàng.
        if(cart.products == undefined || cart.products == null){
            alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
            window.location.href = "index.html";
            return;
        }
        var totalPrice = 0;
        for(var i = 0; i < cart.products.length; i++){
            cart.products[i].totalItemPrice =  cart.products[i].quantity * cart.products[i].price;
            totalPrice += cart.products[i].totalItemPrice;
            for(var j = i+1 ; j < cart.products.length; j++ ){
                console.log(i);
                console.log(j);
                console.log(cart.products[i].time);
                console.log(cart.products[j].time);
                var d1 = new Date(cart.products[i].time).getTime();
                var d2 = new Date(cart.products[j].time).getTime();
                if (d1 < (d2+ 86400000) && d1 > (d2- 86400000 )) {
                    angular.element(document).ready(function () {
                        setTimeout(function(){
                            alert('Bạn đang tham gia 2 lễ hội cùng 1 lúc');
                        },1000);
                    });
                    localStorage.setItem('disBtn', 'none');    
                }
                else{
                    localStorage.removeItem("disBtn");
                }
                
            }
        }
        $('.CartTotalPrice').html(totalPrice+' <b>VND</b>');
        // alert('Tổng giá tiền: '+ totalPrice);
        $scope.listData = cart.products;
        if(cart.products.length == 0){
            alert('Hiện tại chưa có sản phẩm trong giỏ hàng.');
            window.location.href = "index.html";
        }
    }
    loadCart();


    $scope.btnAddToCart = function(productId, productName, productPrice, quantity ,timeCome){
        var cart = localStorage.getItem('cart');    
        if (cart == null){
            // Nếu chưa thì tạo mới giỏ hàng với products là danh sách các sản phẩm
            // kèm số lượng.
            if(quantity > 0){
                cart = {
                    'products': [
                        {
                            'id': productId,
                            'name': productName,
                            'time': timeCome,
                            'price': productPrice,
                            'quantity': quantity
                        }
                    ]
                }   
            }                       
        } else{
            // Nếu đã tồn tại sản phẩm.
            // Parse thông tin giỏ hàng về json object.
            cart = JSON.parse(cart);
            // Kiểm tra sự tồn tại của trường products trong giỏ hàng.
            if(cart.products != undefined && cart.products != null){
                // Kiểm tra sự tồn tại của sản phầm trong giỏ hàng.
                var existsItem = false;
                for (var i = 0; i < cart.products.length; i++) {
                    // Nếu tồn tại sản phẩm.
                    if(cart.products[i].id == productId){
                        existsItem = true;
                        // tăng số lượng sản phẩm trong giỏ hàng lên 1.
                        if(quantity == 1 || quantity == -1 ){
                            cart.products[i].quantity += quantity;
                        }
                        else{
                            cart.products[i].quantity = quantity;
                        }
                        quantity = cart.products[i].quantity;
                        if(quantity <= 0){
                            // Xoá bỏ sản phẩm khỏi giỏ hàng trong trường hợp số lượng nhỏ hơn 0.
                            cart.products.splice(i, 1);
                        }
                        break;
                    }
                }
                // Nếu không tồn tại sản phẩm trong giỏ hàng.
                if(!existsItem){
                    // Thêm mới sản phẩm với quantity default là 1.
                    cart.products.push({
                        'id': productId,
                        'quantity': quantity,
                        'name': productName,
                        'time': timeCome,
                        'price': productPrice,
                        'totalItemPrice': 0
                    });
                }                   
            }                               
        }
        alert('Đặt vé' + productName + ' vào giỏ hàng thành công. Số lượng ' + quantity);
        // Lưu lại thông tin giỏ hàng vào localStorage.

        localStorage.setItem('cart', JSON.stringify(cart));

        console.log(cart);
        loadCart();
    }

    // var ownerId = localStorage.getItem("ownerId");
    // var tokenKey = localStorage.getItem("tokenKey");
    // if (tokenKey != null && ownerId != null) {
    //     $http({
    //         method : "GET",
    //         url : URL+"/api/users/" + ownerId,
    //         headers: {
    //             "Authorization": tokenKey
    //         }
    //     }).then(function mySuccess(response) {
    //         console.log(response);
    //         $scope.infousername=response.data.username;
    //         $scope.infoemail=response.data.email;
    //     }, function myError(response) {
    //         console.log(response);
    //     });

    // }

    $scope.btnPay = function(){
        var ownerId = localStorage.getItem("ownerId");
        var cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        
        var arrayProducts = [];
        for (var i = 0; i < cart.products.length; i++) {
            var product = {
                'id': cart.products[i].id,
                'quantity': cart.products[i].quantity,
                'time': cart.products[i].time              
            };
            arrayProducts.push(product);
        }

        var data = {
            'products': JSON.stringify(arrayProducts),
            'info': {
                'fullname':$scope.fullname ,
                'email':$scope.email,
                'phone':$scope.phone,
                'city':$scope.city,
                'adress':$scope.adress
            }
        }   

        console.log(data);
        $http({
            method : "POST",
            url : URL+"/api/cart/"+ownerId,
            data: data
        }).then(function mySuccess(response) {
            console.log(response);
            localStorage.removeItem("cart");
            setTimeout(function(){ 
                $('#modal-video').modal();
            }, 300);
            setTimeout(function(){ 
                window.location.href = "index.html";
            }, 5000);
        }, function myError(response) {
            console.log(response);
        });

    }
});


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "chucnangclient/main.html"
    })
    .when("/detail", {
        templateUrl : "chucnangclient/detail.html"
    })
    .when("/media", {
        templateUrl : "chucnangclient/media.html"
    })
    .when("/about", {
        templateUrl : "chucnangclient/about.html"
    })
    .when("/contact", {
        templateUrl : "chucnangclient/contact.html"
    })
    .when("/login", {
        templateUrl : "chucnangclient/login.html"
    })
    .when("/register", {
        templateUrl : "chucnangclient/register.html"
    })
    .when("/search", {
        templateUrl : "chucnangclient/search.html"
    })
    .when("/chinhsachvanchuyen", {
        templateUrl : "chucnangclient/chinhsachvanchuyen.html"
    })
    .when("/chinhsachthanhtoan", {
        templateUrl : "chucnangclient/chinhsachthanhtoan.html"
    })
    .when("/chinhsachbaomat", {
        templateUrl : "chucnangclient/chinhsachbaomat.html"
    })
    .when("/chinhsachdoitra", {
        templateUrl : "chucnangclient/chinhsachdoitra.html"
    })
    .when("/huongdanmuave", {
        templateUrl : "chucnangclient/huongdanmuave.html"
    })
    .when("/huongdanthanhtoan", {
        templateUrl : "chucnangclient/huongdanthanhtoan.html"
    })
    .when("/huongdandoitra", {
        templateUrl : "chucnangclient/huongdandoitra.html"
    })
    .when("/profile", {
        templateUrl : "chucnangclient/accoutcenter.html"
    }) 
    .when("/cart", {
        templateUrl : "chucnangclient/cart.html"
    })    
});
// AIzaSyDTUdSTKgfHqp4a0WOAY5JuBmkgl2obY5o 
