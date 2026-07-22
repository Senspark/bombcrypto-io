import React, { useState, useEffect } from 'react';
import axios from 'axios';

import layer from 'src/assests/images/layer1.png';

import houseInfo from 'src/assests/images/houseInfo.png';

import backgroundBlack from 'src/assests/images/backgroundBlack.png';
import InformationList from 'src/components/InfomationList';
import { data } from 'src/data/information';

const Information: React.FC<{ id: string }> = ({ id }) => {
  const [bhero, setBhero] = useState<number>(0);
  const [bhouse, setBhouse] = useState<number>(0);

  const getBheroSol = async () => {
    try {
      const { data } = await axios.get('https://api.bombcrypto.io/total_hero');
      setBhero(data);
    } catch (error) {
      console.info(error);
    }
  };

  const getBhouseSol = async () => {
    try {
      const { data } = await axios.get('https://api.bombcrypto.io/total_house');
      setBhouse(data);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    getBheroSol();
    getBhouseSol();
  }, []);

  return (
    <section id={id}>
      <div className="info py-5">
        <h1 className="text-uppercase  w-100 top-0 text-white fw-bolder text-center my-lg-5 mb-md-2 title">
          NFT Infomation
        </h1>
        <div className="detail w-100 my-4 my-lg-0">
          <div className="container">
            <InformationList
              title="Bhero Sold"
              account={bhero}
              img={layer}
              token="0x30cc0553f6fa1faf6d7847891b9b36eb559dc618"
            />
            <InformationList
              title="Bhouse Sold"
              account={`${bhouse}/5000`}
              img={houseInfo}
              token="0xea3516feb8f3e387eec3004330fd30aff615496a"
            />
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="w-100 top-0 py-5">
          <div className="container mt-5">
            <div className="row justify-content-around  mt-3 mb-5">
              {data.map((v, i) => {
                return (
                  <div
                    className="col-9 col-md-4  my-3 my-sm-0 px-lg-3 px-xl-4"
                    key={i}
                  >
                    <img
                      src={v.image}
                      alt="adventure"
                      className="w-100 h-auto"
                    />
                    <div className="detail-hero position-relative my-3">
                      <img src={backgroundBlack} alt="" className="w-100" />
                      <h2 className="text-white fw-bolder text-center position-absolute text w-100">
                        {v.title}
                      </h2>
                    </div>
                    <div className="text-white fw-550 detail  px-0 px-md-4">
                      {v.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
