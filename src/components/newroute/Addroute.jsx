import React from 'react'
import { BottomNavBar } from '../layout/BottomNavBar'
import back_btn from '../../assets/icons/backIcon.svg'
import cameraIcon from '../../assets/icons/cameraIcon.svg'
import plusIcon from '../../assets/icons/plusIcon.svg'
import '../../assets/sass/newroute/addroute.scss'

const Addroute = () => {
    return (
        <div id='addroute_wrap'>
            <div className="add_header">
                <button className="back_btn">
                    <img src={back_btn} alt="" />
                </button>
                <p>글 작성</p>
            </div>
            <div className="content">
                <div className="place_title">
                    <p>1번 스타벅스 충무로역점</p>
                    <div className="category">
                        <p>카페</p>
                    </div>
                    <button className="cancle">
                        <p>취소</p>
                    </button>
                </div>

                <div className="upload">
                    <label htmlFor="imageUpload" className='upload_label'>
                        <img src={cameraIcon} alt="" />
                        <p>가장 기억에 남는 사진을 업로드 해주세요</p>
                    </label>
                    <input type="file"
                        id="imageUpload"
                        accept='image/*'
                        style={{ display: "none" }}
                    />
                </div>

                <div className="review">
                    <textarea
                        placeholder="간단 후기를 작성해주세요."
                        maxLength={500}
                    />
                    <p className="limit">0/500자</p>
                </div>


                <button className="plus_btn">
                    <img src={plusIcon} alt="" />
                </button>
                <button className="complete">
                    <p>완료</p>
                </button>

            </div>
            <BottomNavBar />
        </div>
    )
}

export default Addroute
