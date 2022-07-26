import { useEffect } from 'react';
import FeedDetail from '../components/feed-detail/feed-detail';
import { wsFeedConnectionClosed, wsFeedConnectionStart } from '../services/actions/wsFeed';
import { useDispatch, useSelector } from '../services/types/hooks';
import styles from "./feed-detail.module.css";

const FeedOrderPage = () => {
    const dispatch = useDispatch();
    const { wsConnected } = useSelector(store => store.feed);

    useEffect(() => {
        if (!wsConnected) {
            dispatch(wsFeedConnectionStart());
        }
        return () => {
            if (wsConnected) {
                dispatch(wsFeedConnectionClosed());
            }
        }
    }, [dispatch, wsConnected])

    return (
        <section className={styles.feedDetailContainer}>
            <div className={''}>
                <FeedDetail />
            </div>
        </section>
    );
};

export default FeedOrderPage;