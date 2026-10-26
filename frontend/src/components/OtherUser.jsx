
import { useSelector } from 'react-redux';
import dp from '../assets/dp.jpg';
import { useNavigate } from 'react-router-dom';

const OtherUser = ({user}) => {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate();
    return (
        <div className='w-full h-20 flex items-center justify-between border-b-2 border-gray-800 '>
            <div className="flex items-center gap-2.5">
                <div className="w-12.5 h-12.5 border-2 border-black cursor-pointer
                        overflow-hidden rounded-full" onClick={()=>navigate(`/profile/${user.userName}`)}>
                    <img src={user.profileImage || dp} alt="" />
                </div>
            <div>
                <div className="text-white font-semibold text-[18px]">{user.userName}</div>
                <div className="text-[15px] text-gray-300">{user.name}</div>
            </div>    

            </div>    
        </div>
    )
}

export default OtherUser;