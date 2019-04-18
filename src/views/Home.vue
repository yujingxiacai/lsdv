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
									<el-carousel indicator-position="outside" :interval='5000'>
												<el-carousel-item v-for="(item,index) in 3" :key="item">
													<div class="fill-h" :id="`advanceinform${index}`"></div>
												</el-carousel-item>
									</el-carousel>
		    				</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 3.2 经济发展信息化推进情况 (多图就实现轮播)-->
								<el-carousel indicator-position="outside" :interval='5000'>
												<el-carousel-item v-for="(item,index) in 4" :key="item">
													<div class="fill-h" :id="`econominform${index}`"></div>
												</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="xpanel-wrapper xpanel-wrapper-3">
							<div class="xpanel">
								<!-- 3.3 社会发展信息化推进情况 (多图就实现轮播)-->
								<!-- <el-carousel indicator-position="outside" :interval='5000'>
												<el-carousel-item v-for="(item,index) in 4" :key="item">
													<div class="fill-h" :id="`advanceinform${index}`"></div>
												</el-carousel-item>
								</el-carousel> -->
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
										<div  class="fill-h" style="width:100%;height:100%">
										<el-carousel indicator-position="outside" :interval='5000'>
											<el-carousel-item v-for="(item,index) in 5" :key="item">
												<div class="fill-h" :id="`provinceBar${index}`" style="width:100%;height:100%"></div>
											</el-carousel-item>
										</el-carousel>
										</div>
									</el-tab-pane>
									<el-tab-pane class="css-content" name="2" label="分指标" >
										<div  class="fill-h" style="width:100%;height:100%">
											<el-carousel indicator-position="outside" :interval='5000'>
												<el-carousel-item v-for="(item,index) in 5" :key="item">
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
import initProvincet from '@/assets/widget/echarts/initProvincet.js';
import initProvinceBar from '@/assets/widget/echarts/initProvinceBar.js';
import initindividulIndicat from '@/assets/widget/echarts/initindividulIndicat.js';
import initAdvanceinformBar from '@/assets/widget/echarts/advanceinform.js';
import Econdevinforma from '@/assets/widget/echarts/Econdevinforma.js';
import { exists } from 'fs';

