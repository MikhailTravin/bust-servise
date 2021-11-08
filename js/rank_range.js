'use strict'


 const priceSlider = document.querySelector('.calculate-mm-rating');
 if (priceSlider) {
 
     let textFrom = priceSlider.getAttribute('data-from');
     let textTo = priceSlider.getAttribute('data-to');
 
     noUiSlider.create(priceSlider, {
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
         priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
     }
 }
let mm_price = [0, 4.8, 4.8, 4.8, 4.8, 4.8, 5.6, 5.6, 5.6, 5.6, 6.4, 6.4, 6.4, 7.2, 9.6, 12.8, 21.6, 24.8],
    mm_rank_names = ['Silver I', 'Silver II', ' Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master', ' Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master', 'Master Guardian I','Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian', 'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'The Global Elite'],
    mm_rank_icons = ['./img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_2.jpg', './img/icons/ranks/rank_3.jpg', './img/icons/ranks/rank_4.jpg', './img/icons/ranks/rank_5.jpg', './img/icons/ranks/rank_6.jpg', './img/icons/ranks/rank_7.jpg', './img/icons/ranks/rank_8.jpg', './img/icons/ranks/rank_9.jpg', './img/icons/ranks/rank_10.jpg', './img/icons/ranks/rank_11.jpg','./img/icons/ranks/rank_12.jpg', './img/icons/ranks/rank_13.jpg', './img/icons/ranks/rank_14.jpg', './img/icons/ranks/rank_15.jpg', './img/icons/ranks/rank_16.jpg', './img/icons/ranks/rank_17.jpg', './img/icons/ranks/rank_18.jpg']

let mm_slider = priceSlider.noUiSlider;
let mm_desired_rating = document.querySelector('.mm-desired-rating'),
    mm_current_rating = document.querySelector('.mm-current-rating'),
    mm_current_icon = document.querySelector('.mm-current-icon'),
    mm_desired_icon = document.querySelector('.mm-desired-icon'),
    final_price = document.querySelector('.mm-final-price'),
    filterPriority = document.getElementById('filterPriority-mm'),
    filterLobby = document.getElementById('filterLobby-mm');
/**
 * Обновляем название ранга
 */
function update_rank_name() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]);
    mm_current_rating.textContent = mm_rank_names[min-1]
    mm_desired_rating.textContent = mm_rank_names[max-1]
}

/**
 * Обновляем иконку ранга
 */
function update_rank_icon() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]);
    mm_current_icon.setAttribute('src', mm_rank_icons[min-1])
    mm_desired_icon.setAttribute('src', mm_rank_icons[max-1])
}
function calculate_summ() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]),
        summ = 0;
    for (let index = min; index <= max-1; index++) {
        summ += mm_price[index]   
    }
    if (filterPriority.checked){
        final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
    }
    else {
        final_price.textContent = summ.toFixed(2) + '$'
    }
    
}
function update_summ() {
    filterPriority.addEventListener('input', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0]),
            max = parseInt(priceSlider.noUiSlider.get()[1]);
        let summ = 0;
        for (let index = min; index <= max-1; index++) {
            summ += mm_price[index]   
        }
        if (filterPriority.checked){
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
        }
        else {
            final_price.textContent = summ.toFixed(2) + '$'
        }
    })
    filterLobby.addEventListener('input', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0]),
            max = parseInt(priceSlider.noUiSlider.get()[1]);
        let summ = 0;
        for (let index = min; index <= max-1; index++) {
            summ += mm_price[index]   
        }
        if (filterPriority.checked){
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
        }
        else {
            final_price.textContent = summ.toFixed(2) + '$'
        }
    })
}
priceSlider.noUiSlider.on('update', update_rank_name)
priceSlider.noUiSlider.on('update', update_rank_icon)
priceSlider.noUiSlider.on('update', calculate_summ)
update_summ()