import Head from 'next/head'
import dataQuestions from '../public/data.json'
import styles from '../styles/questions.module.css'
import { questionsProvider } from '../providers/questions/questionsProvider'

export default function questions() {
  const { submit } = questionsProvider()

  return (
    <div className={styles.container}>
      <Head>
        <title>Preguntas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <form onSubmit={submit} >
        <p className={styles.title} >
          Preguntas
        </p>
        {dataQuestions.map(function (d, idx) {
          return (
            <div key={idx} >
              {idx != 0 ? <div className={styles.space} /> : null}
              <p className={styles.question} >
                {idx + 1}. {d.title}
              </p>
              <div className={styles.column} >
                {d.options.map(function (data, index) {
                  return (
                    <div key={index} className={styles.row} >
                      <input
                        type="radio"
                        value={data}
                        id={data + idx}
                        name={idx === 0 ? 'one' : idx === 1 ? 'two' : idx === 2 ? 'three' : idx === 3 ? 'four' : idx === 4 ? 'five' : ''}
                      />
                      <p className={styles.answer} >
                        {data}
                      </p>
                    </div>
                  )
                })
                }
              </div>
            </div>
          )
        })
        }
        <div className={styles.rigth} >
          <button type='submit' className={styles.button} >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  )
}
