import errorGif from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img src={errorGif} alt='Error' className='errorMessage'/>
    )
}

export default ErrorMessage;