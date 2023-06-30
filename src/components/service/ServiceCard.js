import styles from '../project/ProjectCard.css'

import {BsFillTrashFill} from 'react-icons/bs'

export default function ServiceCard({id, name, cost, description, handleRemove}){
    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id, cost)
    }
    
    return(
        <div className='project-card'>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p> 
            <p>{description}</p>
            <div className='project-card-actions'>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}