import { Button, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

export default function AjouterPublication() {
    const user = JSON.parse(localStorage.getItem("utilisateur"))

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm()

    const UqueryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn:(pub) => {
            return axios.post("http://localhost:3000/publications", pub)
        },
        onError:(error) => {
            toast.error("une erreur est survenue")
        },
        onSuccess:(success) => {
            reset()
            UqueryClient.invalidateQueries("publications")
            toast.success("Publication ajoutee avec succes")
        }
    })

    const onSubmit = (data) => {
        const publication = {
            ...data,
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur
        }

        mutation.mutate(publication)

        // axios.post("http://localhost:3000/publications", publication).then((res) => {
        //     toast.success("publication ajouter")
        //     console.log(res.data)
        //     reset()
        // }).catch((err) => {
        //     toast.error("une erreur est survenue")
        //     console.log(err)
        // })
    }





  return (
    <Stack width={"60%"} margin={"auto"}>
        <h1>Ajouter une publication</h1>
        <form
            style={{
                marginTop:4
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                gap={2}
            >
                <TextField
                    id='filled-basci'
                    label='saisir votre publication'
                    variant='outlined'
                    size='small'
                    type='text'
                    multiline
                    rows={4}
                    fullWidth

                    {...register('textePublication', {
                        required:'veuillez saisir du texte',
                        minLength: {
                            value:10,
                            message:'veuillez saisir un texte de plus de 10 caracteres'
                        }
                    })}
                />

                <TextField
                    id='filled-basci'
                    label="saisir l'url de votre image"
                    variant='outlined'
                    size='small'
                    type='text'
                    multiline
                    fullWidth

                    {...register('imagePublication', {
                        required:'veuillez saisir une url',
                        pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/"
                    })}
                />

                <Button variant='contained' type='submit'>Publier</Button>
            </Stack>
        </form>
    </Stack>
  )
}
