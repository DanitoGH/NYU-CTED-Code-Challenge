import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

const Dashboard = () =>  {
  
  const [data, setData] = useState([]);
  const COUNTRY_CODE = 'gh';
  
  /**
   * Fetch Ghana's current COVID-19 statistics data on page load  
   */ 
  useEffect(() => {
    fetchCovid19StatisticsData()
  },[])
   
  const fetchCovid19StatisticsData = async() => {
    var options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/country/code',
      params: {code: COUNTRY_CODE},
      headers: {
        'x-rapidapi-host': `${process.env.REACT_APP_RAPID_API_HOST}`,
        'x-rapidapi-key': `${process.env.REACT_APP_RAPID_API_KEY}`
      }
    };
    await axios.request(options).then(function (res) {
      setData(res.data[0])
    }).catch(function (error) {
      console.error(error);
    });
  }

  // Data destructuring with default values
  const { confirmed = 0, recovered = 0, critical = 0, 
    deaths = 0, lastChange = Date.now(), lastUpdate = Date.now()
  } = data
  
  // Creating "Active Cases" custom data field
  const calculateActiveCases = (confirmed-recovered-deaths)

  // Ghana's COVID-19 statistics data for Doughnut Chart
  const doughnutChartData =  {
    labels: ["Confirmed", "Recovered","Deaths"],
    datasets: [{
        data: [confirmed, recovered, deaths],
        backgroundColor: [
        "#0090e7","#00d25b","#fc424a"
        ]
      }
    ]
  };

  // Ghana's COVID-19 statistics data for Bar Graph
  const barGraphData = {
    labels: ["Confirmed", "Recovered", "Critical", "Deaths"],
    datasets: [{
      label: '#',
      data: [confirmed, recovered, critical, deaths],
      backgroundColor: [
        '#0090e7',
        '#00d25b',
        '#ffab00',
        '#fc424a'
      ],
      borderWidth: 0,
      fill: false
    }]
  };

  // Bar Graph Options Config
  const barGraphOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  // Doughnut Chart Options Config
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
          borderWidth: 0
      }
    },      
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  return (
      <div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">
                         <NumberFormat value={confirmed} displayType={'text'} thousandSeparator={true} />
                      </h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-primary">
                      <span className="mdi mdi-account-multiple icon-item"></span>
                      
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Confirmed Cases</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">
                        <NumberFormat value={recovered} displayType={'text'} thousandSeparator={true} />
                      </h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-human-handsup icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Recovered</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">
                        <NumberFormat value={critical} displayType={'text'} thousandSeparator={true} />
                      </h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-warning">
                      <span className="mdi mdi-hotel icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Critical</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">
                        <NumberFormat value={deaths} displayType={'text'} thousandSeparator={true} />
                      </h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-danger">
                      <span className="mdi mdi-hospital icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Deaths</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ghana's COVID-19 Statistics</h4>
                <div className="aligner-wrapper">
                  <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                  <div className="absolute center-content">
                    <h5 className="font-weight-normal text-white text-center mb-2 text-white">
                      <NumberFormat value={calculateActiveCases} displayType={'text'} thousandSeparator={true} />
                    </h5>
                    <p className="text-small text-muted text-center mb-0">Total Active</p>
                  </div>
                </div>  
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Last Changed</h6>
                    <p className="text-muted mb-0">
                      <Moment format="DD MMM YYYY, hh:mm A">{lastChange}</Moment>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Last Update</h6>
                    <p className="text-muted mb-0">
                      <Moment format="DD MMM YYYY, hh:mm A">{lastUpdate}</Moment>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Ghana's COVID-19 Statistics Bar Graph</h4>
                  <p className="text-muted mb-1">
                    Last Update: <Moment format="DD MMM YYYY, hh:mm A">{lastUpdate}</Moment>
                  </p>
                </div>
                 <div className="card">
                   <div className="card-body">
                   <Bar data={barGraphData} options={barGraphOptions} />    
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
}

export default Dashboard;