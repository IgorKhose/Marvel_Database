import img from './error.gif';
// Получаем доступ к любой картинке - process.env.PUBLIC_URL+"/error.gif"
const ErrorMessage = ()=>{
    return(
        <img style={{display:"block", widht:"250px", height:"250px", objectFit:"contain", margin:"0 auto"}} 
            src={img} alt="Error"/>
    )
}

export default ErrorMessage;

