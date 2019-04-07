<template>
  <div class="home">
      	<header class="header">
			<h3>黑龙江省数据可视化</h3>
		</header>	
		<div class="wrapper">
			<div id="mask"></div>
			<div id="show">
				<span id="close_show">×</span>
				<div id="enlarge" style="width:100%;height:80%"></div>
			</div>
		    <div class="container-fluid">
		    	<div class="row fill-h">
					<!-- 左侧布局开始 -->
		    		<div class="col-lg-3 fill-h">
		    			<div class="xpanel-wrapper xpanel-wrapper-3">
		    				<div class="xpanel">
		    					<!-- 3.1 推进区域信息基础设施建设 (多图就实现轮播)-->
		    					<div class="fill-h" id="flyMap"></div>
		    				</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 3.2 经济发展信息化推进情况 (多图就实现轮播)-->
								<div class="fill-h" id="worldMap"></div>
							</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 3.3 社会发展信息化推进情况 (多图就实现轮播)-->
								<div class="fill-h" id="worldMap"></div>
							</div>
						</div>
					</div>
					<!-- 左侧布局结束 -->

					<!-- 中间开始 -->
					<div class="col-lg-6 fill-h">
						<div class="xpanel-wrapper xpanel-wrapper-2">
							<div class="xpanel">
								<!-- 黑龙江省地图可点击选省份 -->
								<div class="fill-h" id="provinceMap"></div>
							</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-2">
							<div class="xpanel re-xpanel">
								<!-- 表1-1 黑龙江省各地市信息化发展指数 -->
								<el-tabs type="border-card" v-model="activeName" class="css-reset" @tab-click="tabSelect">
									<el-tab-pane class="css-content" label="省指标"  name="1">
										<div class="fill-h" id="provinceBar" style="width:100%;height:100%"></div>
									</el-tab-pane>
									<el-tab-pane class="css-content" name="2" label="分指标" >
										<div  class="fill-h" style="width:100%;height:100%">
											<el-carousel indicator-position="outside" :interval='5000'>
												<el-carousel-item v-for="(item,index) in 4" :key="item">
													<div class="fill-h" :id="`individulIndicat${index}`" style="width:100%;height:100%"></div>
												</el-carousel-item>
											</el-carousel>
										</div>	
									</el-tab-pane>
								</el-tabs>
							</div>
						</div>
					</div>
					<!-- 中间结束 -->

					<!-- 右侧布局开始 -->
					<div class="col-lg-3 fill-h">
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 2.1.1；2.2.1；2.3.1；2.4.1(轮播图)中心型市地信息化发展 -->
								<div class="fill-h" id="cityMap"></div>
							</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 2.1.3；2.2.3；2.3.3；2.4.3(轮播图)生态型市地信息化发展 -->
								<div class="fill-h" id="cityMap"></div>
							</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 2.1.2；2.2.2；2.3.2；2.4.2(轮播图)煤城型市地信息化发展 -->
								<div class="fill-h" id="countyMap"></div>
							</div>
						</div>
					</div>
					<!-- 右侧布局结束 -->

				</div>
			</div>
		</div>
  </div>
</template>

