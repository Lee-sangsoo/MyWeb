var Links = {
  setColor : function(color){
    $('a').css('color', color);
  }
};

var Body = {
  setColor : function(color){
    $('body').css('color', color);
  },
  setBackgroundColor : function(color){
    $('body').css('backgroundColor', color);
  }
};

function modHandler(self){
  var target = document.querySelector('body');
  if(self.value === '다크 모드'){
    Body.setBackgroundColor('#1e1f21');
    Body.setColor('white');
    document.querySelector('#homekey').style.color='white';
    self.value = '화이트 모드';

    Links.setColor('powderblue');
  }
  else{
    Body.setBackgroundColor('white');
    Body.setColor('black');
    document.querySelector('#homekey').style.color='black';
    self.value = '다크 모드';

    Links.setColor('gray');
  }
}
