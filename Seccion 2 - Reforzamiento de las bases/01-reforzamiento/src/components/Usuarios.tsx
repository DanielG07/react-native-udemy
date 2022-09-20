import { useEffect, useRef, useState } from 'react';
import { reqResApi } from '../api/reqRes';
import { ReqResListado, User } from '../interfaces/reqRes';

export const Usuarios = () => {

    const [usuarios, setUsuarios] = useState<User[]>([])

    const paginaRef = useRef(1)

    useEffect(() => {
      // Llamado a API
      cargarUsuarios()
    }, [])

    const cargarUsuarios = async() => {
        const resp = await reqResApi.get<ReqResListado>('/users', {
            params:{
                page: paginaRef.current
            }
        })

        if( resp.data.data.length > 0 ) {
            setUsuarios(resp.data.data)
            paginaRef.current ++
        } else {
            alert("No hay mas registros")
        }

        setUsuarios( resp.data.data )
    }

    const renderItem = ({ id, first_name, last_name, email, avatar}: User) => {
        return (
            <tr key={id.toString()}>
                <td>
                    <img 
                        src={ avatar } 
                        alt= { first_name } 
                        style={{
                            width: 50,
                            borderRadius: 100
                        }}
                        />
                </td>
                <td>{ first_name } { last_name }</td>
                <td>{ email }</td>
            </tr>
        )
    }
    

    return (
        <>
            <h3>Usuarios</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map( usuario => renderItem(usuario))
                    }
                </tbody>
            </table>

            <button
                className='btn btn-primary'
                onClick={cargarUsuarios}>
                    Siguientes
            </button>
        </>
    )
}
