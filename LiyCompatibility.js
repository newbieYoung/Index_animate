//requestAnimationFrame ���ݴ󲿷������ (1000/60 ò�������Ƶ��)
window.requestAnimationFrame = window.requestAnimationFrame 
							|| window.mozRequestAnimationFrame 
							|| window.webkitRequestAnimationFrame 
							|| window.msRequestAnimationFrame 
							|| window.oRequestAnimationFrame 
							|| function(callback) { 
									setTimeout(callback, 1000 / 60); 
							   }
							|| function(callback)  {
									setInterval(callback, 1000 / 60);
							   };
