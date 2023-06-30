import styles from './Input.css'

export default function Input({type, text, name, placeholder, handleOnChange, value}){
    return(
        <div className='form_control'>
            <label htmlFor={name}>{text}</label>
            <input required
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}