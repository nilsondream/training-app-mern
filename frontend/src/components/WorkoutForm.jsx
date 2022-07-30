import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }

    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <h1 className='text-lg leading-6 font-bold pb-3'>Agregar un nuevo entrenamiento</h1>

            <div className='flex flex-col py-2 gap-2'>
                <label className='text-sm'>Título del entrenamiento:</label>
                <input
                    className={emptyFields.includes('title') ? 'error w-full rounded px-2 py-1.5 border-2 border-red-500' : 'w-full rounded px-2 py-1.5 border-2 border-[#ddd]'}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>

            <div className='flex flex-col py-2 gap-2'>
                <label className='text-sm whitespace-nowrap'>Carga (en kg):</label>
                <input
                    className={emptyFields.includes('load') ? 'error w-full rounded px-2 py-1.5 border-2 border-red-500' : 'w-full rounded px-2 py-1.5 border-2 border-[#ddd]'}
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                />
            </div>

            <div className='flex flex-col py-2 gap-2'>
                <label className='text-sm whitespace-nowrap'>Número de repeticiones:</label>
                <input
                    className={emptyFields.includes('reps') ? 'error w-full rounded px-2 py-1.5 border-2 border-red-500' : 'w-full rounded px-2 py-1.5 border-2 border-[#ddd]'}
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                />
            </div>

            <button className='w-full bg-black text-white rounded p-4 text-sm font-semibold mt-5 hover:bg-indigo-600 transition duration-300 ease-in-out'>Agregar entrenamiento</button>
            {error && <div className='bg-[#ffefef] border-2 border-red-500 rounded text-red-500 text-sm text-center p-3 mt-5'>{error}</div>}
        </form>
    )
}

export default WorkoutForm