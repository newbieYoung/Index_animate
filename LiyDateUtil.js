//-------------------------------------------------------- 
// 日期格式化 
// 格式 
// YYYY/yyyy/YY/yy 年份 
// MM/M 月份 
// W/w 星期 
// dd/DD/d/D 日期 
// hh/HH/h/H 时间 
// mm/m 分钟 
// ss/SS/s/S 秒 
// 示例 ：new Date().format("yyyy-MM-dd hh:mm:ss 星期w");
//------------------------------------------------------- 
Date.prototype.format = function(formatStr) { 
	var str = formatStr; 
	var Week = ['日','一','二','三','四','五','六']; 

	str=str.replace(/yyyy|YYYY/,this.getFullYear()); 
	str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
	 
	str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
	str=str.replace(/M/g,this.getMonth()); 

	str=str.replace(/w|W/g,Week[this.getDay()]); 

	str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
	str=str.replace(/d|D/g,this.getDate()); 

	str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
	str=str.replace(/h|H/g,this.getHours()); 
	str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
	str=str.replace(/m/g,this.getMinutes()); 

	str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
	str=str.replace(/s|S/g,this.getSeconds()); 

	return str; 
} 
//--------------------------------------------------- 
// 字符串转换为Date 
// 返回值：Date
//--------------------------------------------------- 
function parse(strDate){
	return new Date(Date.parse(strDate));
}
//--------------------------------------------------- 
// 判断是否是闰年 
// 返回值：true 是；false 不是
//--------------------------------------------------- 
Date.prototype.isLeapYear = function(){ 
	return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
} 

/**
*计算两个Date的时间差 
*参数 startDate(类型：Date ) endDate(类型：Date) 
*返回值：时间差对象
*/
function evaluateDateDelete(startDate,endDate){
	var times=Math.abs(endDate.getTime()-startDate.getTime());//时间差的毫秒数的绝对值
	var operator;
	if(endDate.getTime()>=startDate.getTime()){
		operator = '+';
	}else{
		operator = '-';
	}
	//计算出相差天数(之所以只精确到天，是因为不同的年和不同的月的天数不一样，换句话说，年和天不是一个确定的度量单位)
	var days=Math.floor(times/(24*3600*1000));
	//计算出小时数
	var leaveD=times%(24*3600*1000);  //计算天数后剩余的毫秒数
	var hours=Math.floor(leaveD/(3600*1000));
	//计算相差分钟数
	var leaveH=leaveD%(3600*1000);       //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leaveH/(60*1000));
	//计算相差秒数
	var leaveM=leaveH%(60*1000);     //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leaveM/1000);
	return new TimeDifference(operator,days,hours,minutes,seconds,leaveM);
}

/**
* 时间差对象 构造函数
* operator：时间差的类型（‘+’：正时间差；‘-’：负时间差）
* days：相差天数 ；hours：相差小时数
* minutes：相差分钟数 ； seconds：相差秒数
* leaveM：相差毫秒数
*/
function TimeDifference(operator,days,hours,minutes,seconds,leaveM){
	if(operator!=null&&(operator=='+'||operator=='-')){
		this.operator = operator;
	}else{
		this.operator = '+';
	}
	if(days!=null){
		this.day = days;
	}else{
		this.day = 0;
	}
	if(hours!=null){
		this.hour = hours;
	}else{
		this.hour = 0;
	}
	if(minutes!=null){
		this.minute = minutes;
	}else{
		this.minute = 0;
	}
	if(seconds!=null){
		this.second = seconds;
	}else{
		this.second = 0;
	}
	if(leaveM!=null){
		this.msecond = leaveM;
	}else{
		this.msecond = 0;
	}
	
	/**
	* 获得时间差对象所表示的总的毫秒数
	*/
	this.getTime=function(){
		return parseInt(this.day*24*60*60*1000+this.hour*60*60*1000+this.minute*60*1000+this.second*1000+this.msecond);
	}
}

/**
*获得一段时间差之后的时间
*参数 date（被操作时间 Date）；operator（操作符）；object（时间差对象）
*返回值：Date
*/
function operateTimeDifference(date,object){
    switch(object.operator){
		case '+':
			return new Date(date.getTime()+object.getTime());
			break;
		case '-':
			return new Date(date.getTime()-object.getTime());
			break;
		default :
			break;
	}
}
