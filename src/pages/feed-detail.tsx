import FeedDetail from '../components/feed-detail/feed-detail';
import styles from "./feed-detail.module.css";

const FeedOrderPage = () => {
    return (
        <section className={styles.feedDetailContainer}>
            <div className={''}>
                <FeedDetail />
            </div>
        </section>
    );
};

export default FeedOrderPage;