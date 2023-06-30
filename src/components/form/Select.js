import styles from './Input.css'

export default function Select({text, name, options, handleOnChange, value}){
    return(
        <div className='form_control'>
            <label htmlFor={name}>{text}</label>
            <select 
            required 
            name={name} 
            id={name} 
            onChange={handleOnChange} 
            value={value || ''}>
                <option selected>
                    Selecione uma opção
                </option>
                {
                    options.map((option)=>(
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}