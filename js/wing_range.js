'use strict'


 const priceSliderThree = document.querySelector('.calculate-wing-rating');
 if (priceSliderThree) {
 
     let textFrom = priceSliderThree.getAttribute('data-from');
     let textTo = priceSliderThree.getAttribute('data-to');
 
     noUiSlider.create(priceSliderThree, {
         start: [1, 18],
         connect: true,
         step: 1,
         tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
         range: {
             'min': [1],
             'max': [18]
         }
     });
 
     /*
     const priceStart = document.getElementById('price-start');
     const priceEnd = document.getElementById('price-end');
     priceStart.addEventListener('change', setPriceValues);
     priceEnd.addEventListener('change', setPriceValues);
     */
     
     function setPriceValues() {
         let priceStartValue;
         let priceEndValue;
         if (priceStart.value != '') {
             priceStartValue = priceStart.value;
         }
         if (priceEnd.value != '') {
             priceEndValue = priceEnd.value;
         }
         priceSliderThree.noUiSlider.set([priceStartValue, priceEndValue]);
     }
 }
let wing_price = [0, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 9, 12, 21, 24],
    wing_rank_names = ['Silver I', 'Silver II', ' Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master', ' Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master', 'Master Guardian I','Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian', 'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'The Global Elite'],
    wing_rank_icons = ['./img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_2.jpg', './img/icons/ranks/rank_3.jpg', './img/icons/ranks/rank_4.jpg', './img/icons/ranks/rank_5.jpg', './img/icons/ranks/rank_6.jpg', './img/icons/ranks/rank_7.jpg', './img/icons/ranks/rank_8.jpg', './img/icons/ranks/rank_9.jpg', './img/icons/ranks/rank_10.jpg', './img/icons/ranks/rank_11.jpg','./img/icons/ranks/rank_12.jpg', './img/icons/ranks/rank_13.jpg', './img/icons/ranks/rank_14.jpg', './img/icons/ranks/rank_15.jpg', './img/icons/ranks/rank_16.jpg', './img/icons/ranks/rank_17.jpg', './img/icons/ranks/rank_18.jpg']

// let wing_slider = priceSliderThree.noUiSlider;
let wing_desired_rating = document.querySelector('.wing-desired-rating'),
    wing_current_rating = document.querySelector('.wing-current-rating'),
    wing_current_icon = document.querySelector('.wing-current-icon'),
    wing_desired_icon = document.querySelector('.wing-desired-icon'),
    wing_final_price = document.querySelector('.wing-final-price'),
    wing_filterPriority = document.getElementById('filterPriority-wing'),
    wing_filterLobby = document.getElementById('filterLobby-wing');
/**
 * Обновляем название ранга
 */
function update_rank_name() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]);
    wing_current_rating.textContent = wing_rank_names[min-1]
    wing_desired_rating.textContent = wing_rank_names[max-1]
}

/**
 * Обновляем иконку ранга
 */
function update_rank_icon() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]);
    wing_current_icon.setAttribute('src', wing_rank_icons[min-1])
    wing_desired_icon.setAttribute('src', wing_rank_icons[max-1])
}
function calculate_summ() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]),
        summ = 0;
    for (let index = min; index <= max-1; index++) {
        summ += wing_price[index]   
    }
    if (wing_filterLobby.checked){
        wing_final_price.textContent = (summ / 100 * 50 + summ).toFixed(2) + '$'
    }
    else if (wing_filterPriority.checked){
        wing_final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
    }
    
}
function update_summ() {
    wing_filterLobby.addEventListener('input', (e) => {
        let min = parseInt(priceSliderThree.noUiSlider.get()[0]),
            max = parseInt(priceSliderThree.noUiSlider.get()[1]);
        let summ = 0;
        for (let index = min; index <= max-1; index++) {
            summ += wing_price[index]   
        }
        if (wing_filterLobby.checked){
            wing_final_price.textContent = (summ / 100 * 50 + summ).toFixed(2) + '$'
        }
        else if (wing_filterPriority.checked){
            wing_final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
        }
    })
    filterLobby.addEventListener('input', (e) => {
        let min = parseInt(priceSliderThree.noUiSlider.get()[0]),
            max = parseInt(priceSliderThree.noUiSlider.get()[1]);
        let summ = 0;
        for (let index = min; index <= max-1; index++) {
            summ += wing_price[index]   
        }
        if (wing_filterLobby.checked){
            wing_final_price.textContent = (summ / 100 * 50 + summ).toFixed(2) + '$'
        }
        else if (wing_filterPriority.checked){
            wing_final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
        }
    })
}
priceSliderThree.noUiSlider.on('update', update_rank_name)
priceSliderThree.noUiSlider.on('update', update_rank_icon)
priceSliderThree.noUiSlider.on('update', calculate_summ)
update_summ()