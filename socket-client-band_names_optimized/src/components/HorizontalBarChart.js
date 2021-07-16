import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Bar } from 'react-chartjs-2';

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'BandNames',
    },
  },
};

const HorizontalBarChart = () => {
  const [charLabels, setCharLabel] = useState([])
  const [charData, setCharData] = useState([])
  const [data, setData] = useState({});
  const [update, setUpdate ] = useState(false);
  const [start, setStart ] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chart = () =>{
    setData({
      labels: charLabels,
      datasets: [
        {
          label: '# of Votes',
          data: charData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    })
  }  

  const { socket } = useContext( SocketContext );

  useEffect(() => {
      socket.on('current-bands', (bands) => {
          console.log("BandChart bands ", bands);
          setCharLabel(bands.map( band => band.name ));
          setCharData(bands.map( band => band.votes ));
          setUpdate(true);          
      });
      if(start){
        chart();
        setStart(false);
      }
  }, [chart, socket, start]);

  useEffect(() => {
    if(update){
      chart();
      setUpdate(false);  
    }  
}, [chart, update]);

  console.log("HorizontalBarChart data ", data)
  console.log("HorizontalBarChart update ", update)
  console.log("HorizontalBarChart start ", start)
  /*console.log("HorizontalBarChart charLabels ", charLabels)
  console.log("HorizontalBarChart charData ", charData)*/

  return (
    <>
      <Bar data={data} options={options} />
    </>
  )
};

export default HorizontalBarChart;