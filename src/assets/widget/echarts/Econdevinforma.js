const econdevinforma = (echarts, initBOX, Xsiox, Y1, Y2,Y3,index, titleText)=>{
    Xsiox.splice(0,1);
    Xsiox.splice(1,1);
    Y1.splice(0,1);
    Y2.splice(0,1);
    Y3.splice(0,1);
    Y1.splice(1,1);
    Y2.splice(1,1);
    Y3.splice(1,1);

    initBOX = echarts.init(document.getElementById(`econominform${index}`));
    const EcondevinformaBarOpt ={
        title : {
            text: titleText,
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
        toolbox: {
            iconStyle :{
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
                        imgChart.setOption(initBOX.getOption());

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
        xAxis:[
            {
                type: 'category',
                data : Xsiox,
                axisLabel: {
                    interval: 0,
                    rotate:5
                }
            }
        ],
        yAxis:[
            {
                name:'百分比（%）',
                type:'value'

            }
        ],
        series:[
            {
                name: '2015',
                type: 'bar',
                data: Y1,
            },
            {
                name: '2016',
                type: 'bar',
                data: Y2
            },
            {
                name: '2017',
                type: 'bar',
                data: Y3
            },
        ],
        barWidth:30
    }
    initBOX.setOption(EcondevinformaBarOpt);
    window.addEventListener("resize", ()=>{     
        initBOX.resize();
    });
    return EcondevinformaBar;
}
export default  econdevinforma;