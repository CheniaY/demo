(function(){
    window.onload = function(){
        getJson("./json/img.json","get",false).then(function(res){
            let resJson =  JSON.parse(res);
            let imgData = resJson.data;
            createElement(imgData);
        }).then(() => {
            imgList = swiperList.getElementsByTagName("img");
            //给ul绑定事件，相当于事件代理，用ul代理了li中的所有事件
            ul[0].addEventListener('click',addActive,false);
        }).catch(() => {
            throw new Error("出错了");
        });
    }

    let ul = document.getElementsByClassName("control")[0].getElementsByTagName("ul");
    let swiperList = document.getElementById("swiper-list");
    let imgList = null;

    //获取json文件
    function getJson(url,type,async){
        // try{
        let promise = new Promise(function(resolve,reject){
            let xhr = new XMLHttpRequest();
            xhr.open(type,url,async);
            xhr.send(null);
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                resolve(xhr.responseText);
            }else{
                reject(new Error("ajax获取内容出错"+xhr.status));
            }
        });
        return promise;
    }

    //动态创建li 和 img 标签,使用DocumentFragment。
    function createElement(imgData){
        let len = imgData.length;
        let fragmentLi = document.createDocumentFragment();
        let fragmentImg = document.createDocumentFragment();
        let li = null, img = null;
        for(let i = 0; i < len; i++){
            li = document.createElement("li");
            //使用dataset对象进行自定义属性。
            li.dataset.index = i;
            img = document.createElement("img");
            img.setAttribute("src",imgData[i].imgSrc);
            if(i === 0){
                li.classList.add("active");
                img.classList.add("active");
            }
            fragmentLi.appendChild(li);
            fragmentImg.appendChild(img);
        }
        ul[0].appendChild(fragmentLi);
        swiperList.appendChild(fragmentImg);
    }

    function removeActive(e,tag){
        let removeActive = e.getElementsByTagName(tag);
        let len = removeActive.length;
        //forEach和map只能循环数组，不能循环伪数组和对象
        for(let i = 0; i < len; i++){
            //classList获取某个元素中的类列表
            if(removeActive[i].classList.contains("active")){
                removeActive[i].classList.remove("active");
            }
            if(imgList[i].classList.contains("active")){
                imgList[i].classList.remove("active");
            }
        }
    }
    function addActive(e){
        //dataset获取自定义属性data-index中的值。
        let index = e.target.dataset.index;
        removeActive(e.target.parentNode,'li');
        e.target.classList.add("active");
        imgList[index].classList.add("active");
    }

})(window);