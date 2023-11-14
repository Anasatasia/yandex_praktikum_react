import AppHeader from "../app-header/app-header";
import appStyles from './app.module.css'
import Main from "../main/main";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getIngredients} from "../../services/actions/burger-ingredients";
function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getIngredients());
    },[dispatch]);
    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Main />
        </div>
    )
}

export default App;