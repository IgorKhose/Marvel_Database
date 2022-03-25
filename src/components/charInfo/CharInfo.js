import {Component} from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';

import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {

    state = {
        char:null,
        loading:false,
        error:false
    }

    // Создаем объект класса сервиса для создания запросов 
    marvelService = new MarvelService();

    // Хук жизненного цикла, которые указывает, что компонент отрендерился
    componentDidMount(){
        this.updateChar();
    }

    // Хук жизненного цикла, срабатывает, когда в компонент приходит новый пропс или изменяется
    // стейт либо спец функция вызывает принудительную перерисовку компонента
    // Этот хук при выозове получает в аргументы предыдущие пропсы и стейты
    componentDidUpdate(prevProps, prevState){
        // предыдущие пропсы нужны для сравнения, пришли ли новые данные. Если да,
        // тогда обновляем. Без условия сравнения будет вызван бесконечный цикл
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    // хук для обработки ошибок. err - сама ошибка, info - информация о компоненте, в котором
    // произошла ошибка
    // componentDidCatch(err, info){
    //     console.log(err, info);
    //     this.setState({error:true});
    // }

    updateChar = ()=>{
        const {charId} = this.props;
        if(!charId){
            return;
        }
        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }
    // Displaying spinner while loading character's info
    onCharLoading = ()=>{
        this.setState({
            loading:true
        })
    }
    // mapping the info from api to an object of rendering
    onCharacterLoaded = (char)=>{
        this.setState({char, loading:false});
    }
    // displaying an error gif 
    onError = ()=>{
        this.setState({loading:false, error:true});
    }

    render(){
        // Get all the data from state
        const {char, loading, error} = this.state;
        // if nothing, then render skeleton 
        const skeleton = char || loading || error ? null : <Skeleton/>;
        // if error of spinner true, then render it
        const errorMessage = error ? <ErrorMessage/>:null;
        const spinner = loading ? <Spinner/>:null;
        // if not loading or error but char is not null, the we can display it
        const content = !(loading || error || !char) ? <View char={char}/>: null;

        return (
            <div className="char__info">
                {spinner}
                {skeleton}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) =>{
    let {name, description, thumbnail, homepage, wiki, comics} = char;
    //  Changing img and description  start
    let imgStyle = {'objectFit':'cover'};
    if(typeof thumbnail == 'string' && thumbnail.includes("image_not_available.jpg")){
        imgStyle = {'objectFit':'contain'};
    } 
    if(description === "")
         description = "No description";
    return (
        <>
        <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null: "No comics info."}
                    {
                        comics.map((item, i)=>{
                            if(i>9) return;
                            return(
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                    }
                    
                </ul>
        </>
    )
}
// Проверка типов приходящих пропсов
// 
CharInfo.propTypes = {
    // название поступающего пропса и валидация. Ошибку можно увидеть в консоли
    charId: PropTypes.number
}
export default CharInfo;