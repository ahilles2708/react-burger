import { useMemo } from 'react';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useDrop } from 'react-dnd';
import { addItemToConstructor } from '../../services/actions/burgerConstructor';
import { CONSTRUCTOR_RESET } from '../../services/constants/burgerConstructor';
import { RESET_ORDER} from '../../services/constants/order';
import { createOrder } from '../../services/actions/order';
import { checkAccessToken } from '../../utils/utils';
import { useLocation, useHistory } from 'react-router-dom';
import { IItemProps, TItemDraggable } from '../../types';

export default function BurgerConstructor () {
    const dispatch = useDispatch();

    const {bun, items} = useSelector(store => store.burgerConstructor);

    const { orderNew, openOrderModal } = useSelector(store => store.order);
    const { isAuth } = useSelector(store => store.user);
    const location = useLocation();
    const history = useHistory();
    
    const totalCost = useMemo<number>(() => {
        return (
            (bun ? bun.price *2 : 0) + (items ? items.reduce((sum, item) => sum + item.price, 0) : 0)
        );
    }, [bun, items]);

    const onDropHandler = (item: IItemProps) => {
        dispatch(
            addItemToConstructor(item)
        )
    } 

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TItemDraggable) {
            onDropHandler(item);
        },
    });

    const createOrderNew = () => {
        if ( !bun || !items ){
            return;
        }
        if ( isAuth && checkAccessToken){
            dispatch(
                createOrder({
                    "ingredients" : [
                        bun._id,
                        ...items.map((item) => item._id),
                        bun._id,
                    ]
                })
            );
        } else {
            history.push({
                pathname: '/login',
                search: '?redirectUrl=' + location.pathname
            });
        }
        
    };

    const closeOrderModal = () => {
        dispatch(
            {type: RESET_ORDER}
        );
        if(orderNew){
            dispatch({
                type: CONSTRUCTOR_RESET,
            })
        }
    }

    return (
        <section className={' mt-20'}>
            <div className={styles.fillingList + ' mb-8'} ref={dropTarget}>
                {bun ? (
                    <div className={styles.fillingItem + ' mb-4 pl-8'}>
                        <ConstructorElement 
                            type={'top'} 
                            isLocked={true} 
                            thumbnail={bun.image}
                            text={bun.name + ' верх'} 
                            price={bun.price}
                        />
                    </div>
                ) : (
                    <div className={' ml-4 mb-4 mr-5 text text_type_main-default'}>Выберите булку</div>
                )}
                <ul className={styles.fillingInnerList}>
                    {items && items.length > 0 ? items.map(
                        (item, index) => {
                            if(item.type !== "bun"){
                                return (
                                    <BurgerConstructorElement item={item} index={index} key={item.sortID}/>
                                )
                            }
                        }
                    ) : (
                        <div className={' ml-8 mr-5 pl-8 mb-4 text text_type_main-default'}>Выберите начинку</div>
                    )}
                </ul>
                {bun ? (
                    <div className={styles.fillingItem + ' mb-4 pl-8'}>
                        <ConstructorElement 
                            type={'bottom'} 
                            isLocked={true} 
                            thumbnail={bun.image}
                            text={bun.name + ' низ'} 
                            price={bun.price}
                        />
                    </div>
                ) : (
                    <div className={' ml-4 mb-4 mr-5 text text_type_main-default'}>Выберите булку</div>
                )}
            </div>
            <div className={styles.counting + ' mr-4'}>
                <p className={'mr-10'}>
                    <span className="text text_type_main-large mr-2">{totalCost}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="medium" onClick={createOrderNew}>
                    Оформить заказ
                </Button>
            </div>
            {openOrderModal && <Modal caption="" toggle={closeOrderModal}>
                        <OrderDetails/>
                    </Modal>}
        </section>
    );
};