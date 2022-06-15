//
//

// initial setup of system variables

document.addEventListener("DOMContentLoaded",initializePlugin);

/**
 * function initializing all buttons
 * executing download on button press
 */
function initializePlugin(){
    
    
    document.body.style.border = '4px solid green';
    mainbtn = document.getElementById('Download');
    mainbtn.addEventListener("click",findLinks);
    let secbtn = document.getElementById('Download_all');
    secbtn.addEventListener('click',gatherNewTabs);
    console.log('initialized extensions');

}


function changeColor(){
    document.body.border='4px solid red';
    console.log('help?');
}
/**
 * 
 * @param {string} whitelist 
 * @returns array of tabs filtered after given whitelist
 */
function getCurrentWindowsTab(whitelist){
    return browser.tabs.query({url:whitelist,currentWindow:true});
}

/**
 * 
 */
function findLinks(){
    let whitelist = 'https://www.pixiv.net/en/artworks/*';
    getCurrentWindowsTab(whitelist).then(gatherTabs,changeColor);
}

function gatherTabs(tablist){
    // traverses through array of tabs, querying their links and adding them to the extension
    //console.log(tablist);
    // creating new element to insert found links to
    let tabs_obj = document.createDocumentFragment();
    let popup_linklist = document.getElementById('tabs-list');
    popup_linklist.textContent='';
    console.log('traversing through tablist now');
    for( let tab of tablist){
        console.log("current tabs title :: "+tab.title);
        let new_tab = document.createElement('a');
        new_tab.textContent = tab.title || tab.id + "\n";
        new_tab.setAttribute('href',tab.id);
        // finished creating new reference to element, adding to group 
        tabs_obj.appendChild(new_tab);
        popup_linklist.appendChild(tabs_obj);
        // finished indexing the found links, 
        // proceeding to download them
        obtain_pixiv_link(tab);    
    }
}

function obtain_pixiv_link(tab){
    // query for a element with given link to download from 
    console.log('---')
    console.log('traversing tab '+tab.id+' with given url ::'+tab.url);

    let script = '/extract_images.js';
    let returned_value = executeScript(tab,script);
    console.log('output of tab query::\n');
}

function gatherNewTabs(){
    // traversing a second time 
    let whitelist= "https://i.pximg.net/img-original/img/*";
    getCurrentWindowsTab(whitelist).then((tab_list) =>{   
    console.log("traversing through new tab list now");
        for(let tab of tab_list){
            console.log(tab);
            let script_src="/download_images.js";
            // downloading file
            executeScript(tab,script_src);
            console.log('finished download')
        }
    },changeColor);
}

/**
 * function  taking a script, executing it given tab
 * @param {string} script_src 
 * @returns{array} array of urls
 */

 function executeScript(tab,script_src){
    // function executing given 
    let returned_value ="";
    console.log('executing Script now');
    let execute_Script = browser.tabs.executeScript(tab.id,{file:script_src});
    execute_Script.then((urls) => {
        returned_value = urls;
    },changeColor);
    return returned_value;
}