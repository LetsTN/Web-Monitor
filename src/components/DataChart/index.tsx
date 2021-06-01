import React, { FC } from 'react';
import { Chart } from 'react-google-charts';

import './styles.css';

export interface DataChartProps {
  data: any;
  valueType: 'ppm' | 'bpm';
  label: string;
}

const DataChart: FC<DataChartProps> = ({data, label, valueType}) => {
  return (
    <Chart
      chartType='LineChart'
      loader={<div className="loader"> Carregando gráfico... </div>}
      data={data}
      options={{
        colors: ['#2C2C2C'],
        hAxis: {
          title: 'Hora da Leitura',
          textPosition: 'none'
        },
        vAxis: {
          title: `Valor (${valueType})`,
        },
        legend: {
          position: 'none'
        },
        title: label
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  )
}

export default DataChart;