/**
 * File containing the necessary functions 
 * that are being injected into the given tab, downloading the image directly to a given folder
 */

function initialize_download(){
    console.log('initializing download');
    const link = document.querySelector("img").src;
    console.log("link "+link);
    // download_image(link);
    let a = document.createElement('a');
    a.href=link;
    a.download='pixiv_download';
    // executing download
    a.click();
    console.log('download finished //');
    //window.close();
}
initialize_download();

function downloadSuccess(){
    console.log('download successful');
}
function downloadFail(){
    console.log('download failed');
}

function download_image(link){
    // creating request to download file 
    let request_values = {
        method:'POST',
        mode:'cors',
        cache:'default',
        credentials:'include'
    }
    var new_request = new Request(link,request_values);
    fetch(new_request).then(function (response) {
        console.log(response);
    },console.log('failure'))
}