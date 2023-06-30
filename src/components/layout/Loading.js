import loadingImg from '../../img/loading.svg'
import styles from './loading.css'

export default function Loading(){
    return (
        <div className='loader-container'>
            <img className='loader' src={loadingImg} alt='Loading'/>
        </div>
    )
}