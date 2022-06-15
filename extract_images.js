// --- / 
// -- / File, injected to selected tab
// downloads all found links within

function querytab(){
    // function querying through the current tab, searching for the given tags within the document

    // pure debug purpose
    document.body.style.border='4px solid red';
    
    // creating array that stores found links afterwards
    let link_collection = [];
    let newlink= document.getElementsByClassName("gtm-expand-full-size-illust");
    
    for (let element of newlink){
        // traversing through all found <a> tags with gtm-expand-full-size-illust class\
        // newlink is an array with at least 1 element

        // adding found link to collection
        let foundlink = element.getAttribute('href');
        link_collection.push(foundlink);
        console.log("link was found ::"+ foundlink);
        window.open(foundlink,'_blank');
        console.log('attempting download');
        //downloadFile(foundlink);
    }
    console.log("found these links ::"+link_collection);
    bookmark_image();
}


function bookmark_image(){
  let bookmark_btn = document.getElementsByClassName('gtm-main-bookmark');
  console.log(bookmark_btn);
  bookmark_btn[0].click();
  console.log('liked image')
}

querytab();