//requestAnimationFrame 兼容大部分浏览器 (1000/60 貌似是最佳频率)
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
