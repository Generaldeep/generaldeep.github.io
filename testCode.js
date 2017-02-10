let playerBody = document.getElementById('playBodyDiv');
let dealerBody = document.getElementById('dealerBodyDiv');
let player = document.getElementById('player');
let dealer = document.getElementById('dealer');
let hiddenCard = document.getElementById('dealer');
let allFetchedData = [];
let discardedCardArr = [];
let playBtnCount = 0; //if count === 4 play button disabled until new hand
let runningCardCount = 0; //method to deal cards to player/dealer
let playerCount = 0; //total of player
let dealerCount = 0; //total of dealer
let runCount = 0;
let cantHitNoMore = 0;
let cardsAndValuesArray = [];
let dealerHiddenCardValue = [];
let cardImgAndValueArr = [];


let hitButton = document.getElementById('hit');
hitButton.addEventListener('click', function(event) {
  event.preventDefault();

  runningCardCount = 0;
  if (cantHitNoMore > 0) {
    return;
  }
  else {
    delegateRoles(allFetchedData);
    checkForBlackjack();
  }
})


let newHand = document.getElementById('play');
newHand.addEventListener('click', function(event) {
  event.preventDefault();

  if (dealerHiddenCardValue.length > 0) {
    while (playerBody.firstChild && dealerBody.firstChild) {
      playerBody.removeChild(playerBody.firstChild);
      dealerBody.removeChild(dealerBody.firstChild);
      resetAllCounters();
      //  return;
    }
  } else {
    while (playBtnCount < 10) {
      fetchCard()
      playBtnCount++;
    }
  }
})



let dealCount = 0;
let deal = document.getElementById('deal')
deal.addEventListener('click', function(event) {
  event.preventDefault();

  if (runCount > 0) {
    return;
  }
  else {
    while (dealCount < 4) {
      runCount++;
      delegateRoles(allFetchedData);
      dealCount++;
      console.log('runningCardCount: ' + runningCardCount);
      console.log('player count: ' + playerCount);
      console.log('deal count: ' + dealerCount);
    }
  }
})


let standButton = document.getElementById('stand');
standButton.addEventListener('click', function(event) {
  event.preventDefault();
  runningCardCount = 3;
  cantHitNoMore = 1;

  if (runCount < 5) {
    checkDealerTotal();
    runCount++;
  }
  // checkDealerTotal();
  else {
    return;
  }
})


let refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', function(event) {
  window.location.reload();

  if (runCount > 0) {
    return;
  }
  else {
    while (dealCount < 4) {
      runCount++;
      delegateRoles(allFetchedData);
      dealCount++;
      console.log('runningCardCount: ' + runningCardCount);
      console.log('player count: ' + playerCount);
      console.log('deal count: ' + dealerCount);
    }
  }
})



function fetchCard() {
  // let deckID = '9lykfe2jz7o4';
  return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=20`)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonObj) {
      let cardsObj = jsonObj.cards;
      for (var i = 0; i < cardsObj.length; i++) {
        allFetchedData.push({
          imgAddress: cardsObj[i].image,
          cardValue: cardsObj[i].value
        })
      }
      return Promise.all(allFetchedData);
    })
}



function delegateRoles(arr) {
  let tempVar = '';
  for (var i = 0; i < 1; i++) {
    assignCard(arr[i].imgAddress);
    caluculateCount(arr[i].cardValue);
    tempVar = arr.shift();
    discardedCardArr.push(tempVar);
  }

  runningCardCount++;
  console.log('running card count in delegateRoles: '+runningCardCount);
}


//
function assignCard(cardImgAdress) {
  let img = new Image();
  img.style.width = '170px';
  img.style.height = '220px';
  // console.log(runningCardCount);
  if (runningCardCount === 1) {
    dealerHiddenCardValue.push(cardImgAdress);
    img.src = './images/cheetah.jpg';
    hiddenCard = img;
    hiddenCard.style.float = 'left';
    return dealerBody.appendChild(hiddenCard);
  } else if (runningCardCount % 2 === 0) {
    img.src = cardImgAdress.toString();
    player = img;
    player.style.float = 'left';
    return playerBody.appendChild(player);
  } else {
    img.src = cardImgAdress.toString();
    dealer = img;
    dealer.style.float = 'left';
    return dealerBody.appendChild(dealer);
  }
}


function caluculateCount(cardVal) {
  if ((runningCardCount === 1)) {
    dealerHiddenCardValue.push(cardVal);
    cardVal = 0;
    dealerCount += parseInt(cardVal);
  }

  else if (runningCardCount % 2 === 0) {
    if (!parseInt(cardVal)) {
      if (cardVal === 'ACE') {
        return valueOfAce(player, playerCount);
      }
      cardVal = 10;
    }
    playerCount += parseInt(cardVal);
    document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerCount;
  }

  else {
    if (!parseInt(cardVal)) {
      if (cardVal === 'ACE') {
        return valueOfAce(cardVal, dealerCount);
      }
      cardVal = 10;
    }
    dealerCount += parseInt(cardVal);
    document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerCount;
  }
}


function valueOfAce(value, countOn) {
  if (countOn === playerCount) {
    if (playerCount <= 10 && playerCount >= 0) {
      value = 11;
      return playerCount += value;
    } else if (playerCount > 10) {
      value = 1;
      return playerCount += value;
    }
  } else if (countOn === dealerCount) {
    if (dealerCount <= 10 && dealerCount >= 0) {
      value = 11;
      return dealerCount += value;
    } else if (dealerCount > 10) {
      value = 1;
      return dealerCount += value;
    }
  }
}

function checkForBlackjack() {
  if (playerCount > 21) {
    checkDealerTotal();
  }
  else if(playerCount === 21) {
    checkDealerTotal();
    }
  else if (playerCount === dealerCount) {
    alert('PUSH!');
  }

  else if(playerCount < 21) {
    return;
  }

  else {
    checkDealerTotal();
  }
}


function checkDealerTotal() {
  if (playerCount > 21) {
    changeHiddenCardImage();
    changeHiddenCardValue();
    document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerCount;
  }
  else {
    while (dealerCount < 17) {
      runningCardCount = 3;
      changeHiddenCardImage();
      changeHiddenCardValue();
      delegateRoles(allFetchedData)
      // checkForBlackjack();
    }
  }
}


function changeHiddenCardImage() {
  hiddenCard.src = discardedCardArr[0].imgAddress.toString();
  hiddenCard.style.float = 'left';
  return dealerBody.appendChild(hiddenCard);
}


function changeHiddenCardValue() {
  let tempVal = discardedCardArr[0].cardValue;
  if (!parseInt(tempVal)) {
    if (tempVal === 'ACE') {
      return valueOfAce(tempVal, dealerCount);
    }
    tempVal = 10;
  }
  dealerCount += parseInt(tempVal);
  return dealerCount;
}


// function resetAllCounters() {
//   document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerCount;
//   playerCount = 0;
//   document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerCount;
//   dealerCount = 0;
//   playBtnCount = 0;
//   runningCardCount = 0;
//   runCount = 0;
//   cantHitNoMore = 0;
//   //  return;
// }
