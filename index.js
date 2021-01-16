var i,j,k,n,t,r,b,l,x,y,timer,nbtd;
        var tdnumber=[0];
        var imgnumber=[0];
        var topimg=[0];
        var leftimg=[0];
        var topclip=[0];
        var leftclip=[0];
        var topimgclip=[0];
        var leftimgclip=[0];
        var cliptop=[0];
        var clipright=[0];
        var clipbottom=[0];
        var clipleft=[0];
        var sizemain;
        var text="";
        var nube=0;
        var hr,me,sd;
        var setsize;
        var choicesize=0;
        var choiceimage=0;
        var adds="";
        var layout = 0;
        var idtable = document.getElementById('table');
        var idpic=document.getElementById('picture');
        var addpic = document.getElementById('img1');
        var srcpic=['images/butterfly.jpg','images/cat.jpg','images/dolphin.jpg','images/dragonfly.jpg','images/elephant.jpg',
        'images/koala.jpg','images/Lighthouse.jpg','images/lotus.jpg','images/monkey.jpg','images/rose.jpg','images/sunflower.jpg','images/winter.jpg'];    
        var btn=['rgba(0,123,255,0.5)','rgba(40,167,69,0.5)','rgba(255,193,7,0.5)','rgba(220,53,69,0.5)'];
        var srcrandom="";
        function creatNext(){
            var node = document.createElement("button");
            node.innerHTML="NEXT";
            node.setAttribute('class','btn-lg btn-success text-light');
            node.setAttribute('onclick','Next()');
            node.setAttribute('id','next');
            document.getElementById('topleft').appendChild(node);
        }
        function setPic() {
                
                    if (window.innerHeight<window.innerWidth/1.5) {
                        document.querySelector('#main>div').style.flexDirection = 'row';
                        document.querySelector("#picture>div").style.height = '100%';
                        document.querySelector("#picture>div").style.width = idpic.offsetWidth+'px';
                        if (srcrandom==="") {
                            srcrandom=Math.floor(Math.random()*12);
                            addpic.setAttribute('src',srcpic[srcrandom]);
                            addpic.addEventListener("load", function(){
                                if(this.naturalWidth>this.naturalHeight) {
                                    addpic.style.height = idpic.offsetWidth/(this.naturalWidth/this.naturalHeight)+'px';
                                    addpic.style.width = '100%';
                                } else {
                                    addpic.style.height = '100%';
                                    addpic.style.width = 'auto';
                                }
                            });
                        }
                    } else {
                        
                    }
               
                
            
            
            /*if (window.innerHeight<window.innerWidth) {
                addpic.style.width = Math.floor(window.innerHeight - getOffset(idpic).top-20)+'px';
                addpic.style.height = Math.floor(window.innerHeight - getOffset(idpic).top-20)+'px';
            } else {
                if (Math.floor(window.innerHeight - getOffset(idpic).top-20)<Math.floor(window.innerWidth-30)){
                    addpic.style.width = Math.floor(window.innerHeight - getOffset(idpic).top-20)+'px';
                    addpic.style.height = Math.floor(window.innerHeight - getOffset(idpic).top-20)+'px';
                } else {
                    addpic.style.width = Math.floor(window.innerWidth-30)+'px';
                    addpic.style.height = Math.floor(window.innerWidth-30)+'px';
                }   
            }*/
        }
       setPic();
        //Upload image
        function Selectimg(event) {
            addpic.style.backgroundImage=`url('${URL.createObjectURL(event.target.files[0])}')`;
            adds=URL.createObjectURL(event.target.files[0]);
            addpic.style.borderRadius="50px";
            document.querySelector("#img1 button").innerHTML= 'Click me to select default image!';
            document.querySelector("#img1 label").innerHTML= 'Selected your image!';
            if (choiceimage == 0) {
                choiceimage += 1;
            }
            if ((choiceimage+choicesize) == 2) {
                Cut();
            }
        }


        //Next
        function Next() {
            if(srcrandom<11) {
                srcrandom+=1;
            } else {
                srcrandom=0;
            }
            adds=srcpic[srcrandom];
            Cut();
            document.getElementById('xchoice').innerHTML='X-SLICE';
        }
        //Hàm cắt ảnh
        function getOffset(el) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        }
       /* window.onresize=function(){
            if (layout===1) {
                setSize();
                cutResize();
            } else {
                setPic();
            }
        }*/
        function setLayout(){
            layout=1;
            clearInterval(visible);
            timer=0;
            nbtd=0;
            sd=0;
            me=0;
            hr=0; 
            document.getElementById("nexttop").innerHTML=`<div class="d-flex justify-content-center align-items-center mb-1" id="topleft">
                        <button class="btn-lg btn-danger"><a href="index.html" class="text-light">HOME</a></button>
                        <button class="btn-lg btn-warning mx-2 text-light" onclick="Cut()">RESET</button>
                    </div>
                    <div class="time d-flex justify-content-center align-items-center mb-1 mx-2">
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-alarm text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 15A6 6 0 1 0 8 3a6 6 0 0 0 0 12zm0 1A7 7 0 1 0 8 2a7 7 0 0 0 0 14z"/>
                            <path fill-rule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.053.224l-1.5 3a.5.5 0 1 1-.894-.448L7.5 8.882V5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"/>
                            <path fill-rule="evenodd" d="M11.646 14.146a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1-.708.708l-1-1a.5.5 0 0 1 0-.708zm-7.292 0a.5.5 0 0 0-.708 0l-1 1a.5.5 0 0 0 .708.708l1-1a.5.5 0 0 0 0-.708zM5.5.5A.5.5 0 0 1 6 0h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                            <path d="M7 1h2v2H7V1z"/>
                          </svg>
                        <span id="hour" class="text-danger">00</span>:<span id="minute" class="text-warning">00</span>:<span id="second" class="text-success">00</span>
                    </div>`;
            document.getElementById("hour").innerHTML="00";
            document.getElementById("minute").innerHTML="00";
            document.getElementById("second").innerHTML="00";
            document.getElementById("cover").style.display="none";
            document.getElementById("top").style.display="none";
            document.getElementById("picture").style.display="none";
            document.getElementById("nexttop").style.display="flex";
            
            
           
        }
         function setSize() {
            n=0;
            k=0;
            nube=0;
            text="";
            for (i=1;i<=sizemain;i++){
                text += "<tr>";
                for (j=1;j<=sizemain;j++){
                    nube += 1;
                    text += "<td id='tdtd"+ nube +"'><img src='' alt='' id="+"'td"+ nube + "' onmousedown='set(event,this,"+ nube + ")' ontouchstart='set(event,this," + nube + ")'></td>";
                }
                text += "</tr>";
            }
            document.getElementById("table").innerHTML=text;
            /*Thiết lập đơn vị theo kích thước màn hình*/
            if (window.innerHeight<window.innerWidth) {
                setsize = Math.floor(window.innerHeight - getOffset(idtable).top-20);
            } else {
                if(Math.floor(window.innerHeight - getOffset(idtable).top-20)<Math.floor(window.innerWidth-10)) {
                    setsize = Math.floor(window.innerHeight - getOffset(idtable).top-20);
                } else {
                    setsize = Math.floor(window.innerWidth-10);
                }  
            }
            if (setsize%sizemain==0) {
                setsize = setsize;
            } else {
                for (i=1;i<=(sizemain-1);i++){
                    setsize=setsize-1;
                    if (setsize%sizemain==0){
                        i=sizemain;
                    }
                }
            }
            for (i=1;i<=sizemain*sizemain;i++){
                document.getElementById("td"+i).style.position="absolute";
                document.getElementById("tdtd"+i).style.animationName="example";
            }
          
            document.getElementById("table").style.width=setsize +"px";
            document.getElementById("table").style.height=setsize +"px";
            for (i=1;i<=sizemain*sizemain;i++){
                document.getElementById("td"+i).style.height=setsize+"px";
                document.getElementById("td"+i).style.width=setsize+"px";
            }

            /*Vị trí top của khung chứa ảnh căt-dùng cho random*/
            for (i = 1; i <= sizemain*sizemain; i++){
                topimg[i]=n*setsize/sizemain;
                k++;
                if (k%sizemain == 0){
                    n++;
                }
            }
            /*Vị trí left của khung chứa ảnh căt-dùng cho random*/
            n=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                leftimg[i]=n*setsize/sizemain;
                n++;
                if (n%sizemain == 0){
                    n = 0;
                }
            }
            /*Vị trí top của khung ảnh cắt-dùng cho random*/
            n=0;
            k=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                topclip[i]=n*setsize/sizemain;
                k++;
                if (k%sizemain == 0){
                    n++;
                }
            }
            /*Vị trí left của khung ảnh cắt-dùng cho random*/
            n=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                leftclip[i]=n*setsize/sizemain;
                n++;
                if (n%sizemain == 0){
                    n = 0;
                }
            }
        }
        function cutResize(){
            /*Vị trí của khung ảnh khi thực hiện cắt*/ 
            for (i = 1; i <= sizemain*sizemain; i++){
                topimgclip[i] = topimg[tdnumber[i]] - topclip[imgnumber[i]];
                leftimgclip[i] = leftimg[tdnumber[i]] - leftclip[imgnumber[i]];
            }
            /*Lấy các thông số khi thực hiện cắt cho các ô ảnh từ 1 đến 25*/ 
            n=0;
            t=0;
            r=setsize/sizemain;
            b=setsize/sizemain;
            l=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                cliptop[i]=t;
                clipright[i]=r;
                clipbottom[i]=b;
                clipleft[i]=l;
                r=r + setsize/sizemain;
                l=l + setsize/sizemain;
                if (r == setsize*(sizemain+1)/sizemain){
                    t = t + setsize/sizemain;
                    b = b + setsize/sizemain;
                    r = setsize/sizemain;
                    l = 0;
                }
            }
            /*Thực hiện cắt ảnh*/ 
            t=0;
            r=0;
            b=0;
            l=0;
            k=1;
            for (i = 1; i <= sizemain*sizemain;){
                for (j = 1; j <= sizemain*sizemain; j++){
                    if(tdnumber[j] == i){
                        x=document.getElementById("td" + tdnumber[j]);
                        x.src=adds;
                        x.style.animationDuration= k+"s";
                        k=k+0.2;
                        x.style.top = topimgclip[j] + "px";
                        x.style.left= leftimgclip[j] + "px";
                        t = cliptop[imgnumber[j]];
                        r = clipright[imgnumber[j]];
                        b = clipbottom[imgnumber[j]];
                        l = clipleft[imgnumber[j]];
                        x.style.clip= "rect("+ t + "px,"+ r + "px,"+ b + "px,"+ l + "px)";
                        i++;
                    }
                }
            }
        }
        function Cut() {
            setLayout();
            setSize();
            
            /*Random vị trí khung chứa ảnh cắt*/ 
            for (i = 1; i <= sizemain*sizemain;)
            {
                tdnumber[i]=Math.ceil(Math.random()*sizemain*sizemain);
                k=0;
                for (j = 1; j < i; j++){
                        if (tdnumber[i] == tdnumber[j]){
                            k = k + 1;
                        }
                }
                if (k == 0){
                    i = i + 1;
                }
            }
            /*Random vị trí ảnh nằm trong khung chứa*/ 
            for (i = 1; i <= sizemain*sizemain;)
            {
                imgnumber[i]=Math.ceil(Math.random()*sizemain*sizemain);
                k=0;
                for (j = 1; j < i; j++){
                        if (imgnumber[i] == imgnumber[j]){
                            k = k + 1;
                        }
                }
                if (k == 0){
                    i = i + 1;
                }
            }
            cutResize();
            /*Set animationDuration cho khung kết quả + tạo 2 mảng thể hiện sự nhập xuất của ảnh ở 
            phần ảnh random và ảnh kết quả + khai báo biến chứa ảnh đã bị ẩn ở phần kết quả khi thực
            hiện trả về hoặc đổi ảnh*/ 
            k=1;
            for (i = 1; i <= sizemain*sizemain; i++){
                x=document.getElementById("tdtd"+i);
                x.style.animationDuration=k+"s";
                k=k+0.1;
            }
        }
        //Hàm chọn kích thước
        function choosesize(elmn,clr0,clr1){
            sizemain=clr0;
            for (let i=0;i<document.querySelectorAll('.size').length;i++) {
                document.querySelectorAll('.size')[i].style.outline = 'none';
            }
            elmn.style.outline = `5px solid ${btn[clr1]}`;
            if (choicesize == 0) {
            choicesize += 1;
            }
            if ((choiceimage+choicesize) == 2) {
                Cut();
            }
        }
        //Hàm chọn ảnh
        function picture() {
            addpic.style.backgroundImage=`url('${srcpic[srcrandom]}')`;
            addpic.style.borderRadius="50px";
            adds = addpic.style.backgroundImage.slice(5,-2);
            document.querySelector("#img1 button").innerHTML= 'Selected default image!';
            document.querySelector("#img1 label").innerHTML= 'Click me to select your image!';
            document.getElementById('sl_image').value = "";
            if (choiceimage == 0) {
                choiceimage += 1;
            }
            if ((choiceimage+choicesize) == 2) {
                Cut();
            }
        }
        //Hàm bắt đầu chơi
        var visible;
        function start(){
                //Set Time 
                visible=setInterval(()=>{
                        sd +=1;
                        if (sd<10){
                            document.getElementById("second").innerHTML="0"+sd;
                        } else {
                            if (sd==60){
                                document.getElementById("second").innerHTML="00";
                            }else{
                                document.getElementById("second").innerHTML=sd;
                            }
                        }  
                        if (sd==61){
                            me += 1;
                            if (me<10){
                                document.getElementById("minute").innerHTML="0"+me;
                            }else {
                                if (me==60){
                                    document.getElementById("minute").innerHTML="00";
                                    me=0;
                                    hr += 1;
                                    if (hr<10){
                                        document.getElementById("minute").innerHTML="0"+hr;
                                    } else {
                                        document.getElementById("minute").innerHTML=hr;
                                    }
                                }else{
                                    document.getElementById("minute").innerHTML=me;
                                }
                            }
                            sd=1;
                        }
                    },1000)
            }

        /*Counttouch*/
        var countTouch=0;
        function countTouches(e) {
            countTouch = e.touches.length;
            if (countTouch===2) {
               e.preventDefault();
            }
        }


        /*Onclick*/
        var savefirst=0;
        var savesecond=0;
        function set(e,elmn,clr){
            e.preventDefault();
            var timercount=0;
            if (timer===0) {
                start();
                timer=1;
            }
            if (nbtd===0) {
                nbtd = clr;/*Biến chứa vị trí ảnh xuất hiện ở phần kết quả*/
                elmn.style.opacity = "0.4";
            } else if(nbtd===clr) {
                nbtd = 0;
                elmn.style.opacity = "1";
            } else {
                for (i = 1; i <= sizemain*sizemain; i++){
                    if (tdnumber[i]===nbtd) {
                        x = document.getElementById("td" + clr);
                        x.style.top = (topimg[clr] - topclip[imgnumber[i]]) + "px";
                        x.style.left= (leftimg[clr] - leftclip[imgnumber[i]]) + "px";
                        t = cliptop[imgnumber[i]];
                        r = clipright[imgnumber[i]];
                        b = clipbottom[imgnumber[i]];
                        l = clipleft[imgnumber[i]];
                        x.style.clip= "rect("+ t + "px,"+ r + "px,"+ b + "px,"+ l + "px)";
                        savefirst=i;
                    }
                    if (tdnumber[i]===clr) {
                        x = document.getElementById("td" + nbtd);
                        x.style.top = (topimg[nbtd] - topclip[imgnumber[i]]) + "px";
                        x.style.left= (leftimg[nbtd] - leftclip[imgnumber[i]]) + "px";
                        t = cliptop[imgnumber[i]];
                        r = clipright[imgnumber[i]];
                        b = clipbottom[imgnumber[i]];
                        l = clipleft[imgnumber[i]];
                        x.style.clip= "rect("+ t + "px,"+ r + "px,"+ b + "px,"+ l + "px)";
                        x.style.opacity='1';
                        savesecond=i;
                    }
                }
                tdnumber[savefirst]=clr;
                tdnumber[savesecond]=nbtd;
                nbtd=0;
            }
            for (i=1;i<=sizemain*sizemain;i++) {
                if(parseFloat(document.getElementById("td"+i).style.left) == 0) {
                    if (parseFloat(document.getElementById("td"+i).style.top) == 0) {
                        timercount += 1;
                    }
                }
            }
            if (timercount == (sizemain*sizemain)) {
                document.getElementById("xchoice").innerHTML="CONGRATULATION!";
                document.getElementById("cover").style.display="block";
                creatNext();
                clearInterval(visible);
            }
        }