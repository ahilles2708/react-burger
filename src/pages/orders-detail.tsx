import { useEffect } from 'react';
import ProfileOrder from '../components/profile-order-detail/profile-order-detail';
import { wsProfileOrdersConnectionClosed, wsProfileOrdersConnectionStart } from '../services/actions/wsOrders';
import { useDispatch, useSelector } from '../services/types/hooks';
import styles from "./feed-detail.module.css";

const ProfileOrderPage = () => {
    const dispatch = useDispatch();
    const { wsProfileConnected } = useSelector(store => store.profileOrders);
    
    useEffect(() => {
        if (!wsProfileConnected) {
            dispatch(wsProfileOrdersConnectionStart());
        }
        return () => {
            if (wsProfileConnected) {
                dispatch(wsProfileOrdersConnectionClosed());
            }
        }
    }, [dispatch, wsProfileConnected])

    return (
        <section className={styles.feedDetailContainer}>
            <div className={''}>
                <ProfileOrder />
            </div>
        </section>
    );
};

export default ProfileOrderPage;