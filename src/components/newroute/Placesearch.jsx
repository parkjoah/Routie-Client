import React from 'react'
import { BottomNavBar } from '../layout/BottomNavBar'
import back_btn from '../../assets/icons/backicon.svg'
import searchIcon from '../../assets/icons/searchIcon.svg'
import '../../assets/sass/newroute/placesearch.scss';

const Placesearch = () => {
    return (

        <div id='placesearch_wrap'>
            <div className="search_header">
                <button className="back_btn">
                    <img src={back_btn} alt="" />
                </button>
                <p>장소 검색</p>
            </div>

            <div className="search_detail">
                <div className="search_box">
                    <div className="input_wrap">
                        <img src={searchIcon} alt="" />
                        <input type="text" placeholder='방문한 곳의 위치를 입력해주세요' />
                    </div>
                </div>

                <div className="example">
                    <p>🏠 도로명, 건물명 또는 지번으로 주소를 찾아보세요.</p>
                    <p>🔎 예: 서울 중구 필동로1길 30 / 동국대학교 / 필동2가</p>
                    <p>📍 도로명 주소가 어렵다면 건물명이나 동 이름으로 검색해보세요</p>
                </div>
            </div>
            <BottomNavBar />
        </div >

    )
}

export default Placesearch
