import { 
  Box,
  Button,
  Stack,
  TextField,
  Typography 
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Inscription() {
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors }} = useForm()
  const onSubmit = (data) => {
    if(data.motDePasse != data.motDePasseConfirmation){
      toast.error('les mot de passe ne correspondent pas')
    }
    else{
      // toast.success("inscriptions reussi")

      axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`).then((res) => {
        if(res.data.length > 0){
          toast.error("Un compte existe deja avec cette adresse mail")
        } else{
            // lien vers l'api
            axios.post("http://localhost:3000/utilisateurs", data).then((res) => {
              console.log(res)
              toast.success("inscriptions reussi")

              navigate("/connexion")
            }).catch((err) => {
              console.log(err)
              toast.error("une erreur est survenue")
            })
        }
      })
    }
  }

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"#f5f5f5"}
      width={"100%"}
      height={"100vh"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor:'#fff',
          padding:3
        }}
      >
        <Typography variant='h5'>Inscription</Typography>

        <form action=""
          style={{
            marginTop:4
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack
            direction={"column"}
            gap={2}
          >
            <TextField 
              id='filled-basic'
              label='Veuillez saisir votre nom'
              variant='outlined'
              fullWidth
              size='small'
              {...register(
                "nomUtilisateur",
                {
                  required: "veuiller saisir un nom",
                  minLength:{
                    value: 5, 
                    message:"veuillez saisir le nom avec plus de 2 caracteres"
                  }
                }
              )}
            />

<TextField 
              id='filled-basic'
              label='Veuillez saisir votre adresse mail'
              variant='outlined'
              fullWidth
              size='small'
              type='email'
              {...register(
                "mailUtilisateur",
                {
                  required: "veuiller saisir votre adresse mail",
                  pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                }
              )}
            />

            <TextField 
              id='filled-basic'
              label='Veuillez saisir votre mot de passe'
              variant='outlined'
              fullWidth
              size='small'
              type='password'
              {...register(
                "motDePasse",
                {
                  required: "veuiller saisir votre mot de passe",
                  minLength:{
                    value: 6, 
                    message:"veuillez saisir le nom avec plus de 5 caracteres"
                  }
                }
              )}
            />

            <TextField 
              id='filled-basic'
              label='Veuillez confirmer votre mot de passe'
              variant='outlined'
              fullWidth
              size='small'
              type='password'
              {...register(
                "motDePasseConfirmation",
                {
                  required: "veuiller confirmer votre mot de passe",
                  minLength:{
                    value: 6,
                    message:"veuillez saisir le nom avec plus de 6 caracteres"
                  }
                }
              )}
            />
          </Stack>

          <Button
            variant='contained'
            sx={{
              marginTop:2
            }}
            type='submit'
          >Inscription</Button>
        </form>
      </Box>
    </Stack>
  )
}

export default Inscription