export default {
	data() {
		return {
				hljJson: {1:1},
				citycurrent: '',
				provinceMaps: {},
				provinceBars: {},
				// individulIndicat1: {},
				activeName: '1',
				provinceData: [],
				allCityList: [],
				allDevelopment: [],
				allRate: [],
				Readiness: [],
				Environmental: [],
				Applicationbenif: [],
				Industrialinform: [],
				classifyT: [],
				rateT: [],
				developmentT: [],
				networkT: [],
				information: [],
				applyBenef: [],
				proudInformat: [],
				provinceIndi: {provinceIndi0:{},provinceIndi1:{},provinceIndi2:{},provinceIndi3:{},individulIndicat4:{},},
				individulIndi: {individulIndicat0:{},individulIndicat1:{},individulIndicat2:{},individulIndicat3:{},individulIndicat4:{},},
				// individulIndi: new Map([[individulIndicat0,{}],[individulIndicat1,{}],[individulIndicat2,{}],[individulIndicat3,{}],[individulIndicat4,{}]]),  这里用map会报一些莫名奇妙的错误。时好时坏。感觉有冲突。
				Advanceinform: {AdvanceinformBar0:{},AdvanceinformBar1:{},AdvanceinformBar2:{}},
				// Advanceinform: {AdvanceinformBar0:{},AdvanceinformBar1:{},AdvanceinformBar2:{}},
				advanceinformData:[],
				provinceThree: [],
				dainxingVal:[],
				advanceRate: [],
				advanceYdRate: [],
				yDVal: [],
				// 左上第三幅图
				firstY: [],
				area: [],
				secondY: [],
				thirdY: [],
				// 左中
				EcoDevelopInform: {},
				ecodevinforFirst: [],
				ecodevinforY1:[],
				ecodevinforY2:[],
				ecodevinforY3:[],
				ecodevinforSecond: [],
				ecodevinforYS1:[],
				ecodevinforYS2:[],
				ecodevinforYS3:[],

			
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
		citycurrent:(val,newVal)=>{
			// console.log(val,newVal);
		}
	},
	methods:{

		// 中下切换bar的切换省类型和分类型轮播快的选择处理逻辑
		tabSelect(tab, event){
			if(Object.prototype.toString.call(tab).slice(8,-1) == "Undefined" && Object.prototype.toString.call(tab).slice(8,-1) == "Undefined"){
			}else{
			}
			this.$nextTick(()=>{
				let andex = 0;
				let emptyRate = ["","",""];
				// 初始化渲染provinceBar条形图
				for (let key in this.provinceIndi) {		
					if (andex == 0) {
						// console.log(this.allRate);
						initProvinceBar(echarts,andex, key, this.allCityList, this.allRate,this.allDevelopment,).resize();
					} else if(andex == 1) {
						initProvinceBar(echarts,andex, key, this.allCityList,[],this.Readiness,'2017年黑龙江省各地市网络基础设施就绪度','网络基础设施就绪度').resize();
					} else if(andex == 2) {
						initProvinceBar(echarts,andex, key, this.allCityList,[],this.Environmental,'2017年黑龙江省各地市信息化发展环境','信息化发展环境指数').resize();
					} else if(andex == 3) {
						initProvinceBar(echarts,andex, key, this.allCityList,[],this.Applicationbenif,'2017年黑龙江省各地市应用效益','应用效益指数').resize();
					} else if(andex == 4) {
						initProvinceBar(echarts,andex, key, this.allCityList,[],this.Industrialinform,'2017年黑龙江省各地市产业信息化','产业信息化指数').resize();
					}
					andex++;
				};
				let index =0;
				for (let key in this.individulIndi) {		
					if (index == 0) {
						initindividulIndicat(echarts, key, this.classifyT, this.rateT, this.developmentT, index, '发展指数', '2017年三个类型城市区域信息化发展指数').resize();
					} else if(index == 1) {
						initindividulIndicat(echarts, key, this.classifyT, emptyRate , this.networkT, index, '网络基础设施就绪度', '2017年三个类型城市区域网络基础设施就绪度指数').resize();
					} else if(index == 2) {
						initindividulIndicat(echarts, key, this.classifyT, emptyRate , this.information, index, '信息化发展环境', '2017年三个类型城市区域信息化发展环境指数').resize();
					} else if(index == 3) {
						initindividulIndicat(echarts, key, this.classifyT, emptyRate , this.applyBenef, index, '应用效益', '2017年三个类型城市区域应用效益指数').resize();
					} else if(index == 4) {
						initindividulIndicat(echarts, key, this.classifyT, emptyRate , this.proudInformat, index, '产业信息化', '2017年三个类型城市区域产业信息化指数').resize();
					}
					index++;
				}
			})				
		},

/**
 * @param jsonD (array) 传递过来需要处理的原始数组对象
 * @param dataFrom （int） 判断所传递的数据所来自的表格 （通过映射表映射，目前先人工映射）
 * @author shenyukang （shenyuakng@126.com）
 * @description  用于处理所有接收的json数据的功能
 */
		splitJson(jsonD, dataFrom){
		// 后面要统一为对象，也即是一个模块划分为对应的一个area对象，area对象中包含该区域（模块）所有的图像对象。
			if(Object.prototype.toString.call(jsonD).slice(8,-1) == 'Object'){
				// console.log(Object.keys(jsonD));// ["firstGraph", "secondGraph", "thirdGraph", "fourthGraph"]
				// Object.keys(jsonD).forEach((key,index) => {
				// 	console.log("key",key,index);
				// });
				// console.log(Object.values(jsonD));//  [Array(4), Array(5), Array(5), Array(4)]
				Object.values(jsonD).forEach((key,index) => {
					// console.log(key); 每一个对应一张图的所有参数。
					key.forEach(element => {
						if(dataFrom==5){//左中
							if(index==0){//第一张图
								this.ecodevinforFirst=this.ecodevinforFirst.concat(element.x);
								this.ecodevinforY1=this.ecodevinforY1.concat(element[2015]);
								this.ecodevinforY2=this.ecodevinforY2.concat(element[2016]);
								this.ecodevinforY3=this.ecodevinforY3.concat(element[2017]);
							}else if(index==1){//第二张图
								this.ecodevinforSecond=this.ecodevinforSecond.concat(element.x);
								this.ecodevinforYS1=this.ecodevinforYS1.concat(element[2015]);
								this.ecodevinforYS2=this.ecodevinforYS2.concat(element[2016]);
								this.ecodevinforYS3=this.ecodevinforYS3.concat(element[2017]);
							}else if(index==2){//第三张图
			         			// this.ecodevinforThird=this.ecodevinforThird.concat(element.x);
								// this.ecodevinforYT1=this.ecodevinforYT1.concat(element[2015]);
								// this.ecodevinforYT2=this.ecodevinforYT2.concat(element[2016]);
								// this.ecodevinforYT3=this.ecodevinforYT3.concat(element[2017]);
							}else if(index==3){//第四张图
								// this.ecodevinforFourth=this.ecodevinforFourth.concat(element.x);
								// this.ecodevinforYF1=this.ecodevinforYF1.concat(element[2015]);
								// this.ecodevinforYF2=this.ecodevinforYF2.concat(element[2016]);
								// this.ecodevinforYF3=this.ecodevinforYF3.concat(element[2017]);
							}
							
						}else if(dataFrom==6){//左下
							if(index==0){//第一张图
								
							}else if(index==1){

							}else if(index==2){

							}else if(index==3){

							}
						}else if(dataFrom==7){
							if(index==0){//第一张图
							}else if(index==1){

							}else if(index==2){

							}else if(index==3){

							}							
						}else if(dataFrom==8){
							if(index==0){//第一张图
								
							}else if(index==1){

							}else if(index==2){

							}else if(index==3){

							}							
						}
						
					});
				});
				console.log(this.ecodevinforSecond,this.ecodevinforYS3,this.ecodevinforYS2,this.ecodevinforYS1);
			}else{
					jsonD.forEach((element, index) => {
					// 	提取城市数组
					// dataFrom映射：1=> 省指标总表；2=> 分类指标总表......
					if (dataFrom == 1) { 
						this.allCityList = this.allCityList.concat(element.城市);
						this.allDevelopment = this.allDevelopment.concat(element.发展指数);
						this.allRate = this.allRate.concat(element.增长率);
						this.Readiness = this.Readiness.concat(element.网络基础设施就绪度);
						this.Environmental = this.Environmental.concat(element.信息化发展环境);
						this.Applicationbenif = this.Applicationbenif.concat(element.应用效益);
						this.Industrialinform = this.Industrialinform.concat(element.产业信息化);
					} else if (dataFrom == 2) {
						this.classifyT = this.classifyT.concat(element.类型);
						this.rateT = this.rateT.concat(element.增长率);
						// this.YAxis[0] = this.YAxis[0].developmentT
						this.developmentT = this.developmentT.concat(element.发展指数);
						this.networkT = this.networkT.concat(element.网络基础设施就绪度);
						this.information = this.information.concat(element.信息化发展环境);
						this.applyBenef = this.applyBenef.concat(element.应用效益);
						this.proudInformat = this.proudInformat.concat(element.产业信息化);
					} else if (dataFrom == 3) {
						this.provinceThree = this.provinceThree.concat(element.地区);

						this.advanceRate = this.advanceRate.concat(element.三年电信增长率);
						this.dainxingVal = this.dainxingVal.concat(element.年电信总量);

						this.advanceYdRate = this.advanceYdRate.concat(element.三年移动增长率);
						this.yDVal = this.yDVal.concat(element.年移动总量);

					} else if (dataFrom == 4) {
						// this.fisrtY = this.fisrtY.concat(1);
							this.area = this.area.concat(element.省份);
							this.firstY = this.firstY.concat(element.first);
							this.secondY = this.secondY.concat(element.second);
							this.thirdY = this.thirdY.concat(element.third);
					} else if (dataFrom == 5) {
							// console.log('testyousee:',jsonD);
					}
				
			});
			}
		
		}

	},

	// 以下为钩子函数（生命周期）----------------------------------》》》
	beforeCreate(){},
	created() {

		this.axios.get('/data/sheet/classify.json').then((response) => {
			// 全省的分类型总体数据
			this.classifyData = response.data; 
		}).then(()=>{
			let dataFrom = 2;
			// 处理省指标总数据，切割处理函数。具体需要数据可以在splitJSon函数中写业务逻辑
			this.splitJson(this.classifyData,dataFrom);
		})

	},
	beforeMount(){},
	mounted(){
		// 此处只是只是使用了store中的全局对象，但是此处还没有经过echarts.init的初始化所以还不是一个function对象
		this.provinceMaps = this.provinceMap;
		this.provinceBars = this.provinceBar;
		// 省地图的显示初始化
		this.axios.get('/data/hlj.json').then((response) => {
			this.hljJson = response.data; 
		}).then(()=>{
			// 具体看initProvincet.js中的需要的参数针对传递过去，这里我们后期可以设计一个统一的参数传递模版
				echarts.registerMap('黑龙江', this.hljJson);
    		this.provinceMaps = echarts.init(document.getElementById("provinceMap"));
    		const provinceMapOpt = {
				toolbox: {
					show : true,
					iconStyle :{
						borderColor: 'e6e6e6'
					},
					feature : {
						saveAsImage : {show: true},
						myEnlarge: {//放大按钮，自定义按钮必须以my开头
							show: true,
							title: '放大',						
							icon: 'image:///data/img/enlarge.svg',//按钮图片的位置
							onclick:()=>{
								var mask=document.getElementById("mask");
								var show=document.getElementById("show");
								mask.style.display="block";
								show.style.display="block";
								var imgChart = echarts.init(document.getElementById('enlarge'));
								imgChart.clear();
								//myChart.getOption()获取当前图形的配置项option
								imgChart.setOption(this.provinceMaps.getOption());
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
				geo: {
					map: '黑龙江',
					roam: true, //开启鼠标缩放和漫游
					zoom: 1, //地图缩放级别
					selectedMode: false, //选中模式：single | multiple
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					layoutCenter: ['50%', '50%'], //设置后left/right/top/bottom等属性无效
					layoutSize: '100%', //保持地图宽高比
					label: {
						emphasis: {
							show: true,
							color: '#f19000'
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#101f32',
							borderWidth: 1.5,
							borderColor: '#43d0d6'
						},
						emphasis: {
							areaColor: '#069'
						}
					}
				}
    		};
			this.provinceMaps.setOption(provinceMapOpt);
			window.addEventListener("resize", ()=>{
						console.log("你监听到了嘛？map")       
						this.provinceMaps.resize();
			});
			this.provinceMaps.on('click', (params)=>{
						//params==post；query===get
						// 注意用params传递参数时就只能用name传到对应到页面，不能用path，
						// 反过来用path就对应来用query，这也刚好对应来一个query是通过url到get传参数，params是不通过url直接post穿参数的
						// this.$router.push({path: '/province/detailCity', query:{'id':params.name}})
						this.$router.push({name: 'detailCity', params:{'id':params.name}})
			});//点击		
		});

		// 读取全省的整体信息化发展水平bar图作为渲染数据备用
		this.axios.get('/data/sheet/province.json').then((response) => {
			// 获取全省的总指标数据json。
			this.provinceData = response.data; 
		}).then(()=>{
			let dataFrom = 1;
			// 处理省指标总数据，切割处理函数。具体需要数据可以在splitJSon函数中写业务逻辑
			this.splitJson(this.provinceData,dataFrom);
		}).then(()=>{
			// 初始化中下的选择框，这也是渲染相关数据图形的一个初始化函数
			this.tabSelect();
		});

		this.axios.get('/data/sheet/advanceInform.json').then((response)=>{
			this.advanceinformData = response.data;
		}).then(()=>{
				let dataFrom = 3;
				this.splitJson(this.advanceinformData,dataFrom);
		}).then(()=>{
			this.axios.get('/data/sheet/donsansKuandai.json').then((response)=>{
					let dataFrom = 4;
					this.donsansKuandai = response.data;
					this.splitJson(this.donsansKuandai,dataFrom);
			}).then(()=>{
				let index=0;
				for (let key in this.Advanceinform) {	
						if(index == 0 ){
							initAdvanceinformBar(echarts, key,this.provinceThree,this.dainxingVal,this.advanceRate,'2017年总量（亿)','2017东三省电信业务总量',index).resize();
						}else if(index == 1){
							initAdvanceinformBar(echarts, key,this.provinceThree,this.dainxingVal,this.advanceYdRate,'2017年用户总量（亿)','2017东三省移动电话用户',index).resize();
						}else{
							initAdvanceinformBar(echarts, key,this.provinceThree,0,0,'接入用户增长率',"2015年-2017年东北三省宽带接入用户增长率(%)",index,this.firstY,this.secondY,this.thirdY).resize();
						}
						index++
				}
			})

		})
		
		this.axios.get('/data/sheet/E_commercetransac.json').then((response) => {
			this.EcoDevelopInform.firstGraph = response.data;
			return response.data;
		}).then((d1)=>{
			if(d1){
				this.axios.get('/data/sheet/OnlineRetailsituation.json').then((response)=>{
						this.EcoDevelopInform.secondGraph = response.data;
				}).then(()=>{
						this.axios.get('/data/sheet/Urbanandrural.json').then((response)=>{
								this.EcoDevelopInform.thirdGraph = response.data;
						}).then(()=>{
								this.axios.get('/data/sheet/emailBox.json').then((response)=>{
										this.EcoDevelopInform.fourthGraph = response.data;
								}).then(()=>{
									let dataFrom=5;
									 this.splitJson(this.EcoDevelopInform,dataFrom);
								}).then(()=>{
										Object.keys(this.EcoDevelopInform).forEach((k,index)=>{
											if(index==0){
												Econdevinforma(echarts,k,this.ecodevinforFirst,this.ecodevinforY1,this.ecodevinforY2,this.ecodevinforY3,index,'2015年-2017年黑龙江省电子商务交易情况');
											}
											
										})
								})
						})
				})
			}

		})
	},
	beforeUpdate(){
	},
	updated(){},
	beforeDestroy(){
	},
	destroyed(){}
};
</script>


<style lang="scss" >
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
						// filter:blur(20px);
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
