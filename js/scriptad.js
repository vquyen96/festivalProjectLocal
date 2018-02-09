// var URL = 'https://festival-number1.appspot.com';
var URL = 'http://localhost:3000';
var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);
app.controller('ctrlMenu', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },500);
        
    // });
    var ownerId = localStorage.getItem("ownerId");
    var tokenKey = localStorage.getItem("tokenKey");
    var level = localStorage.getItem("level");
    if(ownerId != null && tokenKey != null && level != 1){
        $http({
            method : "GET",
            url : URL+"/api/users/"+ownerId,
            headers: {
                "Authorization": tokenKey
            }
        }).then(function mySuccess(response) {

            console.log(response);
            if (response.data != null && response.data != undefined && response.data != '') {
                $scope.user = response.data;
                setTimeout(function(){
                    $(".detailLoad").fadeOut("slow");
                },500);
            }
            else{
                alert('Bạn chưa đăng nhập');
                localStorage.removeItem("ownerId");
                localStorage.removeItem("tokenKey");
                localStorage.removeItem("level"); 
                window.location.href = "../index.html";
            }
        }, function myError(response) {
            console.log(response);
            alert("Lỗi tải tài khoản");
            window.location.href = "../index.html";
        });
    }
    else{
        alert('Bạn không có quyền vào đây');
        window.location.href = "../index.html";
    }
    $scope.headListUser = function(){
        window.location.href = "indexad.html";
        
    }
    $scope.headListCate = function(){
        window.location.href = "indexad.html#!/listDanhmuc";
        
    }
    $scope.headListFes = function(){
        window.location.href = "indexad.html#!/listLeHoi";
        
    }
    $scope.headListOrder = function(){
        window.location.href = "indexad.html#!/listOrder";
        
    }
     $scope.headListFeB = function(){
        window.location.href = "indexad.html#!/listFeedBack";
        
    }
    $scope.headListCont = function(){
        window.location.href = "indexad.html#!/contact";
    }
    $scope.btnFontEnd = function(){
        window.location.href = "../index.html";
    }
    $scope.logOut = function(){
        localStorage.removeItem("ownerId");
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("level");
        window.location.href = "../index.html";
    }
    $scope.btnHeaderBar = function(){
        $('.dropmenu').slideToggle();
    }
    $scope.btnEdit = function(id){
        localStorage.setItem("editId", id);
        localStorage.setItem("type", 'edit');
       
        window.location.href = "indexad.html#!/addUser";
    }
});
app.controller('ctrlListUser', function($scope, $http){
    
    var ownerId = localStorage.getItem("ownerId");
    $scope.level = localStorage.getItem("level");
    $scope.perPage = 8;
    $scope.currentPage = 1;
    var tokenKey = localStorage.getItem("tokenKey");
    getList();
    function getList(){
        $http({
            method : "GET",
            url : URL+"/api/users",
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.totalItems  = response.data.length;
            $scope.listUser = response.data;
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.btnSortName = function(currentPage){
        $scope.listUserSort = 'username';
    }
    $scope.btnSortEmail = function(currentPage){
        $scope.listUserSort = 'email';
    }
    $scope.btnSortLevel = function(currentPage){
        $scope.listUserSort = 'level';
    }
    $scope.btnSortBirthDay = function(currentPage){
        $scope.listUserSort = 'birthday';
    }
    $scope.btnAddUser = function(){
        localStorage.setItem("type", "add");
        window.location.href = "indexad.html#!/addUser";
    }
    $scope.btnUserSearch = function(){
        if($scope.userSearch != null && $scope.userSearch != undefined && $scope.userSearch != ''){
            $scope.perPage = $scope.totalItems;
        }
        else{
            alert('Không có gì để tìm kiếm');
        }
        
    }    
    $scope.btnEdit = function(id){
        localStorage.setItem("editId", id);
        localStorage.setItem("type", 'edit');
        window.location.href = "indexad.html#!/addUser";
    }
    $scope.btnDelete = function(id ,name){
        if(id == ownerId){
            alert('Bạn không được phép xóa chính mình');
        }
        else{
            var r = confirm("Bạn chắc chắn muốn xóa thành viên" +  name);
            if (r == true) {
                $http({
                    method : "DELETE",
                    url : URL+"/api/users/"+id,
                }).then(function mySuccess(response) {
                    console.log(response);
                    window.location.href = "indexad.html";
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }
        }
        
    }

});
app.controller('ctrlAddUser', function($scope, $http){
    //lấy dữ liệu từ hidden input
    var typeAdd = localStorage.getItem("type");
    var editID = localStorage.getItem("editId");
    var tokenKey = localStorage.getItem("tokenKey");
    $scope.level = localStorage.getItem("level");
    $scope.userAlertBtn = true;
    //nếu hidden input đúng dữ liệu
    
    if (typeAdd == 'edit') {
        //điền dữ liệu vào input
        function getDetail(){
            $http({
                method : "GET",
                url : URL+"/api/users/"+editID,
                headers: {
                    "Authorization": tokenKey
                }
            }).then(function mySuccess(response) {
                console.log(response);
                setTimeout(function(){
                    $(".detailLoad").fadeOut("slow");
                },500);
                $scope.user = response.data;
                $scope.user.birthday = new Date(response.data.birthday) ;
                $scope.user.password = "";
                $('#level').val(response.data.level);
                // $('#avaUrl').val(response.data.avaUrl);
                $('#btnSbm').val('Sửa Lại');
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
        getDetail();

        
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
        $scope.btnAdd = function() {
            var avaUrl = localStorage.getItem('avaUrl');
            if(avaUrl != null && avaUrl != undefined){
                $scope.user.avaUrl = avaUrl;
            }

            console.log($scope.user);
            $http({
                method : "PUT",
                url : URL+"/api/users/"+editID,
                data : $scope.user
            }).then(function mySuccess(response) {
                console.log(response);
                //Thông báo khi thành công
                $('.alert-success').text('Thành Công');
                $('.alert-success').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-success').attr('style','display : none');
                },3000);
                alert('Sửa Thành Công');
                window.location.href = "indexad.html";
                // window.location.href = "../index.html";
                //Xóa các trường input khi thành công
            }, function myError(response) {
                console.log(response);
                //Thông báo khi có lỗi                      
                alert('Lỗi');
            });
        };
        getDetail();
    }
    else{
        setTimeout(function(){
            $(".detailLoad").fadeOut("slow");
        },500);
        $scope.user = {
            level: '1'
        };
        
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
        $scope.btnAdd = function() {
            var avaUrl = localStorage.getItem('avaUrl');
            if(avaUrl != null && avaUrl != undefined){
                $scope.user.avaUrl = avaUrl;
            }
            
            console.log($scope.user);
            var day = $scope.user.birthday.getTime();
            var today = new Date();
            today=today.getTime();
            if(today>day){
                  $http({
                    method : "POST",
                    url : URL+"/api/users",
                    data : $scope.user
                }).then(function mySuccess(response) {
                    console.log(response);
                    //Thông báo khi thành công
                    $('.alert-success').text('Thành Công');
                    $('.alert-success').attr('style','display : inline-block');
                    //Xóa thông báo sau 3s
                    setTimeout(function(){
                        $('.alert-success').attr('style','display : none');
                    },3000);
                    //Xóa các trường input khi thành công
                    $scope.user = "";
                    alert('Thêm tài khoản Thành Công');
                    window.location.href = "indexad.html";
                }, function myError(response) {
                    console.log(response);
                    alert('Lỗi');
                });     
 
            }
            else{
                alert("Bạn không được chon ngày tương lai !");
            }   

        };
    }
       
});

app.controller('ctrlListDanhmuc', function($scope, $http){
    angular.element(document).ready(function () {
        setTimeout(function(){
            $(".detailLoad").fadeOut("slow");
        },500);
        
    });
    function getListLucdia(){
        $http({
            method : "GET",
            url : URL+"/api/lucdia",
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.listLucDia = response.data;
            
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    getListLucdia();
    $scope.btnAddLucDia = function(){
        $('#userid').attr('name','add');
        window.location.href = "indexad.html#!/addLucDia";
    }    
    $scope.btnEditLucDia = function(id){
        $('#userid').attr('value',id);
        $('#userid').attr('name','edit');
        window.location.href = "indexad.html#!/addLucDia";
    }
    $scope.btnDeleteLucDia = function(id ,name){
        var r = confirm("Bạn chắc chắn muốn xóa Lục Địa : " +  name);
        if (r == true) {
            $http({
                method : "DELETE",
                url : URL+"/api/lucdia/"+id,
            }).then(function mySuccess(response) {
                
                getListLucdia();
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
    }
    
    function getListTongiao(){
        $http({
            method : "GET",
            url : URL+"/api/tongiao",
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.listTonGiao = response.data;
            
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    getListTongiao();
    $scope.btnAddTonGiao= function(){
        $('#userid').attr('name','add');
        window.location.href = "indexad.html#!/addTonGiao";
    }    
    $scope.btnEditTonGiao = function(id){
        $('#userid').attr('value',id);
        $('#userid').attr('name','edit');
        window.location.href = "indexad.html#!/addTonGiao";
    }
    $scope.btnDeleteTonGiao = function(id ,name){
        var r = confirm("Bạn chắc chắn muốn xóa Tôn Giáo : " +  name);
        if (r == true) {
            $http({
                method : "DELETE",
                url : URL+"/api/tongiao/"+id,
            }).then(function mySuccess(response) {
                
                getListTongiao();
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
    }
});

app.controller('ctrlAddLucDia', function($scope, $http){
    //lấy dữ liệu từ hidden input
    var typeAdd = $('#userid').attr('name');
    var editID = $('#userid').val();
    //nếu hidden input đúng dữ liệu
    if (typeAdd == 'edit') {
        //điền dữ liệu vào input
        function getDetail(){
            $http({
                method : "GET",
                url : URL+"/api/lucdia/"+editID,
            }).then(function mySuccess(response) {
                $scope.data = response.data;
                $('#btnSbm').val('Sửa Lại');
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
        getDetail();
        //Khi click nút sửa
        $scope.btnAdd = function() {
            $scope.data = {
                "nameLucDia": $('#nameLucDia').val()
            };
            
            $http({
                method : "PUT",
                url : URL+"/api/lucdia/"+editID,
                data : $scope.data
            }).then(function mySuccess(response) {
                
                //Thông báo khi thành công
                $('.alert-success').text('Thành Công');
                $('.alert-success').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-success').attr('style','display : none');
                },3000);
                //Xóa các trường input khi thành công
            }, function myError(response) {
                console.log(response);
                //Thông báo khi có lỗi                      
                $('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
                $('.alert-danger').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-danger').attr('style','display : none');
                },3000);
            });
        };
        getDetail();
    }
    else{
        $scope.btnAdd = function() {
            $scope.data = {
                "nameLucDia": $('#nameLucDia').val()
            };
            $http({
                method : "POST",
                url : URL+"/api/lucdia",
                data : $scope.data
            }).then(function mySuccess(response) {
                console.log(response);
                //Thông báo khi thành công
                $('.alert-success').text('Thành Công');
                $('.alert-success').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-success').attr('style','display : none');
                },3000);
                //Xóa các trường input khi thành công
                $scope.data.nameLucDia = "";
                
            }, function myError(response) {
                console.log(response);
                //Thông báo khi có lỗi                      
                $('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
                $('.alert-danger').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-danger').attr('style','display : none');
                },3000);
            });

        };
    }
});

app.controller('ctrlAddTonGiao', function($scope, $http){
    //lấy dữ liệu từ hidden input
    var typeAdd = $('#userid').attr('name');
    var editID = $('#userid').val();
    //nếu hidden input đúng dữ liệu
    if (typeAdd == 'edit') {
        //điền dữ liệu vào input
        function getDetail(){
            $http({
                method : "GET",
                url : URL+"/api/tongiao/"+editID,
            }).then(function mySuccess(response) {
                $scope.data = response.data;
                $('#btnSbm').val('Sửa Lại');
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
        getDetail();
        //Khi click nút sửa
        $scope.btnAdd = function() {
            $http({
                method : "PUT",
                url : URL+"/api/tongiao/"+editID,
                data : $scope.data
            }).then(function mySuccess(response) {     
                //Thông báo khi thành công
                $('.alert-success').text('Thành Công');
                $('.alert-success').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-success').attr('style','display : none');
                },3000);
                //Xóa các trường input khi thành công
            }, function myError(response) {
                console.log(response);
                //Thông báo khi có lỗi                      
                $('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
                $('.alert-danger').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-danger').attr('style','display : none');
                },3000);
            });
        };
        getDetail();
    }
    else{
        $scope.btnAdd = function() {
            $scope.data = {
                "nameTonGiao": $('#nameTonGiao').val()
            };
            $http({
                method : "POST",
                url : URL+"/api/tongiao",
                data : $scope.data
            }).then(function mySuccess(response) {
                console.log(response);
                //Thông báo khi thành công
                $('.alert-success').text('Thành Công');
                $('.alert-success').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-success').attr('style','display : none');
                },3000);
                //Xóa các trường input khi thành công
                $scope.data.nameLucDia = "";
                
            }, function myError(response) {
                console.log(response);
                //Thông báo khi có lỗi                      
                $('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
                $('.alert-danger').attr('style','display : inline-block');
                //Xóa thông báo sau 3s
                setTimeout(function(){
                    $('.alert-danger').attr('style','display : none');
                },3000);
            });

        };
    }
});
app.controller('ctrlListLeHoi', function($scope, $http){
    $scope.perPage = 10;
    $scope.currentPage = 1;
    $scope.listLeHoiRun = function(perPage){
        limit = perPage;
        getList('1');
    }
    getList('1');
    function getList(page){
        $http({
            method : "GET",
            url : URL+"/api/festivals",
        }).then(function mySuccess(response) {
            console.log(response);
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
            $scope.listUser = response.data;
            $scope.totalItems  = response.data.length;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    $scope.btnSortName = function(currentPage){
       $scope.listUserSort = 'nameLeHoi';
    }
    $scope.btnSortPlace = function(currentPage){
        $scope.listUserSort = 'diadiem';
    }
    $scope.btnSortLucDia = function(currentPage){
        $scope.listUserSort = 'lucdia';
    }
    $scope.btnSortTonGiao = function(currentPage){
        $scope.listUserSort = 'tongiao';   
    }
    $scope.btnSortTimeStart = function(currentPage){

        $scope.listUserSort = 'timeStart';   
    }
    $scope.setPage = function (pageNo) {
        getList(pageNo);
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.btnFesSearch = function(){
         if($scope.fesSearch != null && $scope.fesSearch != undefined && $scope.fesSearch != ''){
            $scope.perPage = $scope.totalItems;
        }
        else{
            alert('Không có gì để tìm kiếm');
        }
    }
    $scope.btnAddUser = function(){
        localStorage.setItem("type", 'add');
        window.location.href = "indexad.html#!/addLeHoi";
    } 
    $scope.btnEdit = function(id){
        localStorage.setItem("editId", id);
        localStorage.setItem("type", 'edit');
        window.location.href = "indexad.html#!/addLeHoi";
    }   
    $scope.btnDelete = function(id ,name){
        var r = confirm("Bạn chắc chắn muốn xóa Lế Hội " +  name);
        if (r == true) {
            $http({
                method : "DELETE",
                url : URL+"/api/festivals/"+id,
            }).then(function mySuccess(response) {
                
                getList();
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
    }
});
app.controller('ctrlAddLeHoi', function($scope, $http){
    //lấy dữ liệu từ hidden input
    var typeAdd = localStorage.getItem("type");
    var editID = localStorage.getItem("editId");
    $scope.userAlertBtn = true;
    //nếu hidden input đúng dữ liệu
    if (typeAdd == 'edit') {
        //điền dữ liệu vào input
        function getDetail(){
            $http({
                method : "GET",
                url : URL+"/api/festivals/"+editID,
            }).then(function mySuccess(response) {
                console.log(response);
                setTimeout(function(){
                    $(".detailLoad").fadeOut("slow");
                },500);
                $scope.festival = response.data;
                $scope.festival.timeStart = new Date(response.data.timeStart) ;
                $scope.festival.timeEnd = new Date(response.data.timeEnd) ;
                $('#btnSbm').val('Sửa Lại');
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
        getDetail();
        //Khi click nút sửa


        $scope.Siin = [];
        $scope.file_changed1 = function(element) {
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
                    localStorage.setItem('url1', response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed2 = function(element) {
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
                    localStorage.setItem('url2', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed3 = function(element) {
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
                    localStorage.setItem('url3', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed4 = function(element) {
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
                    localStorage.setItem('url4', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed5 = function(element) {
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
                    localStorage.setItem('url5', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed6 = function(element) {
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
                    localStorage.setItem('url6', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        };
        $scope.btnAdd = function() {
            var url1 = localStorage.getItem('url1');
            var url2 = localStorage.getItem('url2');
            var url3 = localStorage.getItem('url3');
            var url4 = localStorage.getItem('url4');
            var url5 = localStorage.getItem('url5');
            var url6 = localStorage.getItem('url6');
            if( url1 != null && url1 != undefined && 
                url2 != null && url2 != undefined && 
                url3 != null && url3 != undefined && 
                url4 != null && url4 != undefined && 
                url5 != null && url5 != undefined && 
                url6 != null && url6 != undefined ){
                $scope.festival.url1 = url1;
                $scope.festival.url2 = url2;
                $scope.festival.url3 = url3;
                $scope.festival.url4 = url4;
                $scope.festival.url5 = url5;
                $scope.festival.url6 = url6;
            }

                

            var daystart = $scope.festival.timeStart.getTime();
            var dayend = $scope.festival.timeEnd.getTime();
            var today = new Date();
            today = today.getTime(); 

            if (daystart > today && daystart<dayend) {
                $http({
                    method : "PUT",
                    url : URL+"/api/festivals/"+editID,
                    data : $scope.festival
                }).then(function mySuccess(response) {
                    
                    //Thông báo khi thành công
                    $('.alert-success').text('Thành Công');
                    $('.alert-success').attr('style','display : inline-block');
                    //Xóa thông báo sau 3s
                    setTimeout(function(){
                        $('.alert-success').attr('style','display : none');
                    },3000);
                    //Xóa các trường input khi thành công
                    
                    localStorage.removeItem("url1");
                    localStorage.removeItem("url2");
                    localStorage.removeItem("url3");
                    localStorage.removeItem("url4");
                    localStorage.removeItem("url5");
                    localStorage.removeItem("url6");
                    alert('Sửa Thành Công');
                    window.location.href = "indexad.html#!/listLeHoi";
                }, function myError(response) {
                    console.log(response);
                    //Thông báo khi có lỗi                      
                    alert("Quá trình sửa bị lỗi");
                    localStorage.removeItem("url1");
                    localStorage.removeItem("url2");
                    localStorage.removeItem("url3");
                    localStorage.removeItem("url4");
                    localStorage.removeItem("url5");
                    localStorage.removeItem("url6");
                    window.location.href = 'indexad.html#!/listLeHoi';
                });
            }
            else{
                alert('Thời gian không hợp lệ');
            }

                
        };
        getDetail();
    }
    else{
        $scope.festival = {
            lucdia : 'Việt Nam',
            tongiao: 'Không'
        };
        setTimeout(function(){
            $(".detailLoad").fadeOut("slow");
        },500);


        $scope.Siin = [];
        $scope.file_changed1 = function(element) {
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
                    localStorage.setItem('url1', response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed2 = function(element) {
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
                    localStorage.setItem('url2', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed3 = function(element) {
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
                    localStorage.setItem('url3', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed4 = function(element) {
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
                    localStorage.setItem('url4', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed5 = function(element) {
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
                    localStorage.setItem('url5', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        
        };
        $scope.Siin = [];
        $scope.file_changed6 = function(element) {
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
                    localStorage.setItem('url6', response.data);
                    console.log(response.data);
                    $scope.userAlertBtn = true;
                }, function error(response) {
                    console.log('Lỗi');
                });
                reader.readAsDataURL(file);
            }
        };


        $scope.btnAdd = function() {
            var url1 = localStorage.getItem('url1');
            var url2 = localStorage.getItem('url2');
            var url3 = localStorage.getItem('url3');
            var url4 = localStorage.getItem('url4');
            var url5 = localStorage.getItem('url5');
            var url6 = localStorage.getItem('url6');
            if( url1 != null && url1 != undefined && 
                url2 != null && url2 != undefined && 
                url3 != null && url3 != undefined && 
                url4 != null && url4 != undefined && 
                url5 != null && url5 != undefined && 
                url6 != null && url6 != undefined ){
                $scope.festival.url1 = url1;
                $scope.festival.url2 = url2;
                $scope.festival.url3 = url3;
                $scope.festival.url4 = url4;
                $scope.festival.url5 = url5;
                $scope.festival.url6 = url6;
            }
            else{
                alert('Bạn không có hoặc không đủ ảnh cho lễ hội');
            }
            var daystart = $scope.festival.timeStart.getTime();
            var dayend = $scope.festival.timeEnd.getTime();
            var today = new Date();
            today = today.getTime(); 

            if (daystart > today && daystart<dayend) {
                $http({
                    method : "POST",
                    url : URL+"/api/festivals",
                    data : $scope.festival
                }).then(function mySuccess(response) {
                    console.log(response);
                    //Thông báo khi thành công
                    $('.alert-success').text('Thành Công');
                    $('.alert-success').attr('style','display : inline-block');
                    //Xóa thông báo sau 3s
                    setTimeout(function(){
                        $('.alert-success').attr('style','display : none');
                    },3000);
                    //Xóa các trường input khi thành công
                    $scope.festival = "";
                    localStorage.removeItem("url1");
                    localStorage.removeItem("url2");
                    localStorage.removeItem("url3");
                    localStorage.removeItem("url4");
                    localStorage.removeItem("url5");
                    localStorage.removeItem("url6");
                    alert('Thêm lễ hội Thành Công');
                    window.location.href = "indexad.html#!/listLeHoi";
                }, function myError(response) {
                    console.log(response);
                    //Thông báo khi có lỗi                      
                    $('.alert-danger').text(response.data);
                    $('.alert-danger').attr('style','display : inline-block');
                    //Xóa thông báo sau 3s
                    setTimeout(function(){
                        $('.alert-danger').attr('style','display : none');
                    },3000);
                    localStorage.removeItem("url1");
                    localStorage.removeItem("url2");
                    localStorage.removeItem("url3");
                    localStorage.removeItem("url4");
                    localStorage.removeItem("url5");
                    localStorage.removeItem("url6");
                    alert('Lỗi');
                });
            }
        else{
            alert("Sự kiện không hợp lệ !");
        }


        };
    }    
});
app.controller('ctrlListFeedBack', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },500);
        
    // });
    $scope.currentPage = 1;
    $scope.perPage = 10;
    getList();
    function getList(){
        
        $http({
            method : "GET",
            url : URL+"/api/feedback",
        }).then(function mySuccess(response) {
            $scope.listFeedBack = response.data;
            $scope.totalItems  = response.data.length;
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
            console.log(response);
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    $scope.btnSortName = function(currentPage){
        $scope.listFeedbackSort = 'username';
    }
    $scope.btnSortEmail = function(currentPage){
        $scope.listFeedbackSort = 'email';
    }
    $scope.btnSortCreatedAt = function(currentPage){
        $scope.listFeedbackSort = 'createdAt';
    }
    $scope.btnSortTitle = function(currentPage){
        $scope.listFeedbackSort = 'title';
    }
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.btnDelFeedBack = function(id, name){
        var r = confirm("Bạn chắc chắn muốn xóa góp ý của " +  name);
        if (r == true) {
            $http({
                method : "DELETE",
                url : URL+"/api/feedback/"+id,
            }).then(function mySuccess(response) {
                getList();
            }, function myError(response) {
                console.log(response.statusText);
            });

        }
        
    }
    $scope.btnDelUser = function(userid, name, _id){
        var r = confirm("Bạn chắc chắn muốn xóa tài khoản : " +  name);
        if (r == true) {
            

            $http({
                method : "GET",
                url : URL+"/api/feedback/"+userid,
            }).then(function mySuccess(response) {
                for(var i = 0 ; i < response.data.length; i++){
                    alert(response.data[i]._id);
                    $http({
                        method : "DELETE",
                        url : URL+"/api/feedback/"+response.data[i]._id,
                    }).then(function mySuccess(response) {
                        console.log(response);
                    }, function myError(response) {
                        console.log(response.statusText);
                    });
                }
            }, function myError(response) {
                console.log(response.statusText);
            });

            $http({
                method : "DELETE",
                url : URL+"/api/users/"+userid,
            }).then(function mySuccess(response) {
                console.log(response);
                getList();
            }, function myError(response) {
                console.log(response.statusText);
            });
        }

    }
});

app.controller('ctrlListOrder', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },500); 
    // });
    $scope.currentPage = 1;
    $scope.perPage = 10;
    function getList(timeSta, timeEnd){
        $http({
            method : "GET",
            url : URL+"/api/order",
        }).then(function mySuccess(response) {
            var totalPricePage = 0 ;
            var orders = response.data;
            console.log(orders);
            var listOrder = [];
            var price = 0;
            for(var i = 0; i < orders.length; i++){
                var createdAt = orders[i].createdAt;
                createdAt = new Date(createdAt).getTime();
                if(createdAt > timeSta && createdAt < timeEnd){
                    listOrder.push(orders[i]);
                    if (orders[i].status == 0) {
                        totalPricePage += orders[i].totalPrice;
                    }  
                }
            }
            //tắt load
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);


            $scope.totalPricePage = totalPricePage;
            console.log(listOrder);
            $scope.totalItems  = listOrder.length;
            $scope.listData = listOrder;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    //
    $scope.setDate = '1';
    getDatePer();
    $scope.btnOrderDetail = function(order_id, orderfullName, ordertotalPrice, orderemail, orderphone, orderadress){
        $('#modalOrderDetail').modal();
        $scope.fullName = orderfullName;
        $scope.price = ordertotalPrice;
        $scope.email = orderemail;
        $scope.phone = orderphone;
        $scope.adress = orderadress;
        $http({
            method : "GET",
            url : URL+"/api/orderdetail/"+order_id,
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.orderDetail = response.data;
        }, function myError(response) {
            console.log(response.data);
        });
    }
    $scope.btnDone = function(fullName, id, status){
        if (status == 1) {
            var r = confirm("Bạn sẽ nhận đơn hàng của " +  name);
            if (r == true) {
                $http({
                    method : "PUT",
                    url : URL+"/api/order/"+id,
                    data: {
                        "status" : status
                    }
                }).then(function mySuccess(response) {
                    console.log(response);
                    
                    getDatePer();
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }
        }
        else if(status == 0){
            var r = confirm("Bạn chắc chắn đã làm việc xong với " +  name);
            if (r == true) {
                $http({
                    method : "PUT",
                    url : URL+"/api/order/"+id,
                    data: {
                        "status" : status
                    }
                }).then(function mySuccess(response) {
                    console.log(response);
                    
                    getDatePer();
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }
        }
        else{
            var r = confirm("Bạn chắc chắn không còn vé cho " +  name);
            if (r == true) {
               $http({
                    method : "PUT",
                    url : URL+"/api/order/"+id,
                    data: {
                        "status" : status
                    }
                }).then(function mySuccess(response) {
                    console.log(response);
                    getDatePer();
                }, function myError(response) {
                    console.log(response.statusText);
                }); 
            }
        }
    }
    $scope.offModal = function(){
        $('#modalOrderDetail').modal('hide');
    }
    function getDatePer(){
        switch($scope.setDate){
            case '1': {
                $scope.timeEn = new Date();
                $scope.timeEn.setHours(0);
                var timeEnd = $scope.timeEn.getTime() + 86400000;
                $scope.timeSt = new Date(timeEnd - 86400000*3);
                var timeSta = $scope.timeSt.getTime();    
            }
            break;
            case '2': {
                $scope.timeEn = new Date();
                $scope.timeEn.setHours(0);
                var timeEnd = $scope.timeEn.getTime() + 86400000;
                $scope.timeSt = new Date(timeEnd - 86400000*7);
                var timeSta = $scope.timeSt.getTime();
            }
            break;
            case '3': {
                $scope.timeEn = new Date();
                $scope.timeEn.setHours(0);
                var timeEnd = $scope.timeEn.getTime() + 86400000;
                $scope.timeSt = new Date(timeEnd - 86400000*30);
                var timeSta = $scope.timeSt.getTime();
            }
            break;
            case '4': {
                $scope.timeEn = new Date();
                $scope.timeEn.setHours(0);
                var timeEnd = $scope.timeEn.getTime() + 86400000;
                $scope.timeSt = new Date(timeEnd - 86400000*365);
                var timeSta = $scope.timeSt.getTime();
            }
            break;
        }
        getList(timeSta,timeEnd);
    }
    $scope.getDate = function(){
        getDatePer();
    }
    $scope.btnTotalPrice = function(){
        var timeSta = $scope.timeSt.getTime();
        if ($scope.timeEn == null || $scope.timeEn == undefined)   {
            $scope.timeEn = new Date();
            $scope.timeEn.setHours(0);
        } 
        console.log($scope.timeEn);
        var timeEnd = $scope.timeEn.getTime() + 86400000;
        getList();
        
    }
});

app.controller('ctrlContact', function($scope, $http){
    // angular.element(document).ready(function () {
    //     setTimeout(function(){
    //         $(".detailLoad").fadeOut("slow");
    //     },500);
        
    // });
    function getContact(){
        $http({
            method : "GET",
            url : URL+"/api/contact",
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.contact = response.data;
            setTimeout(function(){
                $(".detailLoad").fadeOut("slow");
            },500);
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    getContact()
    $scope.btnEditContact = function(id){
        console.log($scope.contact);
        $http({
            method : "PUT",
            url : URL+"/api/contact/"+id,
            data: $scope.contact
        }).then(function mySuccess(response) {
            console.log(response);
            
            getContact();
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
});
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "chucnangadmin/listUser.html"
    })
    .when("/addUser", {
        templateUrl : "chucnangadmin/addUser.html"
    })
    .when("/addLucDia", {
        templateUrl : "chucnangadmin/addLucDia.html"
    })
    .when("/listDanhmuc", {
        templateUrl : "chucnangadmin/listDanhmuc.html"
    })
    .when("/addTonGiao", {
        templateUrl : "chucnangadmin/addTonGiao.html"
    })
    .when("/listLeHoi", {
        templateUrl : "chucnangadmin/listLeHoi.html"
    })
    .when("/addLeHoi", {
        templateUrl : "chucnangadmin/addLeHoi.html"
    })
    .when("/listFeedBack", {
        templateUrl : "chucnangadmin/listFeedBack.html"
    })
    .when("/listOrder", {
        templateUrl : "chucnangadmin/listOrder.html"
    })
    .when("/contact", {
        templateUrl : "chucnangadmin/contact.html"
    })
});
