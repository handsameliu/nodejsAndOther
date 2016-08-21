var document = {
    cookies:[],
    get cookie(){
        return document.cookies.join('; ');
    },
    set cookie(cookie){
        for(var i=0;i<document.cookies.length;i++){
            var item = document.cookies[i];
            if(cookie.split('=')[0]==item.split('=')[0]){
                document.cookies[i] = cookie;
                return;
            }
        }
        document.cookies.push(cookie);
    }
};

console.log(document.cookie);


