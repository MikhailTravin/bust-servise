const priceSlider = document.querySelector('.calculate__rating');
 if (priceSlider) {
 
     let textFrom = priceSlider.getAttribute('data-from');
     let textTo = priceSlider.getAttribute('data-to');
 
     noUiSlider.create(priceSlider, {
         start: [1, 12],
         connect: true,
         step: 1,
         tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
         range: {
             'min': [1],
             'max': [12]
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
 let price = [0, 10, 12, 12, 13, 14, 15, 18, 25, 35, 45, 55],
     rank_names = ['Esea -d', 'Esea d', 'Esea d+', 'Esea c-', 'Esea c', 'Esea c+', 'Esea -b', 'Esea b', 'Esea b+', 'Esea a-', 'Esea a','Esea a+'],
     rank_icons = ['./img/esea-d.png', './img/icons/ranks/rank_2.jpg', './img/icons/ranks/rank_3.jpg', './img/icons/ranks/rank_4.jpg', './img/icons/ranks/rank_5.jpg', './img/icons/ranks/rank_6.jpg', './img/icons/ranks/rank_7.jpg', './img/icons/ranks/rank_8.jpg', './img/icons/ranks/rank_9.jpg', './img/icons/ranks/rank_10.jpg', './img/icons/ranks/rank_11.jpg','./img/esea-c.png']
let slider = priceSlider.noUiSlider;

let current_icon = document.querySelector('.current-icon'),
    desired_icon = document.querySelector('.desired-icon'),
    final_price = document.querySelector('.final-price'),
    filterPriority = document.getElementById('filterPriority'),
    filterLobby = document.getElementById('filterLobby');

function update_rank_icon() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]);
    current_icon.setAttribute('src', rank_icons[min-1])
    desired_icon.setAttribute('src', rank_icons[max-1])
}
function calculate_summ() {
    let min = parseInt(this.get()[0]),
        max = parseInt(this.get()[1]),
        summ = 0;
    for (let index = min; index <= max-1; index++) {
        summ += price[index]   
    }
    if (filterPriority.checked){
        final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
    }
    else if(filterLobby.checked) {
        final_price.textContent = (summ / 100 * 50 + summ).toFixed(2) + '$'
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
            summ += price[index]   
        }
        if (filterPriority.checked){
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
        }
        else if(filterLobby.checked) {
            final_price.textContent = (summ / 100 * 50 + summ).toFixed(2) + '$'
        }
    })
    filterLobby.addEventListener('input', (e) => {
        let min = parseInt(priceSlider.noUiSlider.get()[0]),
            max = parseInt(priceSlider.noUiSlider.get()[1]);
        let summ = 0;
        for (let index = min; index <= max-1; index++) {
            summ += price[index]   
        }
        if (filterPriority.checked){
            final_price.textContent = (summ / 100 * 15 + summ).toFixed(2) + '$'
        }
        else if(filterLobby.checked) {
            final_price.textContent = (summ / 100 * 50 + summ).toFixed(2) + '$'
        }
    })
}
priceSlider.noUiSlider.on('update', calculate_summ)
priceSlider.noUiSlider.on('update', update_rank_icon)
update_summ()