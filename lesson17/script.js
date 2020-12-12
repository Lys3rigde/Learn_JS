'use strict';

const cityArr = {
    rus: ["Москва", "Санк-Петербург", "Омск", "Екатеринбург", "Рязань", "Казань", "Тверь"],
    uk: ["Киев", "Харьков", "Одесса", "Днепр", "Ялта", "Симферополь", "Львов"],
    bel: ["Минск", "Гомель", "Могилёв", "Брест"],
    jap: ["Токио", "Киото", "Осака", "Иокогама"]
  };
  
  const city = document.querySelector('#city');
  
  const selectCountry = () => {
      city.style.display = 'inline-block';
      city.innerHTML = '';
      cityArr[event.target.value].forEach((item) => {
          const option = document.createElement('option');
          option.innerText = item;
          option.value = event.target.options[event.target.options.selectedIndex].text;
          city.append(option);
      });
  };
  
  document.querySelector('#country').addEventListener('change', selectCountry);
  
  city.addEventListener('change', () => {
      document.querySelector('.result').innerText = event.target.value + ', ' + 
          event.target.options[event.target.options.selectedIndex].text;
  });