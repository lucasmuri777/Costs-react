import {parse, v4 as uuidv4} from 'uuid'

import { Form, json, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Project.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

export default function Project(){
    const { id } = useParams()
    
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(()=>{
        
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then((data)=>{
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))

    }, [id])

    function editPost(project){
        setMessage('')
        //budget validation
        if(project.budgets < project.costs){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data)=>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado')
            setType('success')
        })
        .catch(err => console.log(err))
       
    }

    function createService(project){
        setMessage('')
        const lastService = project.services[project.services.length - 1]
    
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost =  parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budgets)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }
        
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data)=>{
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }

    function removeService(id, cost){
        setMessage('')
        const serviceUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project
        projectUpdated.services =  serviceUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) =>{
            setProject(projectUpdated)
            setServices(serviceUpdate)
            setMessage('Serviço removido com sucesso!')
            setType('success')
            
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(
        <>
            {project.name ?(
                <div className='project_details'>
                    <Container customClass="column">
                        <div className='details_container'>
                            {message && <Message type={type} msg={message}/>}
                            <h1>Projeto: {project.name}</h1>
                            <button className='btn' onClick={toggleProjectForm}>
                                {
                                   !showProjectForm ? 'Editar Projeto' : 'Fechar'
                                }
                            </button>
                            {!showProjectForm ? (
                                    <div className='project_info'>
                                        <p><span>Categoria:</span> {project.category.name}</p>
                                        <p><span>Total de Orçamento:</span> {project.budgets}</p>
                                        <p><span>Total Utilizado:</span> {project.cost}</p>
                                    </div>
                                ) : (
                                    <div className='project_info'>
                                      <ProjectForm
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição"
                                        projectData={project}
                                        />
                                    </div>
                                )}
                        </div>
                        <div className='service_form_container'>
                                <h2>Adicione um serviço:</h2>
                                <button className='btn' onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                                </button>
                                <div className='project_info'>
                                    {showServiceForm && (
                                       <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                       />
                                    )

                                    }
                                </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && 
                                services.map((service)=>(
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                services.length === 0 && <p>Não há serviços cadastrados.</p>
                            }
                        </Container>
                    </Container>
                </div>
            ):(
                <Loading/>
            )

            }
        </>
    )
}