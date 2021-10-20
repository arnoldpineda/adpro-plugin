chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if(msg.command == 'run-complete'){
    alert(JSON.stringify(msg.data));
  }
});

function createCommandObject(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    console.log(activeTab);
    chrome.tabs.sendMessage(activeTab.id, {command: "runCommands"});
  });
}


document.querySelector('.run-command').addEventListener('click', function(){
  createCommandObject();
});
  