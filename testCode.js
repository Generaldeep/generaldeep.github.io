let playerBody = document.getElementById('playBodyDiv');
let dealerBody = document.getElementById('dealerBodyDiv');
let player = document.getElementById('player');
let dealer = document.getElementById('dealer');
let hiddenCard = document.getElementById('dealer');
let fetchedData = [];
let discardedCardArr = [];
let dealerHiddenCardValue = [];

let dealCount = 0;
let playerTotal = 0;
let dealerTotal = 0;
let hitButtonEnabled = true;
let gameOver = false;



let hitButton = document.getElementById('hit');
hitButton.addEventListener('click', function(event) {
  event.preventDefault();
  runningCardCount = 0;

  if (hitButtonEnabled === true) {
    dealNewCard(fetchedData, player);
  } else {
    return;
  }
})



let standButton = document.getElementById('stand');
standButton.addEventListener('click', function(event) {
  event.preventDefault();
  hitButtonEnabled = false;
  runningCardCount = 3;
  disableStandutton = 0;

  if (disableStandutton < 1) {
    changeDealerTotal();
    disableStandutton++;
  }
  else {
    return;
  }
})

let loadDeck = document.getElementById('play');
loadDeck.addEventListener('click', function(event) {
  event.preventDefault();
  let fetchCardsCount = 0;
    while (fetchCardsCount < 10) {
      fetchCard()
      fetchCardsCount++;
    }
})

let newGame = document.getElementById('newGame')
newGame.addEventListener('click', function(event) {
  event.preventDefault();
  // let dealCount = 0;
  let runCount = 0;
  if (runCount > 0) {
    return;
  }
  else {
    while (dealCount < 4) {
      if (dealCount % 2 === 0) {
        dealNewCard(fetchedData, player);
        dealCount++;
      } else {
        dealNewCard(fetchedData, dealer);
        dealCount++;
      }
      runCount++
    }
  }
})


let refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', function(event) {
  window.location.reload();
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
        fetchedData.push({
          imgAddress: cardsObj[i].image,
          cardValue: cardsObj[i].value
        })
      }
      return Promise.all(fetchedData);
    })
}



function dealNewCard(arr, dealTo) {
  let tempVar = '';
  for (var i = 0; i < 1; i++) {
    if (dealTo === player) {
      assignCard(arr[i].imgAddress, player);
      caluculateCount(arr[i].cardValue);
      // updatePlayerGameStats(arr[i].cardValue);
      tempVar = arr.shift();
      discardedCardArr.push(tempVar);
    } else if (dealTo === dealer) {
      assignCard(arr[i].imgAddress, dealer);
      caluculateCount(arr[i].cardValue);
      // changeDealerTotal(arr[i].cardValue);
      tempVar = arr.shift();
      discardedCardArr.push(tempVar);
    }
  }
}


//
function assignCard(cardImgAdress, dealTo) {
  let img = new Image();
  img.style.width = '170px';
  img.style.height = '220px';

  if (dealTo === dealer) {
    if (dealCount === 1) {
      dealerHiddenCardValue.push(cardImgAdress);
      img.src = './images/cheetah.jpg';
      hiddenCard = img;
      hiddenCard.style.float = 'left';
      return dealerBody.appendChild(hiddenCard);
    }
    else {
      img.src = cardImgAdress.toString();
      dealer = img;
      dealer.style.float = 'left';
      return dealerBody.appendChild(dealer);
    }
  }
  else if (dealTo === player) {
    img.src = cardImgAdress.toString();
    player = img;
    player.style.float = 'left';
    return playerBody.appendChild(player);
  }

}





function caluculateCount(cardVal) {
  // console.log('card value in caluculateCount: '+cardVal);
  if ((dealCount === 1)) {
    dealerHiddenCardValue.push(cardVal);
    cardVal = 0;
    dealerTotal += parseInt(cardVal);
    document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
  }

  else if (dealCount % 2 === 0) {
    if (!parseInt(cardVal)) {
      if (cardVal === 'ACE') {
        valueOfAce(cardVal, player);
        document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerTotal;
        return
      }
      cardVal = 10;
    }
    playerTotal += parseInt(cardVal);
    document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerTotal;
  }

  else {
    if (!parseInt(cardVal)) {
      if (cardVal === 'ACE') {
        valueOfAce(cardVal, dealer);
        document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
        return
      }
      cardVal = 10;
    }
    dealerTotal += parseInt(cardVal);
    document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
  }
}






function valueOfAce(value, countOn) {
  if (countOn === player) {
    if (playerTotal < 10) {
      // console.log('if player count is < 10');
      value = 11;
      playerTotal += value;
      document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerTotal;
      return;
    } else if (playerTotal > 10) {
      // console.log('if player count is > 10');
      value = 1;
      playerTotal += value;
      document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerTotal;
      return;
    }
  }

   else if (countOn === dealer) {
    if (dealerTotal < 10) {
      // console.log('if dealer count is < 10');
      value = 11;
      dealerTotal += value;
      document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
      return;
    } else if (dealerTotal > 10) {
      // console.log('if dealer count is > 10');
      value = 1;
      dealerTotal += value;
      document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
      return;
    }
  }
}







function changeDealerTotal() {
  if (playerTotal > 21) {
    changeHiddenCardImage();
    changeHiddenCardValue();
    document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
  }
  else {
    while (dealerTotal < 17) {
      dealNewCard(fetchedData)
      changeHiddenCardImage();
      changeHiddenCardValue();
      document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerTotal;
      // updatePlayerGameStats();
    }
  }
}


function changeHiddenCardImage() {
  hiddenCard.src = dealerHiddenCardValue[0].toString();
  hiddenCard.style.float = 'left';
  return dealerBody.appendChild(hiddenCard);
}


function changeHiddenCardValue() {
  let tempVal = dealerHiddenCardValue[1].cardValue;
  if (!parseInt(tempVal)) {
    if (tempVal === 'ACE') {
      return valueOfAce(tempVal, dealerTotal);
    }
    tempVal = 10;
  }
  dealerTotal += parseInt(tempVal);
  return dealerTotal;
}
