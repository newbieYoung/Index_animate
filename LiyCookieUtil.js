//�ú�������3��������cookie���ƣ�cookieֵ���Լ��ڶ���Сʱ����ڡ�����Լ��expiresHoursΪ0ʱ���趨����ʱ�䣬����������ر�ʱcookie�Զ���ʧ
function addCookie(name,value,expiresHours){
	var cookieString=name+"="+escape(value);//����
	//�ж��Ƿ����ù���ʱ��
	if(expiresHours>0){
	var date=new Date();
	date.setTime(date.getTime+expiresHours*3600*1000);
	cookieString=cookieString+"; expires="+date.toGMTString();
	}
	document.cookie=cookieString;
} 

//�ú�����������Ϊname��cookieֵ������������򷵻ؿ�
function getCookie(name){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	for(var i=0;i<arrCookie.length;i++){
	var arr=arrCookie[i].split("=");
	if(arr[0]==name)return unescape(arr[1]);//����
	}
	return "";
} 

//�ú�������ɾ��ָ�����Ƶ�cookie(Ҳ��������)
function deleteCookie(name){
	var date=new Date();
	date.setTime(date.getTime()-10000);
	document.cookie=name+"=v; expires="+date.toGMTString();
} 