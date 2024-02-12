import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './manifestactivity.css';

const ManifestActivity = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: data // Use the data passed as props
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%', },
      
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '35%',
          
          center: ['60%', '25%'],
          emphasis: { focus: 'self' },
          label: { formatter: '{b}: {@2012} ({d}%)' },
          encode: { itemName: 'product', value: '2012', tooltip: '2012' }
        }
      ]
    };

    myChart.on('updateAxisPointer', event => {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: { formatter: '{b}: {@[' + dimension + ']} ({d}%)' },
            encode: { value: dimension, tooltip: dimension }
          }
        });
      }
    });

    myChart.setOption(option);

    // Clean up the chart on unmount
    return () => myChart.dispose();
  }, [data]); // Trigger effect when data changes

  return (
    <div className="centered-container">
      <div className="centered-content">
        <h1>Manifest Activity Plot</h1>
        <div id="main" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default ManifestActivity;
