import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const MyChartComponent = ({data}) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const dataMap = {};
    function dataFormatter(obj) {
        console.log('Input object:', obj);
        const pList = ['Beijing', 'Tianjin', 'Hebei', 'Shanxi', 'Inner Mongolia', ];
        let temp;
        for (let year = 2008; year <= 2011; year++) {
          let max = 0;
          let sum = 0;
          temp = obj[year];
          console.log('Data for year', year, temp);
          for (let i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name: pList[i],
              value: temp[i]
            };
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }
      
    dataMap.dataGDP = dataFormatter({
      2011: [16251.93, 11307.28, 24515.76, 11237.55, 14359.88, 22226.7, 10568.83, 12582, 19195.69, 49110.27, 32318.85, 15300.65, 17560.18, 11702.82, 45361.85, 26931.03, 19632.26, 19669.56, 53210.28, 11720.87, 2522.66, 10011.37, 21026.68, 5701.84, 8893.12, 605.83, 12512.3, 5020.37, 1670.44, 2102.21, 6610.05],
      2010: [14113.58, 9224.46, 20394.26, 9200.86, 11672, 18457.27, 8667.58, 10368.6, 17165.98, 41425.48, 27722.31, 12359.33, 14737.12, 9451.26, 39169.92, 23092.36, 15967.61, 16037.96, 46013.06, 9569.85, 2064.5, 7925.58, 17185.48, 4602.16, 7224.18, 507.46, 10123.48, 4120.75, 1350.43, 1689.65, 5437.47],
      2009: [12153.03, 7521.85, 17235.48, 7358.31, 9740.25, 15212.49, 7278.75, 8587, 15046.45, 34457.3, 22990.35, 10062.82, 12236.53, 7655.18, 33896.65, 19480.46, 12961.1, 13059.69, 39482.56, 7759.16, 1654.21, 6530.01, 14151.28, 3912.68, 6169.75, 441.36, 8169.8, 3387.56, 1081.27, 1353.31, 4277.05],
      2008: [11115, 6719.01, 16011.97, 7315.4, 8496.2, 13668.58, 6426.1, 8314.37]
    });

    const option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 6000,
          data: [
            '2008', '2009', '2010', '2011'
          ],
          label: {
            formatter: function (s) {
              return s.slice(0, 4);
            }
          }
        },
        title: {
          subtext: 'Livestream'
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
            'data': [
              'Beijing', 'Tianjin', 'Hebei', 'Shanxi', 'Inner Mongolia',
              'Liaoning', 'Jilin', 'Heilongjiang',
              
            ],
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Attendance'
          }
        ],
        series: [
          { name: 'Attendance', type: 'bar',color:'orange' }
        ]
      },
      options: [
        
      ]
    };

    for (let n = 2008; n <= 2011; n++) {
      const opt = {
        title: { text: 'Year: ' + n },
        series: [
          { data: dataMap.dataGDP[n] }
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
  }, []);

  return <div id="main" style={{ width: '100%', height: '600px' }}></div>;
};

export default MyChartComponent;
