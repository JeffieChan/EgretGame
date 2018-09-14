module CommonUtils {
	export class ObjectUtils {
		public static toJsonString(obj:any):string {
			if(obj instanceof Array){
				let json:string = "";
				json += "[";
				obj.forEach((val,index)=>{
					if(index > 0)
						json += ",";
					json += ObjectUtils.toJsonString(val);
				})
				json +="]"
				return json;
			}

			if(typeof(obj) == "string"){
				return "\""+obj+"\"";
			}

			if(!isNaN(obj)){
				return obj.toString();
			}

			if(obj instanceof Object){
				let json:string = "{";
				let propertyName:string = "";
				let propertyNames:string[] = Object.getOwnPropertyNames(obj);
				propertyNames.forEach((name,index)=>{
					if(index > 0)
						json += ","
					json += "\"" + name + "\":" + ObjectUtils.toJsonString(obj[name]);
				});
				json += "}";
				return json;
			}
			
			return obj.toString();
		}
	}
}