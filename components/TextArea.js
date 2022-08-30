import styles from '../styles/textarea.module.css'
export const TextArea = ({ title, onChange }) => {

  const handleChange =({target}) => {
    onChange({name: title, value: target.value})
  }

  return (
    <div>
      <p className={styles.title}>{title}</p>
      <textarea className={styles.textarea} rows="7" onChange={handleChange}></textarea>
    </div>
  )
}
