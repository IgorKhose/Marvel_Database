import {Component} from 'react';
import ErrorMessage from "../errorMessage/ErrorMessage";
// Компонент для отлавливания ошибок
class ErrorBoundary extends Component{
    state = { 
        error: false
    }

    // метода для обновления состояния
    // static getDerivedStateFromError(error){
    //     return {error:true};
    // }
    
    // хук для обработки ошибок. err - сама ошибка, info - информация о компоненте, в котором
    // произошла ошибка
    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);
        this.setState({error:true});
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;