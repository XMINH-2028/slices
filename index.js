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
        var seth,setw;
        var choicesize=0;
        var choiceimage=0;
        var adds="";
        //Hàm cắt ảnh
        function Cut() {
            n=0;
            k=0;
            timer=0;
            nbtd=0;
            sd=0;
            me=0;
            hr=0; 
            document.getElementById("hour").innerHTML="00";
            document.getElementById("minute").innerHTML="00";
            document.getElementById("second").innerHTML="00";
            document.getElementById("cover").style.display="none";
            document.getElementById("selectsize").style.display="none";
            document.getElementById("selectimage").style.display="none";
            document.getElementById("top").style.display="none";
            document.getElementById("picture").style.display="none";
            document.getElementById("topleft").style.display="flex";
            document.getElementById("xchoice").style.display="block";
            document.getElementById("topright").style.display="flex";
           
            nube=0;
            text="";
            for (i=1;i<=sizemain;i++){
                text += "<tr>";
                for (j=1;j<=sizemain;j++){
                    nube += 1;
                    text += "<td id='tdtd"+ nube +"' onclick='set(this,"+ nube + ")' ondblclick='set(this," + nube + ")'><img src='' alt='' id="+'"td'+ nube + '"></td>';
                }
                text += "</tr>";
            }
            document.getElementById("table").innerHTML=text;
            /*Thiết lập đơn vị theo kích thước màn hình*/
            setw=Math.round(screen.width*0.35);
            seth=Math.round(screen.height*0.35);
            if (setw%sizemain==0) {
                setw = setw;
            } else {
                for (i=1;i<=(sizemain-1);i++){
                    setw=setw-1;
                    if (setw%sizemain==0){
                        i=sizemain;
                    }
                }
            }
            if (seth%sizemain==0) {
                seth = seth;
            } else {
                for (i=1;i<=(sizemain-1);i++){
                    seth=seth-1;
                    if (seth%sizemain==0){
                        i=sizemain;
                    }
                }
            }
            if (setw >= seth) {
                seth = setw;
            } else {
                setw=seth;
            }
            for (i=1;i<=sizemain*sizemain;i++){
                document.getElementById("td"+i).style.position="absolute";
                document.getElementById("tdtd"+i).style.animationName="example";
            }
          
            document.getElementById("table").style.width=setw +"px";
            document.getElementById("table").style.height=seth +"px";
            for (i=1;i<=sizemain*sizemain;i++){
                document.getElementById("td"+i).style.height=seth+"px";
                document.getElementById("td"+i).style.width=setw+"px";
            }
            /*Vị trí top của khung chứa ảnh căt-dùng cho random*/
            for (i = 1; i <= sizemain*sizemain; i++){
                topimg[i]=n*seth/sizemain;
                k++;
                if (k%sizemain == 0){
                    n++;
                }
            }
            /*Vị trí left của khung chứa ảnh căt-dùng cho random*/
            n=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                leftimg[i]=n*setw/sizemain;
                n++;
                if (n%sizemain == 0){
                    n = 0;
                }
            }
            /*Vị trí top của khung ảnh cắt-dùng cho random*/
            n=0;
            k=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                topclip[i]=n*seth/sizemain;
                k++;
                if (k%sizemain == 0){
                    n++;
                }
            }
            /*Vị trí left của khung ảnh cắt-dùng cho random*/
            n=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                leftclip[i]=n*setw/sizemain;
                n++;
                if (n%sizemain == 0){
                    n = 0;
                }
            }
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
            /*Vị trí của khung ảnh khi thực hiện cắt*/ 
            for (i = 1; i <= sizemain*sizemain; i++){
                topimgclip[i] = topimg[tdnumber[i]] - topclip[imgnumber[i]];
                leftimgclip[i] = leftimg[tdnumber[i]] - leftclip[imgnumber[i]];
            }
            /*Lấy các thông số khi thực hiện cắt cho các ô ảnh từ 1 đến 25*/ 
            n=0;
            t=0;
            r=setw/sizemain;
            b=seth/sizemain;
            l=0;
            for (i = 1; i <= sizemain*sizemain; i++){
                cliptop[i]=t;
                clipright[i]=r;
                clipbottom[i]=b;
                clipleft[i]=l;
                r=r + setw/sizemain;
                l=l + setw/sizemain;
                if (r == setw*(sizemain+1)/sizemain){
                    t = t + seth/sizemain;
                    b = b + seth/sizemain;
                    r = setw/sizemain;
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
        function choosesize(elm0,clr0){
            sizemain=clr0;
            if (choicesize == 0) {
            choicesize += 1;
            }
            if ((choiceimage+choicesize) == 2) {
                Cut();
            }
        }
        //Hàm chọn ảnh
        function picture(elmn,clr) {
            adds = clr;
            for (i=1; i<=1; i++){
                document.getElementById("img"+i).style.borderRadius="0px";
            }
            elmn.style.borderRadius="50px";
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
        /*Onclick*/
        var savefirst=0;
        var savesecond=0;
        function set(elmn,clr){
            var timercount=0;
            if (timer===0) {
                start();
                timer=1;
            }
            if (nbtd===0 ||nbtd===clr) {
                nbtd = clr;/*Biến chứa vị trí ảnh xuất hiện ở phần kết quả*/
                elmn.style.opacity = "0.4";
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
                        x = document.getElementById("tdtd" + nbtd);
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
                clearInterval(visible);
            }
        }