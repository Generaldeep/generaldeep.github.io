//appends 1 card to the body
// let body = document.getElementById('div');
// let imgDiv = document.getElementById('img')
// let img = new Image();
//
// function getCards() {
//   let deckID = 'ooqeswm545l5';
//   return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(jsonObj) {
//     let cardsObj = jsonObj.cards[0].images.svg;//svg
//     return cardsObj
//   })
//   .then(function(card) {
//   img.src = card.toString();
//   imgDiv = img;
//   body.appendChild(imgDiv);
//   })
// }

// getCards();


//append multiple cards to body
// let body = document.getElementById('div');
// let imgDiv = document.getElementById('img')
//
// function getCards() {
//   let cardsArr = [];
//   let deckID = 'swdy4xrtjg3a';
//   return fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(jsonObj) {
//     // let cardsObj = jsonObj.cards[0].images.svg;
//     let cardsObj = jsonObj.cards;
//
//     for (var i = 0; i < cardsObj.length; i++) {
//       cardsArr.push(cardsObj[i].image);
//     }
//     return Promise.all(cardsArr);
//   })
//   .then(function(card) {
//     return card.forEach(function(elem) {
//       let img = new Image();
//       img.src = elem.toString();
//       imgDiv = img;
//       body.appendChild(imgDiv);
//     })
//   })
// }
// getCards();



//code below has play button deal 4 cards, the button is disabled
//hit button enabled but the hit button goes from player to dealer
// let body = document.getElementById('div');
// let player = document.getElementById('player');
// let dealer = document.getElementById('dealer');
// let playBtnCount = 0; //if count === 4 play button disabled until new hand
// let counterInCardFunc = 0;//method to deal cards to player/dealer
// let playerCount = 0;//total of player
// let dealerCount = 0;//total of dealer
//
// let playButton = document.getElementById('play');
// playButton.addEventListener('click', function(event){
//   event.preventDefault();
//   while(playBtnCount < 4){
//     fetchCard()
//     playBtnCount++;
//   }
// })
//
// let hitButton = document.getElementById('hit')
// hitButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   fetchCard();
// })
//
// function fetchCard() {
//   let imgURL = [];
//   // let deckID = '9lykfe2jz7o4';
//   return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(jsonObj) {
//     let cardsObj = jsonObj.cards;
//     for (var i = 0; i < cardsObj.length; i++) {
//       imgURL.push({
//         imgAddress: cardsObj[i].image,
//         cardValue: cardsObj[i].value
//       })
//     }
//     return Promise.all(imgURL);
//   })
//   .then(function(card) {
//     cardValueFunc(card);
//   })
// }
//
// function cardValueFunc(arr) {
//   counterInCardFunc++;
//     let tempArr = arr.forEach(function(elem) {
//       let img = new Image();
//       img.src = elem.imgAddress.toString();
//
//       if(counterInCardFunc % 2 === 1) {
//         player.style.float = 'left';
//         player = img;
//         body.appendChild(player);
//
//         if (!parseInt(elem.cardValue)) {
//           if(elem.cardValue === 'ACE') {
//             console.log('it is an Ace');
//           }
//           elem.cardValue = 10;
//         }
//         playerCount += parseInt(elem.cardValue);
//         console.log(playerCount);
//       }
//
//       else {
//         dealer = img;
//         dealer.style.float = 'right';
//         body.appendChild(dealer);
//
//         if(!parseInt(elem.cardValue)) {
//           if(elem.cardValue === 'ACE') {
//             console.log('it is an Ace');
//           }
//           elem.cardValue = 10;
//         }
//         dealerCount+= parseInt(elem.cardValue);
//         console.log(dealerCount);
//       }
//     })
// }