<script>
// @ is an alias to /src
import echarts from 'echarts';
import lodash from 'lodash';
import '@/assets/css/app.css';
import { constants } from 'crypto';
import { mapGetters } from 'vuex';
// import myEnlarge from '@/assets/widget/echarts/myenlarge.js'
import initProvincet from '@/assets/widget/echarts/initProvincet.js';
import initProvinceBar from '@/assets/widget/echarts/initProvinceBar.js'
import XLSX from 'xlsx';
export default {
	data() {
		return {
			hljJson: {1:1},
			provinceMaps: {},
			provinceBars: {},
			individulIndicat0: {},
			individulIndicat1: {},
			activeName: '1',
			provinceData: [],
			allCityList: [],
			allDevelopment: [],
			allRate: [],

			
		}
	},
	computed: {
		...mapGetters([
			'test1' ,
			'test2' ,
			'provinceMap',
			'provinceBar'
		])
	},
	watch: {
		// 解决异步问题，只有等hljson数据完全复制成功才能执行地图初始化等函数
		// hljJson(val,oldVal){
		// 	this.$nextTick(()=>{
		// 		this.initProvince();
		// 	})
		// },
		provinceMap(val,oldVal){
			console.log(val);
		},
	},
	methods:{
		myEnlarge(yourOption) {
			console.log("tool");
			var mask = document.getElementById("mask");
			var show = document.getElementById("show");
			mask.style.display = "block";
			show.style.display = "block";
			var imgChart = echarts.init(document.getElementById('enlarge'));
			imgChart.clear();
			//myChart.getOption()获取当前图形的配置项option
			imgChart.setOption(yourOption.getOption());

			var close_show = document.getElementById("close_show");
			close_show.onclick = () => {//关闭按钮触发
				imgChart.clear();
				mask.style.display = "none";
				show.style.display = "none";
        	};

		},
		tabSelect(tab, event){
			if(Object.prototype.toString.call(tab).slice(8,-1) == "Undefined" && Object.prototype.toString.call(tab).slice(8,-1) == "Undefined"){
				console.log("初次渲染还没有获取到节点信息");
			}else{
				console.log(tab.name);
			}
			
			this.$nextTick(()=>{
				console.log("12312332321");
				console.log(this.allCityList);
				initProvinceBar(echarts, this.provinceBars, this.allCityList,this.allRate,this.allDevelopment);
				this.initindividulIndicat0();
				this.initindividulIndicat1();
				this.individulIndicat0.resize();
				this.individulIndicat1.resize();
				this.provinceBars.resize();
			}).bind(this);					
		},
		splitJson(jsonD){
			console.log(jsonD);
			jsonD.forEach((element,index) => {
				// 	提取城市数组
				this.allCityList = this.allCityList.concat(element.城市);
				this.allDevelopment = this.allDevelopment.concat(element.发展指数);
				this.allRate = this.allRate.concat(element.增长率);
			});
			console.log(this.allCityList);
		},
		// initProvince(){
		// 		echarts.registerMap('黑龙江', this.hljJson);
		// 		this.provinceMaps = echarts.init(document.getElementById("provinceMap"));
		// 		let that = this;
		// 		console.log(that.myEnlarge);
		// 		let yourOption = this.provinceMaps;
		// 		const provinceMapOpt = {
		// 			toolbox: {
		// 				show : true,
		// 				iconStyle :{
		// 					borderColor: 'e6e6e6'
		// 				},
		// 				feature : {
		// 					saveAsImage : {show: true},
		// 					myEnlarge: {//放大按钮，自定义按钮必须以my开头
		// 						show: true,
		// 						title: '放大',						
		// 						icon: 'image:///data/img/enlarge.svg',//按钮图片的位置
		// 						onclick:()=>{
		// 							console.log("tool");
		// 							var mask=document.getElementById("mask");
		// 							var show=document.getElementById("show");
		// 							mask.style.display="block";
		// 							show.style.display="block";
		// 							var imgChart = echarts.init(document.getElementById('enlarge'));
		// 							imgChart.clear();
		// 							//myChart.getOption()获取当前图形的配置项option
		// 							imgChart.setOption(yourOption.getOption());
			
		// 							var close_show=document.getElementById("close_show");
		// 							close_show.onclick=()=>{//关闭按钮触发
		// 								imgChart.clear();
		// 								mask.style.display="none";
		// 								show.style.display="none";
		// 							};

		// 						}
		// 					}
		// 				},
		// 			},
		// 			geo: {
		// 		        map: '黑龙江',
		// 		        roam: true, //开启鼠标缩放和漫游
		// 		        zoom: 1, //地图缩放级别
		// 				selectedMode: false, //选中模式：single | multiple
		// 				left: 0,
		// 				right: 0,
		// 				top: 0,
		// 				bottom: 0,
		// 				layoutCenter: ['50%', '50%'], //设置后left/right/top/bottom等属性无效
		// 				layoutSize: '100%', //保持地图宽高比
		// 		        label: {
		// 		            emphasis: {
		// 		                show: true,
		// 		                color: '#f19000'
		// 		            }
		// 		        },
		// 		        itemStyle: {
		// 		            normal: {
		// 		                areaColor: '#101f32',
		// 		                borderWidth: 1.5,
		// 		                borderColor: '#43d0d6'
		// 		            },
		// 		            emphasis: {
		// 		                areaColor: '#069'
		// 		            }
		// 		        }
		// 		    }
		// 		};
		// 		this.provinceMaps.setOption(provinceMapOpt);
		// },
		initProvinceBar(){
				this.provinceBars = echarts.init(document.getElementById("provinceBar"));
				console.log(this.allCityList);
				console.log('这是inint中');
				let yourOption = this.provinceBars;
				const provinceBarOpt = {
				  	title : {
						text: '2017年黑龙江省各地市信息化发展指数',
						// subtext: '测试版本',
						textStyle:{
							color: '#cceeff',
						}
					},
					textStyle:{
							color: '#cceeff',
					},
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data: this.allCityList
					},
					toolbox: {
						iconStyle :{
							// color: 'e6e6e6',
							borderColor: 'e6e6e6'
						},
						show : true,
						feature : {
							dataView : {
								show: true, 
								readOnly: false,
								optionToContent:(opt)=>{									
									var axisData = opt.xAxis[0].data;
									var series = opt.series;
									var table = '<table style="width:100%;text-align:center;border:1px solid #000"><tbody><tr>'
												+ '<td style="border:1px solid #000">城市</td>'
												+ '<td style="border:1px solid #000">' + series[0].name + '</td>'
												+ '<td style="border:1px solid #000">' + series[1].name + '</td>'
												+ '</tr >';
									for (var i = 0, l = axisData.length; i < l; i++) {
										table += '<tr>'
												+ '<td style="border:1px solid #000">' + axisData[i] + '</td>'
												+ '<td style="border:1px solid #000">' + series[0].data[i] + '</td>'
												+ '<td style="border:1px solid #000">' + series[1].data[i] + '</td>'
												+ '</tr>';
									}
									table += '</tbody></table>';
									return table;
								}
							},														
							saveAsImage : {show: true},
							myEnlarge:{//放大按钮，自定义按钮必须以my开头
								show:true,
								title:'放大',						
								icon:'image:///data/img/enlarge.svg',//按钮图片的位置
								onclick: function (){
									console.log("tool");
									var mask=document.getElementById("mask");
									var show=document.getElementById("show");
									mask.style.display="block";
									show.style.display="block";
									var imgChart = echarts.init(document.getElementById('enlarge'));
									imgChart.clear();
									//myChart.getOption()获取当前图形的配置项option
									imgChart.setOption(yourOption.getOption());
			
									var close_show=document.getElementById("close_show");
									close_show.onclick=()=>{//关闭按钮触发
										imgChart.clear();
										mask.style.display="none";
										show.style.display="none";
									};

								}
							}
						},
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data : this.allCityList,
							axisLabel: {
								interval: 0,
								rotate:40
							}
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [{
						name:'增长率',
						data: this.allRate,
        				type: 'line'
					},				
					{
						name:'发展指数',
						type:'bar',
						data: this.allDevelopment,
						itemStyle: {
							normal: {
								color: function(params) {
									// build a color map as your need.
									var colorList = ['#ffa31a','#ffd480','#ff8080','#407fbf','#7a7a52',' #ff6699','#75a3a3','#70dbdb','#999999','#00cc44','#ffa31a','#2d8659','#d11aff'];
									return colorList[params.dataIndex]  //柱状图的颜色
								},
								lineStyle:{
									color:'red'
								}


							},
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						},
						barWidth : 15,
						}
					]
				}
			// this.provinceBars.clear(); 
			this.provinceBars.setOption(provinceBarOpt);
		},
		initindividulIndicat0(){
				this.individulIndicat0 = echarts.init(document.getElementById("individulIndicat0"));
				const individulIndicatOpt0 = {
				  	title : {
						text: '2017年黑龙江省各地市信息化发展指数',						
						textStyle:{
							color: '#cceeff',
							fontSize: 16
						}
					},
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data:['蒸发量','降水量']
					},
					toolbox: {
						show : true,
						iconStyle :{
							// color: 'e6e6e6',
							borderColor: 'e6e6e6'
						},
						feature : {
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'蒸发量',
							type:'bar',
							data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
							markPoint : {
								data : [
									{type : 'max', name: '最大值'},
									{type : 'min', name: '最小值'}
								]
							},
							markLine : {
								data : [
									{type : 'average', name: '平均值'}
								]
							}
						},
						{
							name:'降水量',
							type:'bar',
							data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
							markPoint : {
								data : [
									{name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
									{name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
								]
							},
							markLine : {
								data : [
									{type : 'average', name : '平均值'}
								]
							}
						}
					]
				}
			// this.provinceBars.clear(); 
			this.individulIndicat0.setOption(individulIndicatOpt0);
		},
		initindividulIndicat1(){
				this.individulIndicat1 = echarts.init(document.getElementById("individulIndicat1"));
				const individulIndicatOpt1 = {
				  	title : {
						text: '2017年黑龙江省各地市信息化发展指数',
						// subtext: '测试版本',
						textStyle:{
							color: '#cceeff',
						}
					},
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data:['蒸发量','降水量']
					},
					toolbox: {
						show : true,
						iconStyle :{
							// color: 'e6e6e6',
							borderColor: 'e6e6e6'
						},
						feature : {
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'蒸发量',
							type:'bar',
							data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
							markPoint : {
								data : [
									{type : 'max', name: '最大值'},
									{type : 'min', name: '最小值'}
								]
							},
							markLine : {
								data : [
									{type : 'average', name: '平均值'}
								]
							}
						},
						{
							name:'降水量',
							type:'bar',
							data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
							markPoint : {
								data : [
									{name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
									{name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
								]
							},
							markLine : {
								data : [
									{type : 'average', name : '平均值'}
								]
							}
						}
					]
				}
			// this.provinceBars.clear(); 
			this.individulIndicat1.setOption(individulIndicatOpt1);
		}

	},

	// 以下为钩子函数（生命周期）----------------------------------》》》
	beforeCreate(){
		
	},
	created() {
		// axios涉及到异步请求没，就是这里函数执行不会让后面函数执行等待它，
		// 那么会导致这里设置data数据晚于后面echarts初始化使用数据时间导致后面数据没更新
		// this.axios.get('/data/hlj.json').then((response) => {
		// 	this.hljJson = response.data; 
		// })
				
	},
	beforeMount(){},
	mounted(){
		this.provinceMaps = this.provinceMap;
		this.provinceBars = this.provinceBar;

		// 地图的显示初始化
		this.axios.get('/data/hlj.json').then((response) => {
			this.hljJson = response.data; 
		}).then(()=>{
			// this.initProvince();
			console.log(initProvincet);
			initProvincet(echarts,this.provinceMaps,this.hljJson);
		});

		// 读取全省的整体信息化发展水平作为渲染数据备用
		this.axios.get('/data/sheet/province.json').then((response) => {
			this.provinceData = response.data 
		}).then(()=>{
			this.splitJson(this.provinceData);
		}).then(()=>{
			// 初始化中下的选择框
			this.tabSelect();
		});
		
		// 为所有的图表格添加resize管理缩放
		// let that=this;
		// this.$nextTick(()=>{
		// that.initProvinceBar();
		window.addEventListener("resize", ()=>{
				console.log("统一管理"); 
				this.provinceMaps.resize();
				this.provinceBars.resize();
				this.individulIndicat0.resize();
				this.individulIndicat1.resize();
		});
		// })
		
	},
	beforeUpdate(){
	},
	updated(){},
	beforeDestroy(){
		// 销毁onresize，否则会串扰到另一个页面
		// window.onresize = null;
		window.removeEventListener("resize",()=>{
			this.provinceMaps.resize();
			this.provinceBars.resize();
			this.individulIndicat0.resize();
			this.individulIndicat1.resize();
        })
		console.log("xiaohuiqian");
	},
	destroyed(){}
};
</script>

<style lang="scss">
#mask{
            display:none;
            background:rgba(0,0,0,0.3);
            z-index:999999999;
            width:100%;
            height:300%;
            position:fixed;//利用固定定位的好处：页面还可以上下翻动，但是始终处于灰色背景下
}
 #show{
            display:none;
			filter:(2px);
            background:rgba(0,0,0,0.5);
            width:90%;
            height:90%;
            position:fixed;
            left:5%;
            top:1%;
            margin-top:2%;
            z-index:999999999;
 
}
#show #close_show{
            position:relative;
            left:49%;
            top:0%;
            font-size:20px;
            z-index:999999999;
            color:red;
            width:20px;
            height:20px;
            cursor:pointer;
}
.re-xpanel{
	padding: 0 !important;
}
.css-reset{
	background-color:transparent !important;
	background: transparent !important;
	border-color: transparent !important; 
	height: 100% !important;
	.el-tabs__content{
		padding: 0 !important;
		height: 90% !important;
	}
}
// 
.el-tabs--border-card{
	.el-tabs__header{
		height:15% ;
		background-color: transparent !important;
    	border-bottom: 1px solid transparent !important;
	}
	.el-tabs__item.is-active{
		background-color: transparent !important; 
     border-right-color: transparent !important; 
    border-left-color: transparent !important; 
	} 	
}
.css-content{
	height: 100%;	
	width: 100%;	
}
.el-carousel{
	height: 100%;
	.el-carousel__indicators{
		display: none;
	}
	.el-carousel__container{
		height: 100%;
		.el-carousel__arrow{
			outline: none;
		}
	}
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__indicators--outside{
	  position: relative;
	  bottom: 20px;
	  left: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color:transparent !important;
  }  
  .el-carousel__item:nth-child(2n+1) {
    background-color: transparent !important;
  }
.el-button--mini.is_circle{
	outline: none !important;
}
	button:focus{
		outline: none !important;
	}
// .el-button{
// 	font-size: 16px !important;
// }
@media (min-width: 992px){
	.col-lg-3{
		flex:0 0 30% !important;
		max-width: 30% !important;
	}
	.col-lg-6{
		flex:0 0 40% !important;
		max-width: 40% !important;
	}
}

</style>
