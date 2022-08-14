import { useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/types/hooks";
import { setProfileFormValue, userInfoPatch } from '../../services/actions/user';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-form.module.css';

const ProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store);
    const nameInitial = user.info.name;
    const emailInitial = user.info.email;

    useEffect(() => {
        dispatch(setProfileFormValue("name", nameInitial));
        dispatch(setProfileFormValue("email", emailInitial));
        }, [nameInitial, emailInitial, dispatch]
    ); 

    const nameForPatch = user.formProfile.name;
    const emailForPatch = user.formProfile.email;
    const passwordForPatch = user.formProfile.password;
    const { userInfoPatchRequest } = user;

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProfileFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userInfoPatch(user));
    }

    return(
        <form className={styles.userInfo + ''} onSubmit={onFormSubmit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                icon={'CurrencyIcon'}
                value={nameForPatch}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <EmailInput onChange={onFormChange} value={emailForPatch} name={'email'} />
            <PasswordInput onChange={onFormChange} value={passwordForPatch} name={'password'} />
            <Button type="primary" size="medium" disabled={userInfoPatchRequest}>Сохранить</Button>
        </form>
    )
}

export default ProfileForm;