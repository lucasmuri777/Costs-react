import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.css';
import { useNavigate } from 'react-router-dom';

export default function NewProject(){

    const navigate = useNavigate();
    

    function createPost(project){
        // initialize cost and services
        project.cost = 0;
        project.services = [];
        
        fetch("http://localhost:5000/projects",{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json())
        .then((data)=>{
            navigate('/projects', 
           {state: { message: 'Projeto criado com suceso'}})
        })
        .catch(err => console.log(err))

    }

    return(
        <div className='newproject_container'>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}