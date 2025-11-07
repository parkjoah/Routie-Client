import React from 'react';
import { useNavigate } from "react-router-dom";
import { Layout } from '../layout/layout';
import '../../assets/sass/newroute/routemake.scss';

const Routemake = () => {
  const navigate = useNavigate();

  const goToPlaceSearch = () => {
    navigate("/placesearch");
  };
  return (
    <Layout type="logo" text="">
      <div id="routemake_wrap">
        <div className="details">
          <div className="title">
            <p>루트 제목</p>
            <div className="input_box">
              <input type="text" placeholder="입력" />
            </div>
          </div>

          <div className="recommend">
            <p>누구에게 추천하나요?</p>
            <div className="input_box">
              <input type="text" placeholder="입력" />
            </div>
          </div>

          <div className="keyword">
            <p>루트에 어울리는 키워드 (3개 이상 작성)</p>
            <div className="input_box">
              <span className="hash">#</span>
              <input type="text" placeholder="입력" />
            </div>
          </div>

          <div className="visit">
            <p>언제 이 루트를 방문하셨나요? (선택)</p>
            <div className="box">
              <div className="input_box1">
                <input type="text" placeholder="년" />
              </div>
              <div className="input_box2">
                <input type="text" placeholder="월" />
              </div>
              <div className="input_box2">
                <input type="text" placeholder="일" />
              </div>
            </div>
          </div>

          <button className="next" onClick={goToPlaceSearch}>
            <p>다음</p>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Routemake;
