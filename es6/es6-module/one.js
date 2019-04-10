export var 	name = '熊炬辉';
export var age = 25;
export var year = 1992;

function foo() {
	return 666
}

//抛出默认接口
export default foo;

// //引入接口时，重命名，后面的是新名字
// import model as nameFn from 'my-module';

// //引入全部
// import * as math from 'my-module';

// //符合写法
// export {name, age} from 'my-module'//等于下面写法

// import {name, age} from 'my-module';
// export {name, age};




