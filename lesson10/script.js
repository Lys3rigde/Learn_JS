'use strict';

const adv = document.querySelector('.adv'),
books = document.querySelectorAll('.books'),
book = document.querySelectorAll('.book'),
header = document.getElementsByTagName('h2')[2];

    books[0].append(book[1], book[0], book[4], book[3], book[5], book[2]);


    header.insertAdjacentHTML = "<h2>Книга 3. this и Прототипы Объектов</h2>";  

const firstCollection = document.querySelectorAll('ul')[1],
elems1 = firstCollection.querySelectorAll('li');
    firstCollection.append(elems1[0], elems1[1], elems1[3], elems1[6], elems1[8], elems1[4], elems1[5], 
        elems1[7], elems1[9], elems1[2], elems1[10]);
        
const secondCollection = document.querySelectorAll('ul')[4],
elems2 = secondCollection.querySelectorAll('li');
        secondCollection.append(elems2[0], elems2[1], elems2[9], elems2[3], elems2[4], elems2[2], 
            elems2[6], elems2[7], elems2[5], elems2[8], elems2[10]);

const thirdCollection = document.querySelectorAll('ul')[5],
elems3 = thirdCollection.querySelectorAll('li'),
elemClone = elems3[8].cloneNode(true);
    thirdCollection.append(elemClone);
    elems3[8].after(elemClone);
    elemClone.textContent = "Глава 8: За пределами ES6";

    adv.remove();
    document.body.style.background = 'url(image/you-dont-know-js.jpg) center';