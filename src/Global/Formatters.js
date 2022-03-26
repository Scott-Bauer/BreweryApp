import NumberFormat from "react-number-format"
import { format } from 'date-fns'
export function phoneFormatter(val){
    return <NumberFormat value = {val} displayType="text" format="+1 (###) ###-####" mask="_" />
}
export function dateFormatter(val){
   let date = new Date(val);
return format(date , 'yyyy/mm/dd');
}