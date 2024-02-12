import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import MyComponent from './modetest';

const MyChartComponent = ({data}) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    
const dataset =  MyComponent("Your Title Here",data )
    const dataMap = {};
    function dataFormatter(obj) {
        console.log('Input object:', obj);
        const pList = dataset[1];
        let temp;
        const iterationlength = dataset[0].length -1
        for (let year = 0; year <= iterationlength; year++) {
          let max = 0;
          let sum = 0;
          const make = dataset[0][year]
          temp = obj[make];
          console.log('Data for year', make, temp);
          for (let i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[make][i] = {
              name: pList[i],
              value: temp[i]
            };
          }
          obj[make + 'max'] = Math.floor(max / 100) * 100;
          obj[make + 'sum'] = sum;
        }
        return obj;
      }
      
    dataMap.dataGDP = dataFormatter(dataset[2]);

    const option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 6000,
          data:dataset[0],
          label: {
            formatter: function (s) {
              return s;
            }
          }
        },
        title: {
          subtext: dataset[3]
        },
        tooltip: {},
        legend: {
          left: 'right',
          data: ['A']
        },
        calculable: true,
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
          
            saveAsImage: {}
          }
        },
        grid: {
          top: 80,
          bottom: 100
        },
        xAxis: [
          {
            'type': 'category',
            'axisLabel': { 'interval': 0 },
            'data': dataset[1],
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Total'
          }
        ],
        series: [
          { name: 'Total', type: 'bar',color:'orange' }
        ]
      },
      options: [
        
      ]
    };
    const iterationlength = dataset[0].length -1
    for (let n = 0; n <= iterationlength; n++) {
      const make= dataset[0][n]
      const opt = {
        title: { text:  make },
        series: [
          { data: dataMap.dataGDP[make] }
        ]
      };
      option.options.push(opt);
    }

    myChart.setOption(option);

    window.addEventListener('resize', () => {
      myChart.resize();
    });

    return () => {
      window.removeEventListener('resize', () => {
        myChart.resize();
      });
    };
  }, [data]);

  return <div id="main" style={{ width: '100%', height: '600px' }}></div>;
};

export default MyChartComponent;
