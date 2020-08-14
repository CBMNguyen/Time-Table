
var action=setInterval(function(){
  var time=new Date();   
  var svn=time.getSeconds();
  var mvn=time.getMinutes();
  var hvn=time.getHours();
  var spvn=svn*6;
  var mpvn=(mvn+svn/60)*6;
  var hpvn=(hvn+mvn/60)*30;
  $('#second_vn').css('transform','rotate('+spvn+'deg)');
  $('#minute_vn').css('transform','rotate('+mpvn+'deg)');
  $('#hour_vn').css('transform','rotate('+hpvn+'deg)');
},1000)