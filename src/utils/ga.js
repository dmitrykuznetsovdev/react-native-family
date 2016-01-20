let GA = {
  init(){
    this.printed();
  },

  time(time){

  },

  page(pageUrl, pageTitle){

  },

  /**
   * переходы между страницами
   */
  transitionPage(){
    if(window.ga)
      window.ga('send', 'pageview');
  },

  search(gender, year, value){
    if(window.ga)
      window.ga('send', 'event', 'items', gender, year, value);
  },

  shop(buyTitle, shopTitle, price){
    if(window.ga)
      window.ga('send', 'event', 'buy_click', buyTitle, shopTitle, price);
  },

  checklist(gender, classes){
    if(window.ga)
      window.ga('send', 'event', 'checklist', gender, classes);
  },

  //print
  printed(){
    window._print = window.print;
    window.print = function() {
      if(window.ga)
        window.ga('send', 'event', 'print');
      window._print();
    }
  },

  mail(){
    if(window.ga)
      window.ga('send', 'event', 'mail');
  }
}

export default GA;
// 1. чеклист -checklist (при нажатии на Cобрать) - с главной или со страницы чеклисты
// 2. принт - print
// 3. отправить на почту - mail
// 4. логотип - dm-logo
// 5. интервал времени - 3минуты
// 6. собрать ребенка в школу. на главной. call_to_action
// 7. топлайн. topline. (r-pochta.) и кнопочка Еще".
// 8. 800пиксель. отправлять по скроллу.
