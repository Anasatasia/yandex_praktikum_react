import React from 'react';
import { Tab, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from "./app-header.module.css"
function AppHeader() {
    const [current, setCurrent] = React.useState('one')
    return (
        <>
            <header className={appHeaderStyles.header}>
                <nav className={appHeaderStyles.header__nav}>
                    <div className={appHeaderStyles.container}>
                        <Tab active={current === 'one'} value={"one"} onClick={setCurrent}>
                            <div className={appHeaderStyles.header__tab}>
                                <BurgerIcon type={"primary"} />
                                <p className="text text_type_main-small">
                                    Конструктор
                                </p>
                            </div>
                        </Tab>
                        <Tab active={current === 'two'} value={"two"} onClick={setCurrent}>
                            <div className={appHeaderStyles.header__tab}>
                                <ListIcon type={"secondary"} />
                                <p className="text text_type_main-small">
                                    Лента заказов
                                </p>
                            </div>
                        </Tab>
                    </div>
                    <Logo/>
                    <div className={appHeaderStyles.header__profile}>
                        <Tab active={current === 'three'} value={"three"} onClick={setCurrent}>
                            <div className={appHeaderStyles.header__tab}>
                                <ProfileIcon type={"secondary"} />
                                <p className="text text_type_main-small">
                                    Личный кабинет
                                </p>
                            </div>
                        </Tab>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default AppHeader;