//refactor code with caluculateCount function delagating roles
// let body = document.getElementById('div');
// let player = document.getElementById('player');
// let dealer = document.getElementById('dealer');
// let playBtnCount = 0; //if count === 4 play button disabled until new hand
// let counterInCardFunc = 0; //method to deal cards to player/dealer
// let playerCount = 0; //total of player
// let dealerCount = 0; //total of dealer
//
// let playButton = document.getElementById('play');
// playButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   while (playBtnCount < 4) {
//     fetchCard()
//     playBtnCount++;
//   }
// })
//
// let hitButton = document.getElementById('hit')
// hitButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   if (playBtnCount < 4) {
//     alert('Please press play for a new hand');
//   } else {
//     counterInCardFunc = 0;
//     fetchCard();
//   }
// })
//
//
// function fetchCard() {
//   let imgURL = [];
//   // let deckID = '9lykfe2jz7o4';
//   return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(jsonObj) {
//       let cardsObj = jsonObj.cards;
//       for (var i = 0; i < cardsObj.length; i++) {
//         imgURL.push({
//           imgAddress: cardsObj[i].image,
//           cardValue: cardsObj[i].value
//         })
//       }
//       return Promise.all(imgURL);
//     })
//     .then(function(card) {
//       return cardValueFunc(card);
//     })
// }
//
//
// function cardValueFunc(arr) {
//   let tempArr = arr.forEach(function(elem) {
//     assignCard(elem.imgAddress)
//     caluculateCount(elem.cardValue);
//     return counterInCardFunc++;
//   });
//   console.log('Player: ' + playerCount);
//   console.log('Dealer: ' + dealerCount);
// }
//
// function assignCard(imgURL) {
//   let img = new Image();
//   //assigns img to player if counter is even, if off img assigned to dealer
//   if (counterInCardFunc % 2 === 0) {
//     img.src = imgURL.toString();
//     player = img;
//     player.style.float = 'left';
//     body.appendChild(player);
//   } else {
//     img.src = imgURL.toString();
//     dealer = img;
//     dealer.style.float = 'right';
//     body.appendChild(dealer);
//   }
// }
//
//
// function caluculateCount(cardVal) {
//   if (counterInCardFunc % 2 === 0) {
//     if (!parseInt(cardVal)) {
//       if (cardVal === 'ACE') {
//         return valueOfAce(cardVal, playerCount);
//       }
//       cardVal = 10;
//     }
//     playerCount += parseInt(cardVal);
//   } else {
//     if (!parseInt(cardVal)) {
//       if (cardVal === 'ACE') {
//         return valueOfAce(cardVal, dealerCount);
//       }
//       cardVal = 10;
//     }
//     dealerCount += parseInt(cardVal);
//   }
// }
//
//
// function valueOfAce(value, countOn) {
//   // console.log(countOn);
//   if (countOn === playerCount) {
//     // console.log(playerCount);
//     if (playerCount <= 10 && playerCount >= 0) {
//       value = 11;
//       return playerCount += value;
//     } else if (playerCount > 10) {
//       value = 1;
//       return playerCount += value;
//     }
//   }
//   else if (countOn === dealerCount) {
//     if (dealerCount <= 10 && dealerCount >= 0) {
//       value = 11;
//       return dealerCount += value;
//     } else if (dealerCount > 10) {
//       value = 1;
//       return dealerCount += value;
//     }
//   }
// }




















//








/*




practice













*/






//test code to fix stackoverflow issue
// function fetchCard() {
//   let imgURL = [];
//   // let deckID = '9lykfe2jz7o4';
//   return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=10`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(jsonObj) {
//       let cardsObj = jsonObj.cards;
//       for (var i = 0; i < cardsObj.length; i++) {
//         imgURL.push({
//           imgAddress: cardsObj[i].image,
//           cardValue: cardsObj[i].value
//         })
//       }
//       return Promise.all(imgURL);
//     })
//     .then(function(card) {
//       console.log(card);
//       // allCardsArray.push(card);
//       // console.log(allCardsArray);
//       // return allCardsArray;
//     })
//     return Promise.all(allCardsArray);
// }















//Feb 8th code

