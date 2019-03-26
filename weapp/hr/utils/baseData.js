import $http from "http.js";
import { local, aTo } from "util";


const $baseData = {
	// 初始化，不用es6箭头语法是为了获取this
    init () { 
        let v = local.get('version');
        $http.get('basedata/v1/version').then((res) => {
	        if (res.success) {
	            let version = res.data;
	            local.set('version', version);
	            // locations   全部城市   
	            var oAddress = local.get('address');
	            if(!v || v.locations != version.locations){
	                local.remove('address');
	                local.remove('addressFormat');
	                this.getAddress();
	            }
	        }
	    });
    },
    getAddress () {
	    var oAddress = local.get('address');
	    var $this = this;
	    // 判断是否是空对象 是：true
	    if (Object.keys(oAddress).length === 0) {
	        return $http.get('basedata/v1/locations').then((res) => {
	            if (res.success) {
	                local.set('address', res.data);
	                // this.addressFormat();
	                return res.data;
	            }
	        });
	    } else {
	        return oAddress;
	    }
    },
    // 获取平铺市级数据
	// addressFormat () {
	//     var oAddressFormat = local.get('addressFormat');

	//     if (Object.keys(oAddressFormat).length === 0) {
	//         var address = local.get('address');
	//         oAddressFormat = aTo(address);
	//         local.set('addressFormat', oAddressFormat);

	//     }
	//     return oAddressFormat;
	// }

}

export default $baseData;
