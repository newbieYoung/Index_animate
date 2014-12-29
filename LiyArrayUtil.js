/**
*删除数组元素
*（该方法会改变数组内的元素次序,所以执行后，数组的遍历最好向前移动一位,既在遍历的过程中若有删除操作，则应该配合i--一起使用）
*
*/
function remove(array,i){
	if(array!=null&&array.length>=i+1){
		//交换第i个元素和最后一个元素
		array[i]=array[array.length-1];
		array.pop();
	}
}