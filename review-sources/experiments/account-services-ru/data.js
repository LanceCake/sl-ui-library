export function total(lines){let sum=0;for(const {unit,quantity}of lines){if(!Number.isSafeInteger(unit)||unit<0||!Number.isSafeInteger(quantity)||quantity<0||!Number.isSafeInteger(unit*quantity)||!Number.isSafeInteger(sum+unit*quantity))throw new TypeError('Expected safe nonnegative integer minor units');sum+=unit*quantity;}return sum;}
export function formatMoney(minor){if(!Number.isSafeInteger(minor)||minor<0)throw new TypeError('Expected integer minor units');return new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:2}).format(minor/100);}
export const orderSamples=Object.freeze([
 {id:'order-a',title:'Заказ от 12 октября',meta:'Получен · 2 позиции',lines:[{id:'notebook',title:'Блокнот',unit:89000,quantity:2},{id:'pen',title:'Ручка',unit:32000,quantity:1}],address:'Новосибирск, ул. Лесная, 12'},
 {id:'order-b',title:'Заказ от 5 октября',meta:'Получен · 1 позиция',lines:[{id:'bag',title:'Сумка',unit:249000,quantity:1}],address:'Новосибирск, ул. Мира, 8'},
]);
export const documentSamples=Object.freeze([
 {id:'invoice',title:'Счёт за октябрь',type:'invoice',meta:'12 октября · Оплачен',lines:[{title:'Подписка на месяц',unit:99000,quantity:1}]},
 {id:'receipt',title:'Квитанция за заказ',type:'receipt',meta:'12 октября · Оплачено',lines:orderSamples[0].lines},
 {id:'previous',title:'Счёт за сентябрь',type:'invoice',meta:'12 сентября · Оплачен',lines:[{title:'Подписка на месяц',unit:99000,quantity:1}]},
]);
