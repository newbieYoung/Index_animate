/**
*ɾ������Ԫ��
*���÷�����ı������ڵ�Ԫ�ش���,����ִ�к�����ı��������ǰ�ƶ�һλ,���ڱ����Ĺ���������ɾ����������Ӧ�����i--һ��ʹ�ã�
*
*/
function remove(array,i){
	if(array!=null&&array.length>=i+1){
		//������i��Ԫ�غ����һ��Ԫ��
		array[i]=array[array.length-1];
		array.pop();
	}
}