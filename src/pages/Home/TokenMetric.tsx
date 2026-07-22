import React from 'react';

import { data as metricData } from 'src/data/metric';
import chart from 'src/assests/tokenMetric/chart.png';

const MetricInfo = () => {
  return (
    <ul className="list-unstyled ps-2">
      {metricData.map((item, index) => {
        return (
          <li className="w-100 metric-item" key={index}>
            <div className="row">
              <span className="col-sm-1 col-2 p-0 d-block d-sm-none">
                {item.value}%
              </span>
              <span
                className="col-sm-4 col-12 p-0 d-none d-sm-block"
                style={{ color: item.color }}
              >
                {item.type}
              </span>
              <span className="d-none d-sm-block col-sm-1 col-12 p-0">
                {item.value}%
              </span>
              <span className="col-sm-7 col-12 p-0 d-none d-sm-block">
                {item.description}
              </span>
              <div className=" col-10 p-0 d-block d-sm-none">
                <span style={{ color: item.color }}>{item.type}</span>
                <div>{item.description}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const TokenMetric: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="bg-purple-dark text-white">
      <div className="container">
        <div className="row pt-4 pb-5">
          <div className="col-12 text-center">
            <div className="metric-title fs-50 fw-900 text-white">
              TOKEN METRIC
            </div>
            <div className="total-supply fs-26 fw-900 text-yellow">
              TOTAL SUPPLY: 100.000.000
            </div>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-sm-5 col-12">
            <img
              src={chart}
              className="metric-chart"
              alt="token metric chart"
            />
          </div>
          <div className="col-sm-7 col-12">
            <MetricInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenMetric;
