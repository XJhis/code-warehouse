    
	/*
	==================
	默认弹出框组件
	=================
	*/

    // 模态框组件 只能用于通用的弹窗,弹框内交互只有按钮点击，如确定或者取消
    // props 标题 dailogTitle 
    // dailog-confirm: 确定触发事件
    // dailog-cancel: 取消触发事件    

    Vue.component('dailogBox', {
    	props: {
    		dailogTitle: {
    			type: String,
    			default: '这是一个标题'
    		}
    	},
        template: `<div class="alert-box">
				        <div class="alert-cover"></div>
				        <div class="alert-mian">
				            <div class="alert-close">X</div>
				            <div class="alert-title">
				                <h2>{{dailogTitle}}</h2>
				            </div>
				            <div class="alert-cont">
				            	<slot name="dailog-cont"><p class="default-cont">我是内容区</p></slot>
				            </div>
				            <div class="alert-footer t-c-f">
				            	<slot name="dailog-foot">
				            		<div class="alert-btns">
				            		    <button class="btn btn-blue" @click="confirmFn()">确定</button>
				            		    <button class="btn btn-white" @click="cancelFn()">取消</button>
				            		</div>
				            	</slot>
				            </div>
				        </div>
				    </div>`
	    , 
	    methods: {
	    	confirmFn: function() {
	    		this.$emit('dailog-confirm')
	    	},
	    	cancelFn: function() {
	    		this.$emit('dailog-cancel')
	    	}
	    }
    })