// let playerBody = document.getElementById('playBodyDiv');
// let dealerBody = document.getElementById('dealerBodyDiv');
// let player = document.getElementById('player');
// let dealer = document.getElementById('dealer');
// let hiddenCard = document.getElementById('dealer');
// let playBtnCount = 0; //if count === 4 play button disabled until new hand
// let runningCardCount = 0; //method to deal cards to player/dealer
// let playerCount = 0; //total of player
// let dealerCount = 0; //total of dealer
// let cardsAndValuesArray = [];
// let dealerHiddenCardValue = [];
// let cardImgAndValueArr = [];
//
//
// let playButton = document.getElementById('play');
// playButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   while (playBtnCount < 10) {
//     fetchCard()
//     playBtnCount++;
//   }
//   // console.log(allCardsArray);
//   // delegateRoles(allCardsArray);
// })
//
// let hitButton = document.getElementById('hit')
// hitButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   if (playBtnCount < 4) {
//     alert('Please press play for a new hand');
//   } else {
//     runningCardCount = 0;
//     fetchCard();
//   }
// })
//
//
// let standButton = document.getElementById('stand');
// standButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   runningCardCount = 3;
//   checkDealerTotal();
// })
//
// let newGame = document.getElementById('newGame');
// newGame.addEventListener('click', function(event) {
//   event.preventDefault();
//
//   while (playerBody.firstChild && dealerBody.firstChild) {
//       playerBody.removeChild(playerBody.firstChild);
//       dealerBody.removeChild(dealerBody.firstChild);
//   }
//   // fetchCard()
//   playBtnCount = 0;
//   playerCount = 0;
//   dealerCount = 0;
//   console.log(playBtnCount);
//   console.log(runningCardCount);
// })
//
//
// // working
// // function fetchCard() {
// //   let cardImgAndValueArr = [];
// //   // let deckID = '9lykfe2jz7o4';
// //   return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
// //     .then(function(response) {
// //       return response.json();
// //     })
// //     .then(function(jsonObj) {
// //       let cardsObj = jsonObj.cards;
// //       for (var i = 0; i < cardsObj.length; i++) {
// //         cardImgAndValueArr.push({
// //           imgAddress: cardsObj[i].image,
// //           cardValue: cardsObj[i].value
// //         })
// //       }
// //       return Promise.all(cardImgAndValueArr);
// //     })
// //     .then(function(card) {
// //       delegateRoles(card);
// //       return card;
// //     })
// // }
//
//
// //stop async mistake function attempt
// function fetchCard() {
//   // let cardImgAndValueArr = [];
//   // let deckID = '9lykfe2jz7o4';
//   return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(jsonObj) {
//       let cardsObj = jsonObj.cards;
//       for (var i = 0; i < cardsObj.length; i++) {
//         cardImgAndValueArr.push({
//           imgAddress: cardsObj[i].image,
//           cardValue: cardsObj[i].value
//         })
//       }
//       return Promise.all(cardImgAndValueArr);
//     })
//     // .then(function(card) {
//     //
//     // })
// }
//
// console.log(cardImgAndValueArr);
//
// function delegateRoles(arr) {
//   let tempArr = arr.forEach(function(elem) {
//     assignCard(elem.imgAddress);
//     caluculateCount(elem.cardValue);
//     checkForBlackjack(playerCount);
//     runningCardCount++;
//   });
//   // console.log('Player count: ' + playerCount);
//   // console.log('Dealer count: ' + dealerCount);
// }
//
// function assignCard(cardImgAndValueArr) {
//   let img = new Image();
//   img.style.width = '170px';
//   img.style.height = '220px';
//
//   if (runningCardCount === 1 && playBtnCount === 4) {
//     dealerHiddenCardValue.push(cardImgAndValueArr);
//     img.src = './images/cheetah.jpg';
//     hiddenCard = img;
//     hiddenCard.style.float = 'left';
//     return dealerBody.appendChild(img);
//   }
//   else if (runningCardCount % 2 === 0) {
//     img.src = cardImgAndValueArr.toString();
//     player = img;
//     player.style.float = 'left';
//     return playerBody.appendChild(player);
//   }
//   else {
//     img.src = cardImgAndValueArr.toString();
//     dealer = img;
//     dealer.style.float = 'left';
//     return dealerBody.appendChild(dealer);
//   }
// }
//
// function caluculateCount(cardVal) {
//   if((runningCardCount === 1 && playBtnCount === 4)){
//     dealerHiddenCardValue.push(cardVal);
//     cardVal = 0;
//     dealerCount += parseInt(cardVal);
//   }
//   else if (runningCardCount % 2 === 0) {
//     if (!parseInt(cardVal)) {
//       if (cardVal === 'ACE') {
//         return valueOfAce(player, playerCount);
//       }
//       cardVal = 10;
//     }
//     playerCount += parseInt(cardVal);
//     document.getElementById("playerScore").innerHTML = 'Player Count: ' + playerCount;
//   } else {
//     if (!parseInt(cardVal)) {
//       if (cardVal === 'ACE') {
//         return valueOfAce(cardVal, dealerCount);
//       }
//       cardVal = 10;
//     }
//     dealerCount += parseInt(cardVal);
//     document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerCount;
//   }
// }
//
//
// function valueOfAce(value, countOn) {
//   if (countOn === playerCount) {
//     if (playerCount <= 10 && playerCount >= 0) {
//       value = 11;
//       return playerCount += value;
//     } else if (playerCount > 10) {
//       value = 1;
//       return playerCount += value;
//     }
//   }
//   else if (countOn === dealerCount) {
//     if (dealerCount <= 10 && dealerCount >= 0) {
//       value = 11;
//       return dealerCount += value;
//     } else if (dealerCount > 10) {
//       value = 1;
//       return dealerCount += value;
//     }
//   }
// }
//
// function checkForBlackjack(playerCount){
//   if(playerCount === 21) {
//     console.log('Blackjack!')
//   }
//   else if(playerCount > 21) {
//     console.log('Busted! ' + 'count: ' + playerCount)
//     return checkDealerTotal();
//   }
//   return;
// }
//
//
// function checkDealerTotal() {
//   // if(playerCount === 21) {
//   //   changeHiddenCardImage();
//   //   changeHiddenCardImage();
//   // }
//
//   changeHiddenCardImage();
//   changeHiddenCardValue();
//   document.getElementById("dealerScore").innerHTML = 'Dealer Count: ' + dealerCount;
//
//
// while (dealerCount < 17) {
//   debugger;
//   fetchCard();
// }
//   if(playerCount < 21 && dealerCount < 17) {
//     return fetchCard();
//   }
//   else if(playerCount > 21) {
//     changeHiddenCardImage();
//     changeHiddenCardValue();
//     console.log('Game over!');
//   }
//
//   else {
//     console.log('game over');
//   }
// }
//
//
// function changeHiddenCardImage() {
//   hiddenCard.src = dealerHiddenCardValue[0].toString();
//   hiddenCard.style.float = 'left';
//   return dealerBody.appendChild(hiddenCard);
// }
//
// function changeHiddenCardValue() {
//   let tempVal = dealerHiddenCardValue[1];
//
//   if (!parseInt(tempVal)) {
//     if (tempVal === 'ACE') {
//       return valueOfAce(tempVal, dealerCount);
//     }
//     tempVal = 10;
//   }
//   dealerCount += parseInt(tempVal);
//   return dealerCount;
// }
//
// // function storeValue() {
// //
// // }
//
























//

// //




















//
