'use strict'

const priceSlider = document.querySelector('.calculate__rating');
 if (priceSlider) {
 
     let textFrom = priceSlider.getAttribute('data-from');
     let textTo = priceSlider.getAttribute('data-to');
 
     noUiSlider.create(priceSlider, {
         start: [100, 3700],
         connect: true,
         step: 1,
         tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
         range: {
             'min': [100],
             'max': [3700]
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
let price = [0.09, 0.1, 0.13, 0.14, 0.16, 0.18, 0.22, 0.27, 0.3, 0.336, 0.44, 0.5, 0.6, 0.66, 0.72, 0.8216, 0.8944, 0.9568, 1.0296],
    rating_categories = [100, 950, 1100, 1250, 1400, 1550, 1700, 1850, 2000, 2150, 2300, 2450, 2600, 2750, 2900, 3050, 3200, 3350, 3500, 3700],
    rating_icons = ['./img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_1.jpg', './img/icons/ranks/rank_10.jpg', './img/icons/ranks/rank_9.jpg', './img/icons/ranks/rank_8.jpg', './img/icons/ranks/rank_7.jpg', './img/icons/ranks/rank_6.jpg', './img/icons/ranks/rank_5.jpg', './img/icons/ranks/rank_4.jpg', './img/icons/ranks/rank_3.jpg', './img/icons/ranks/rank_2.jpg', './img/icons/ranks/rank_1.jpg'],
    filterPriority = document.getElementById('filterPriority'),
    filterLobby = document.getElementById('filterLobby'),
    filterPremium = document.getElementById('filterPremium'),
    final_price = document.querySelector('.final-price'),
    current_rank = document.querySelector('.current-rank'),
    desired_rank = document.querySelector('.desired-rank');
let formNum = document.getElementById('formNum'),
    formNum1 = document.getElementById('formNum1');
function update_icon() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]);
    for (let index = 0; index < rating_categories.length; index++) {
        if(rating_categories[index] <= max) {
            desired_rank.setAttribute('src', rating_icons[index])
        }
    }
    for (let index = 0; index < rating_categories.length; index++) {
        if(rating_categories[index] <= min) {
            current_rank.setAttribute('src', rating_icons[index])
        }
    }
}
function calculate_summ() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]),
        summ = 0;
    for (let index = 0; index < rating_categories.length - 1; index++) {
        if (rating_categories[index] >= min && rating_categories[index] <= max) {
            summ += price[index];
        }
    }
    if (filterLobby.checked) {
        final_price.textContent = summ.toFixed(3)
    }
    else if (filterPriority.checked) {
        final_price.textContent = (summ / 100 * 15 + summ).toFixed(3)
    }
    else if (filterPremium.checked) {
        final_price.textContent = (summ / 100 * 70 + summ).toFixed(3)
    }
    else {
        final_price.textContent = summ.toFixed(3)
    }
}
function set_input_value_by_range() {
    let min = parseInt(priceSlider.noUiSlider.get()[0]),
        max = parseInt(priceSlider.noUiSlider.get()[1]);
        formNum.value = min
        formNum1.value = max
}
function set_range_value_by_input() {
    
    formNum.addEventListener('change', (e) => {
        let max = parseInt(priceSlider.noUiSlider.get()[1]);
        priceSlider.noUiSlider.set([parseInt(formNum.value), max])
        update_summ()
    })
    formNum1.addEventListener('change', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0])
        priceSlider.noUiSlider.set([min, parseInt(formNum1.value)])
        update_summ()
    })
    
}
function update_summ() {
    filterPriority.addEventListener('input', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0]),
            max = parseInt(priceSlider.noUiSlider.get()[1]);
        let summ = 0;
        for (let index = 0; index < rating_categories.length - 1; index++) {
            if (rating_categories[index] >= min && rating_categories[index] <= max) {
                summ += price[index];
            }
        }
        if (filterLobby.checked) {
            final_price.textContent = summ.toFixed(3)
        }
        else if (filterPriority.checked) {
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(3)
        }
        else if (filterPremium.checked) {
            final_price.textContent = (summ / 100 * 70 + summ).toFixed(3)
        }
        else {
            final_price.textContent = summ.toFixed(3)
        }
        
    })
    filterLobby.addEventListener('input', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0]),
            max = parseInt(priceSlider.noUiSlider.get()[1]);
        let summ = 0;
        

        for (let index = 0; index < rating_categories.length - 1; index++) {
            if (rating_categories[index] >= min && rating_categories[index] <= max) {
                summ += price[index];
            }
        }
        if (filterLobby.checked) {
            final_price.textContent = summ.toFixed(3)
        }
        else if (filterPriority.checked) {
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(3)
        }
        else if (filterPremium.checked) {
            final_price.textContent = (summ / 100 * 70 + summ).toFixed(3)
        }
        else {
            final_price.textContent = summ.toFixed(3)
        }
    })
    filterPremium.addEventListener('input', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0]),
            max = parseInt(priceSlider.noUiSlider.get()[1]);
        let summ = 0;
        

        for (let index = 0; index < rating_categories.length - 1; index++) {
            if (rating_categories[index] >= min && rating_categories[index] <= max) {
                summ += price[index];
            }
        }
        if (filterLobby.checked) {
            final_price.textContent = summ.toFixed(3)
        }
        else if (filterPriority.checked) {
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(3)
        }
        else if (filterPremium.checked) {
            final_price.textContent = (summ / 100 * 70 + summ).toFixed(3)
        }
        else {
            final_price.textContent = summ.toFixed(3)
        }
    })
}
priceSlider.noUiSlider.on('update', set_input_value_by_range)
priceSlider.noUiSlider.on('update', calculate_summ)
priceSlider.noUiSlider.on('update', update_icon)
set_range_value_by_input()
update_summ()