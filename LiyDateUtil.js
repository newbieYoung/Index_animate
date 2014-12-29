//-------------------------------------------------------- 
// ���ڸ�ʽ�� 
// ��ʽ 
// YYYY/yyyy/YY/yy ��� 
// MM/M �·� 
// W/w ���� 
// dd/DD/d/D ���� 
// hh/HH/h/H ʱ�� 
// mm/m ���� 
// ss/SS/s/S �� 
// ʾ�� ��new Date().format("yyyy-MM-dd hh:mm:ss ����w");
//------------------------------------------------------- 
Date.prototype.format = function(formatStr) { 
	var str = formatStr; 
	var Week = ['��','һ','��','��','��','��','��']; 

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
// �ַ���ת��ΪDate 
// ����ֵ��Date
//--------------------------------------------------- 
function parse(strDate){
	return new Date(Date.parse(strDate));
}
//--------------------------------------------------- 
// �ж��Ƿ������� 
// ����ֵ��true �ǣ�false ����
//--------------------------------------------------- 
Date.prototype.isLeapYear = function(){ 
	return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
} 

/**
*��������Date��ʱ��� 
*���� startDate(���ͣ�Date ) endDate(���ͣ�Date) 
*����ֵ��ʱ������
*/
function evaluateDateDelete(startDate,endDate){
	var times=Math.abs(endDate.getTime()-startDate.getTime());//ʱ���ĺ������ľ���ֵ
	var operator;
	if(endDate.getTime()>=startDate.getTime()){
		operator = '+';
	}else{
		operator = '-';
	}
	//������������(֮����ֻ��ȷ���죬����Ϊ��ͬ����Ͳ�ͬ���µ�������һ�������仰˵������첻��һ��ȷ���Ķ�����λ)
	var days=Math.floor(times/(24*3600*1000));
	//�����Сʱ��
	var leaveD=times%(24*3600*1000);  //����������ʣ��ĺ�����
	var hours=Math.floor(leaveD/(3600*1000));
	//������������
	var leaveH=leaveD%(3600*1000);       //����Сʱ����ʣ��ĺ�����
	var minutes=Math.floor(leaveH/(60*1000));
	//�����������
	var leaveM=leaveH%(60*1000);     //�����������ʣ��ĺ�����
	var seconds=Math.round(leaveM/1000);
	return new TimeDifference(operator,days,hours,minutes,seconds,leaveM);
}

/**
* ʱ������ ���캯��
* operator��ʱ�������ͣ���+������ʱ����-������ʱ��
* days��������� ��hours�����Сʱ��
* minutes���������� �� seconds���������
* leaveM����������
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
	* ���ʱ����������ʾ���ܵĺ�����
	*/
	this.getTime=function(){
		return parseInt(this.day*24*60*60*1000+this.hour*60*60*1000+this.minute*60*1000+this.second*1000+this.msecond);
	}
}

/**
*���һ��ʱ���֮���ʱ��
*���� date��������ʱ�� Date����operator������������object��ʱ������
*����ֵ��Date
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
