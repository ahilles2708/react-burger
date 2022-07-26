import ProfileOrder from '../components/profile-order-detail/profile-order-detail';
import styles from "./feed-detail.module.css";

const ProfileOrderPage = () => {
    return (
        <section className={styles.feedDetailContainer}>
            <div className={''}>
                <ProfileOrder />
            </div>
        </section>
    );
};

export default ProfileOrderPage;