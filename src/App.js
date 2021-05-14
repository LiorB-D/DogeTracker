import './App.css';
import { ResponsiveLine } from '@nivo/line'
import {useState, useEffect} from 'react';

function App() {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&include_last_updated_at=true"
    const [data, setData] = useState([
     {
       "id": "dogecoin",
       "data": []
     }
  ]);
  	const [price, setPrice] = useState(0)
    const [lastFetched, setFetched] = useState("")
  useEffect(() => {
  
     const intrvl = setInterval(() => {
      let response = fetch(url).then(response => response.json()).then(resData => {
        	 let dt = data
             let d = new Date(0)
             d.setUTCSeconds(resData.dogecoin.last_updated_at)
          	 let cleanDate = d.toLocaleTimeString()
          
        
          if(cleanDate != lastFetched) {
          	console.log("New Price Update")
            dt[0].data.push({x: cleanDate, y: resData.dogecoin.usd})
            setData(dt)
            
            setFetched(cleanDate)
            setPrice(resData.dogecoin.usd)
          } else {
          	console.log("Same Price")
          }
        
          
      })
     }, 5000)
     
     return () => {
     	clearInterval(intrvl)
     }
     
  }, [data, price, lastFetched])
  

 
  const Graph = () => {
  	return <div className="GraphContainer">
          <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 110 }}
          xScale={{ type: 'point'}}
          yScale={{ type: 'linear', min: 'auto' }}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Time',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Price ($)',
              legendOffset: -80,
              legendPosition: 'middle'
          }}
          colors={{scheme: 'category10'}}
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
    	/>
        </div>
  }
  return (
    <div className="App">
		<h1>Price: {price}</h1>
      	<h3>Last Fetched: {lastFetched}</h3>
      	<Graph/>
    </div>
  );
}

export default App;
