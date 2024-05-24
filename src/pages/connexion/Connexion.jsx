import React, { useEffect } from 'react'
import { 
  Box,
  Button,
  Stack,
  TextField,
  Typography 
} from '@mui/material'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function Connexion() {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("utilisateur")){
      navigate('/')
    }
  }, [])
  const { handleSubmit, register, formState: { errors }} = useForm()
  const onSubmit = (data) => {
    axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`).then((res) => {
      if(res.data.length > 0){
        localStorage.setItem("utilisateur", JSON.stringify(res.data[0]))
        navigate("/")
        toast.success("Connexion reussie")
      }else{
        toast.error("les identifiants sont incorrectes")
      }
    })
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
    <Typography variant='h5'>Connexion</Typography>

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

        </Stack>

        <Button
          variant='contained'
          sx={{
            marginTop:2
          }}
          type='submit'
        >Connexion</Button>

        <Typography paddingTop={2}>
          voulez-vous creer un compte? <Link to='/inscription'>cliquez ici</Link>
        </Typography>
      </form>
    </Box>
  </Stack>
  )
}

export default Connexion