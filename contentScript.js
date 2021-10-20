chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if(msg.command == "runCommands"){
    console.log('start commands');
    window.ScraperExt = [];
    getNextItem();
  }
});

function getNextItem(){
  saveEvent();
  console.log('run complete');
    chrome.runtime.sendMessage({command:"run-complete", data: window.ScraperExt});
}

function waitEvent(obj, index){
  var item = obj[index];
  var waitTime = parseInt(item.one);
  setTimeout(function(){
    getNextItem(obj, (index+1));
  }, waitTime);

}

function clickEvent(obj, index){
  var item = obj[index];
  document.querySelector(item.one).click();
  getNextItem(obj, (index+1));
}


function saveEvent(){
  var url = window.location.href;
  var json = JSON.parse(document.querySelector('script').innerText);
  var value = {};
  if (json.interactionStatistic) {
    console.log(json.interactionStatistic);
    for (const interaction of json.interactionStatistic) {
      if (interaction.interactionType.indexOf('Comment')>-1) {
        value["comment"] = interaction.userInteractionCount;
      }
      if (interaction.interactionType.indexOf('Like')>-1) {
        value["like"] = interaction.userInteractionCount;
      }
      if (interaction.interactionType.indexOf('Share')>-1) {
        value['share'] = interaction.userInteractionCount;
      }
    }
  }
  /*var [a, numberpost] = url.split("posts/");
  console.log(numberpost);
  var value = document.querySelector("#sentence_"+numberpost+" > a > div > div").innerText;
  var cont = 0;
  var splitand = value.split(" y ");
  console.log(splitand.length);

  if(splitand.length>1){
    var number = splitand[1].match(/\d+/);
    console.log(number[0]);
    cont+=parseInt(number[0]);
  }
  var number = splitand[0].match(/\d+/);
  console.log(number);
  if(number){
    if(number[0] > 0){
      cont += parseInt(number[0])
    }else{
      cont += 1
    }
  }else{
    cont += 1;
  }
  console.log(cont);*/
  window.ScraperExt.push(value);
}
function enterEvent(obj, index){
  var item = obj[index];
  var value = document.querySelector(item.one).value = item.two;
  getNextItem(obj, (index+1));

}
